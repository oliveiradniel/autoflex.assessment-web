import { useMemo } from 'react';

import { cn } from '@/lib/utils';

import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '@/entities/product';
import { EditIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function useColumns(): ColumnDef<Product>[] {
  return useMemo<ColumnDef<Product>[]>(
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
        id: 'description',
        accessorFn: ({ description }) => description,
        cell: ({ row }) => {
          const description = row.original.description;

          return <div className="max-w-sm truncate text-sm">{description}</div>;
        },
        header: 'DESCRIÇÃO',
      },
      {
        id: 'price',
        accessorFn: ({ price }) => price,
        cell: ({ row }) => {
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(row.original.price);
        },
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
        cell: () => {
          return (
            <div className="flex items-center gap-2">
              <Button variant="ghost">
                <EditIcon className="size-4 text-blue-500" />
              </Button>

              <Button variant="ghost" className="hover:bg-destructive/10">
                <Trash2Icon className="text-destructive size-4" />
              </Button>
            </div>
          );
        },
        header: 'AÇÕES',
      },
    ],
    [],
  );
}
