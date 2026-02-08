import { useColumns } from './use-columns';
import { useListRawMaterialsQuery } from '@/hooks/queries/use-list-raw-materials-query';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { DataTableFallback } from '@/components/data-table-fallback';
import { CreateRawMaterialSheet } from './components/create-raw-material-sheet';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function RawMaterial() {
  const {
    rawMaterialList,
    isFetchingRawMaterialList,
    isLoadingRawMaterialList,
  } = useListRawMaterialsQuery();

  const columns = useColumns();

  const table = useReactTable({
    data: rawMaterialList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <div className="p-4">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="flex gap-4">
            <h1 className="text-base font-bold">Controle de Matérias Primas</h1>

            {isFetchingRawMaterialList && <Spinner />}
          </div>

          <p className="text-sm">
            Gerencie os insumos essenciais para garantir a continuidade da
            produção.
          </p>
        </div>

        <CreateRawMaterialSheet />
      </header>

      <div className="mt-6 overflow-x-auto">
        {isLoadingRawMaterialList && (
          <DataTableFallback
            fallbackColumns={columns.map((col) => col.header?.toString() ?? '')}
          />
        )}

        {!isLoadingRawMaterialList && (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
