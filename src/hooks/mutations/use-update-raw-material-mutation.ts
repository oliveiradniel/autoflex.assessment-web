import { useMutation } from '@tanstack/react-query';

import { makeRawMaterialsService } from '@/app/core/factories/make-raw-materials-service';

import type { RawMaterialUpdateData } from '@/schemas/raw-material/raw-material-update-schema';

type MutateProps = {
  id: string;
  data: RawMaterialUpdateData;
};

export function useUpdateRawMaterialMutation() {
  const rawMaterialsService = makeRawMaterialsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: MutateProps) =>
      rawMaterialsService.partialUpdate(data.id, data.data),
  });

  return {
    updateRawMaterial: mutateAsync,
    isUpdatingRawMaterial: isPending,
  };
}
