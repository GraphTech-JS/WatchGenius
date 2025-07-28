import { useQuery } from "@tanstack/react-query";
import type { WatchesResponse } from "@/types";
import WatchService from "@/services/watches";

export const useGetWatchesPaginated = (
  page: number,
  limit: number,
  brand?: string,
  search?: string
) => {
  return useQuery<WatchesResponse>({
    queryKey: ["watches", page, limit, brand, search],
    queryFn: () => WatchService.getWatches({ page, limit, brand, search }),
    staleTime: 1000 * 60 * 5,
  });
};
