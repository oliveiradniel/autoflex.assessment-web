import { useMutation } from '@tanstack/react-query';

import { makeProductsService } from '@/app/core/factories/make-products-service';

import type { ProductCreateData } from '@/schemas/product/product-create-schema';

export function useCreateProductMutation() {
  const productsService = makeProductsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: ProductCreateData) => productsService.create(data),
  });

  return {
    createProduct: mutateAsync,
    isCreatingProduct: isPending,
  };
}
