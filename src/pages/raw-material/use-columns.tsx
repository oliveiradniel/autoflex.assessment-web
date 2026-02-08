import { useMemo } from 'react';

import { unitTypeFullLabel } from './unit-type-full-label';

import { UpdateRawMaterialSheet } from './components/update-raw-material-sheet';
import { DeleteRawMaterialAlertDialog } from './components/delete-raw-material-alert-dialog';

import type { ColumnDef } from '@tanstack/react-table';
import type { RawMaterial } from '@/entities/raw-material';

export function useColumns(): ColumnDef<RawMaterial>[] {
  return useMemo<ColumnDef<RawMaterial>[]>(
    () => [
      {
        id: 'name',
        accessorFn: ({ name }) => name,
        header: 'PRODUTO',
      },
      {
        id: 'code',
        accessorFn: ({ code }) => code,
        header: 'CÓDIGO',
      },
      {
        id: 'stock-quantity',
        accessorFn: ({ stockQuantity }) => stockQuantity,
        cell: ({ row }) => {
          const { original } = row;

          const unitType =
            original.stockQuantity > 1
              ? `${unitTypeFullLabel[original.unitType]}s`
              : unitTypeFullLabel[original.unitType];

          return `${original.stockQuantity} ${unitType}`;
        },
        header: 'QUANTIDADE NO ESTOQUE',
      },
      {
        id: 'created-at',
        accessorFn: ({ createdAt }) => createdAt,
        cell: ({ row }) => {
          return new Date(row.original.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });
        },
        header: 'DATA DE CRIAÇÃO',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const { id, name } = row.original;

          return (
            <div className="flex items-center gap-2">
              <UpdateRawMaterialSheet rawMaterial={row.original} />

              <DeleteRawMaterialAlertDialog id={id} name={name} />
            </div>
          );
        },
        header: 'AÇÕES',
      },
    ],
    [],
  );
}
