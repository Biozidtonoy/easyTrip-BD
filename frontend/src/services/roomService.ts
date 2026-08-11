import api from "../api/axios";

import type {
  Room,
  RoomCreate,
  RoomUpdate,
} from "../types/room";


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


export const createRoom = async (
  roomData: RoomCreate
): Promise<Room> => {
  const response = await api.post<Room>(
    "/rooms",
    roomData
  );

  return response.data;
};


export const updateRoom = async (
  roomId: number,
  roomData: RoomUpdate
): Promise<Room> => {
  const response = await api.patch<Room>(
    `/rooms/${roomId}`,
    roomData
  );

  return response.data;
};


export const deleteRoom = async (
  roomId: number
): Promise<void> => {
  await api.delete(
    `/rooms/${roomId}`
  );
};