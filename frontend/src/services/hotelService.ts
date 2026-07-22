import api from "../api/axios";
import type { Hotel } from "../types/hotel";

export const getHotels = async (): Promise<Hotel[]> => {
  const response = await api.get<Hotel[]>("/hotels");

  return response.data;
};

export const getHotelsByDestination = async (
  destinationId: number
): Promise<Hotel[]> => {
  const response = await api.get<Hotel[]>(
    `/hotels?destination_id=${destinationId}`
  );

  return response.data;
};

export const getHotelById = async (
  id: number
): Promise<Hotel> => {
  const response = await api.get<Hotel>(
    `/hotels/${id}`
  );

  return response.data;
};