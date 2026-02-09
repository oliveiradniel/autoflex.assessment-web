import { useQuery } from '@tanstack/react-query';

import { makeProductsService } from '@/app/core/factories/make-products-service';

export function useCalculateProductionMutation() {
  const productsService = makeProductsService();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['production-report'],
    queryFn: () => productsService.calculateProduction(),
  });

  return {
    productionReport: data ?? [],
    isLoadingProductReport: isLoading,
    isFetchingProductReport: isFetching,
  };
}
