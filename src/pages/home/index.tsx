import { useColumns } from './use-columns';
import { useListProductsQuery } from '@/hooks/queries/use-list-products-query';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { CheckIcon, PackageIcon, XIcon } from 'lucide-react';

import {
  InformationCards,
  type InformationCardsProps,
} from './components/InformationCards';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function Home() {
  const { productList } = useListProductsQuery();

  const informations: InformationCardsProps['informations'] = [
    {
      id: 'total-products',
      label: 'Total de Produtos',
      value: 1000,
      Icon: PackageIcon,
    },
    {
      id: 'active-products',
      label: 'Produtos Ativos',
      value: 80,
      Icon: CheckIcon,
    },
    {
      id: 'inactive-products',
      label: 'Produtos Inativos',
      value: 20,
      Icon: XIcon,
    },
  ];

  const columns = useColumns();

  const table = useReactTable({
    data: productList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <header className="flex flex-col gap-8">
        <InformationCards informations={informations} />

        <div>
          <h1 className="text-base font-bold">Inventário de Produtos</h1>

          <p className="text-sm">
            Gerencie seus itens de forma eficiente e organizada.
          </p>
        </div>
      </header>

      <div className="mt-6 overflow-x-auto">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
