import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InformationCardsProps {
  informations: {
    id: 'total-products' | 'active-products' | 'inactive-products';
    label: 'Produtos Ativos' | 'Produtos Inativos' | 'Total de Produtos';
    value: number;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >;
  }[];
}

export function InformationCards({ informations }: InformationCardsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {informations.map(({ id, label, value, Icon }) => (
        <div
          key={id}
          className="flex w-full items-center justify-between rounded-md p-4 shadow-md md:max-w-75"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm">{label}</span>

            <strong className="text-base">{value}</strong>
          </div>

          <div
            className={cn(
              'bg-primary/20 rounded-full p-2',
              id === 'total-products' && 'bg-primary/20',
              id === 'active-products' && 'bg-green-500/20',
              id === 'inactive-products' && 'bg-red-500/20',
            )}
          >
            <Icon
              className={cn(
                id === 'total-products' && 'text-primary',
                id === 'active-products' && 'text-green-500',
                id === 'inactive-products' && 'text-red-500',
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
