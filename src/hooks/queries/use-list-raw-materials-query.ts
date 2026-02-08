import { useQuery } from '@tanstack/react-query';

import { makeRawMaterialsService } from '@/app/core/factories/make-raw-materials-service';

export function useListRawMaterialsQuery() {
  const rawMaterialsService = makeRawMaterialsService();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['raw-materials'],
    queryFn: () => rawMaterialsService.list(),
  });

  return {
    rawMaterialList: data ?? [],
    isFetchingRawMaterialList: isFetching,
    isLoadingRawMaterialList: isLoading,
  };
}
