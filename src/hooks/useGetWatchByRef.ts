import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Watch } from "@/types";

export const useGetWatchByRef = (ref: string) => {
  return useQuery({
    queryKey: ["watch", ref],
    queryFn: async (): Promise<Watch> => {
      const { data } = await axios.get(`/api/watches/${ref}`);
      return data;
    },
    enabled: !!ref,
  });
};
