import api from "../api/axios";

import type { Room } from "../types/room";

export const getRoomsByHotel = async (
  hotelId: number
): Promise<Room[]> => {
  const response = await api.get<Room[]>(
    `/rooms?hotel_id=${hotelId}`
  );

  return response.data;
};

export const getRoomById = async (
  roomId: number
): Promise<Room> => {
  const response = await api.get<Room>(
    `/rooms/${roomId}`
  );

  return response.data;
};