import { makeProductsService } from '@/app/core/factories/make-products-service';
import { useQuery } from '@tanstack/react-query';

export function useGetSummaryProductQuery() {
  const productsService = makeProductsService();

  const { data, isFetching } = useQuery({
    queryKey: ['summary-product'],
    queryFn: async () => productsService.getSummary(),
  });

  return {
    summary: data ?? {
      total: 0,
      active: 0,
      inactive: 0,
    },
    isFetchingSummary: isFetching,
  };
}
