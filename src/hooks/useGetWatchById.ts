import { useQuery } from "@tanstack/react-query";
import WatchService from "@/services/watches";
import { Watch } from "@/types";

export const useGetWatchById = (id: string) => {
  return useQuery<Watch>({
    queryKey: ["watch", id],
    queryFn: () => WatchService.getWatchById(id),
    enabled: !!id, // запит виконується лише якщо id не порожній
    staleTime: 5 * 60 * 1000, // 5 хвилин
  });
};
