import { useQuery } from "@tanstack/react-query";
import WatchService from "@/services/watches";
import { Watch } from "@/types";

export const useGetWatches = () => {
  return useQuery<Watch[]>({
    queryKey: ["watches"],
    queryFn: () => WatchService.getWatches(),
    staleTime: 5 * 60 * 1000, // 5 хвилин
  });
};
