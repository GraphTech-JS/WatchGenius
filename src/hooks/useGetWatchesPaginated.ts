import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { WatchesResponse } from "@/types";
import WatchService from "@/services/watches";

export const useGetWatchesPaginated = (page: number, limit: number) => {
  const options: UseQueryOptions<WatchesResponse> = {
    queryKey: ["watches", page, limit],
    queryFn: () => WatchService.getWatches(page, limit),
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  };

  return useQuery(options);
};
