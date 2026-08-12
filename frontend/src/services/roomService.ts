import api from "../api/axios";

import type {
  Room,
  RoomCreate,
  RoomUpdate,
  RoomImage,
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


export const uploadRoomImage = async (
  roomId: number,
  image: File
): Promise<RoomImage> => {
  const formData = new FormData();

  formData.append(
    "image",
    image
  );

  const response = await api.post<RoomImage>(
    `/rooms/${roomId}/images`,
    formData
  );

  return response.data;
};



export const updateRoomImage = async (
  roomId: number,
  imageId: number,
  image: File
): Promise<RoomImage> => {
  const formData = new FormData();

  formData.append(
    "image",
    image
  );

  const response = await api.put<RoomImage>(
    `/rooms/${roomId}/images/${imageId}`,
    formData
  );

  return response.data;
};



export const deleteRoomImage = async (
  roomId: number,
  imageId: number
): Promise<void> => {
  await api.delete(
    `/rooms/${roomId}/images/${imageId}`
  );
};