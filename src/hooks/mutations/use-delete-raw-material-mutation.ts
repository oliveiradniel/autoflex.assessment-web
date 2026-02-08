import { useMutation } from '@tanstack/react-query';

import { makeRawMaterialsService } from '@/app/core/factories/make-raw-materials-service';

export function useDeleteRawMaterialMutation() {
  const rawMaterialsService = makeRawMaterialsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => rawMaterialsService.delete(id),
  });

  return {
    deleteRawMaterial: mutateAsync,
    isDeletingRawMaterial: isPending,
  };
}
