import api from "../api/axios";
import type { Destination } from "../types/destination";

export const getDestinations = async (): Promise<Destination[]> => {
  const response = await api.get<Destination[]>("/destinations");

  return response.data;
};

export const getDestinationById = async (
  id: number
): Promise<Destination> => {
  const response = await api.get<Destination>(
    `/destinations/${id}`
  );

  return response.data;
};