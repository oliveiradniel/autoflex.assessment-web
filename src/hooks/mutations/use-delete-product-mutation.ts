import { useMutation } from '@tanstack/react-query';

import { makeProductsService } from '@/app/core/factories/make-products-service';

export function useDeleteProductMutation() {
  const productsService = makeProductsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => productsService.delete(id),
  });

  return {
    deleteProduct: mutateAsync,
    isDeletingProduct: isPending,
  };
}
