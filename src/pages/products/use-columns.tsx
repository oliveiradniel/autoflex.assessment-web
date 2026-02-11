import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/format-currency';

import { DeleteProductAlertDialog } from './components/delete-product-alert-dialog';
import { UpdateProductSheet } from './components/update-product-sheet';

import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '@/entities/product';
import { truncateString } from '@/utils/truncate-string';

export function useColumns(): ColumnDef<Product>[] {
  return useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'name',
        accessorFn: ({ name }) => name,
        header: 'PRODUTO',
        cell: ({ row }) => (
          <span title={row.original.name}>
            {truncateString(row.original.name, 30)}
          </span>
        ),
      },
      {
        id: 'code',
        accessorFn: ({ code }) => code,
        header: 'CÓDIGO',
      },
      {
        id: 'description',
        accessorFn: ({ description }) => description,
        cell: ({ row }) => {
          const description = row.original.description;
          const hasDescription = !!description;

          return (
            <div
              title={row.original.description}
              className="max-w-sm truncate text-sm"
            >
              <span className={cn(!hasDescription && 'italic opacity-50')}>
                {hasDescription ? description : 'Sem descrição'}
              </span>
            </div>
          );
        },
        header: 'DESCRIÇÃO',
      },
      {
        id: 'price',
        accessorFn: ({ price }) => price,
        cell: ({ row }) => formatCurrency(row.original.price),
        header: 'PREÇO',
      },
      {
        id: 'is-active',
        accessorFn: ({ isActive }) => isActive,
        cell: ({ row }) => {
          const isActive = row.original.isActive;

          return (
            <div
              className={cn(
                'flex justify-center rounded-md px-4 py-2 text-xs font-semibold',
                isActive
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600',
              )}
            >
              <span className="text-center text-xs">
                {isActive ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          );
        },
        header: 'STATUS',
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
              <UpdateProductSheet product={row.original} />

              <DeleteProductAlertDialog id={id} name={name} />
            </div>
          );
        },
        header: 'AÇÕES',
      },
    ],
    [],
  );
}
