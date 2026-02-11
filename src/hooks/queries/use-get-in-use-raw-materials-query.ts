import { useQuery } from '@tanstack/react-query';

import { makeRawMaterialsService } from '@/app/core/factories/make-raw-materials-service';

export function useGetInUseRawMaterials() {
  const rawMaterialsService = makeRawMaterialsService();

  const { data, isFetching } = useQuery({
    queryKey: ['in-use-raw-materials'],
    queryFn: () => rawMaterialsService.inUse(),
  });

  return {
    inUseRawMaterials: data ?? [],
    isFetchingInUseRawMaterials: isFetching,
  };
}
