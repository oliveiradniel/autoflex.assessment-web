import { useMutation } from '@tanstack/react-query';

import { makeProductsService } from '@/app/core/factories/make-products-service';

import type { ProductUpdateData } from '@/schemas/product/product-update-schema';

type MutateProps = {
  id: string;
  data: ProductUpdateData;
};

export function useUpdateProductMutation() {
  const productsService = makeProductsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: MutateProps) =>
      productsService.partialUpdate(data.id, data.data),
  });

  return {
    updateProduct: mutateAsync,
    isUpdatingProduct: isPending,
  };
}
