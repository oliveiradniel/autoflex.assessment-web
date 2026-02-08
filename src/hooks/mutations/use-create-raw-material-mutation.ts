import { useMutation } from '@tanstack/react-query';

import { makeRawMaterialsService } from '@/app/core/factories/make-raw-materials-service';

import type { RawMaterialCreateData } from '@/schemas/raw-material/raw-material-create-schema';

export function useCreateRawMaterialMutation() {
  const rawMaterialsService = makeRawMaterialsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: RawMaterialCreateData) =>
      rawMaterialsService.create(data),
  });

  return {
    createRawMaterial: mutateAsync,
    isCreatingRawMaterial: isPending,
  };
}
