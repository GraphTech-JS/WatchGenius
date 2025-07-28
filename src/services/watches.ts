import axiosWithAuth from "@/api/axios";
import { Watch } from "@/types";
import { WatchesResponse } from "@/types";

export default class WatchService {
  static async getWatches(page = 1, limit = 8): Promise<WatchesResponse> {
    const res = await axiosWithAuth.get("/watches", {
      params: { page, limit },
    });
    return res.data.data;
  }

  static async getWatchById(id: string): Promise<Watch> {
    const response = await axiosWithAuth.get(`/watches/${id}`);
    return response.data.data;
  }
  static async createWatch(payload: Partial<Watch>): Promise<Watch> {
    const { data } = await axiosWithAuth.post<Watch>("/watches", payload);
    return data;
  }

  static async updateWatch(
    id: string,
    payload: Partial<Watch>
  ): Promise<Watch> {
    const { data } = await axiosWithAuth.put<Watch>(`/watches/${id}`, payload);
    return data;
  }

  static async deleteWatch(id: string): Promise<void> {
    await axiosWithAuth.delete(`/watches/${id}`);
  }
}
