import axiosWithAuth from "@/api/axios";
import { Watch } from "@/types";

export default class WatchService {
  static async getWatches(): Promise<Watch[]> {
    const res = await axiosWithAuth.get("/watches");
    return res.data.data.watches; // повертаємо лише масив
  }

  static async getWatchById(id: string): Promise<Watch> {
    const { data } = await axiosWithAuth.get<Watch>(`/watches/${id}`);
    return data;
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
