import { Spinner } from '@/components/ui/spinner';
import { useGetSummaryProductQuery } from '@/hooks/queries/use-get-summary-product-query';

import { cn } from '@/lib/utils';

import { CheckIcon, PackageIcon, XIcon } from 'lucide-react';

export function InformationCards() {
  const { summary, isFetchingSummary } = useGetSummaryProductQuery();

  const informations = [
    {
      id: 'total-products',
      label: 'Total de Produtos',
      value: summary.total,
      Icon: PackageIcon,
    },
    {
      id: 'active-products',
      label: 'Produtos Ativos',
      value: summary.active,
      Icon: CheckIcon,
    },
    {
      id: 'inactive-products',
      label: 'Produtos Inativos',
      value: summary.inactive,
      Icon: XIcon,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {informations.map(({ id, label, value, Icon }) => (
        <div
          key={id}
          className="flex w-full items-center justify-between rounded-md p-4 shadow-md sm:max-w-75"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm">{label}</span>

            <strong className="text-base">
              {isFetchingSummary ? <Spinner className="text-primary" /> : value}
            </strong>
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
