import { useQuery } from '@tanstack/react-query';

import { makeProductsService } from '@/app/core/factories/make-products-service';

export function useListProductsQuery() {
  const productsService = makeProductsService();

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => productsService.list(),
    placeholderData: [],
  });

  return {
    productList: data ?? [],
  };
}
