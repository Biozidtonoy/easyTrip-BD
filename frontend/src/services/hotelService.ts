import api from "../api/axios";

import type {
  Hotel,
  HotelCreate,
  HotelUpdate,
} from "../types/hotel";

// --------------------------------------------------
// Get all hotels
// --------------------------------------------------

export const getHotels = async (): Promise<Hotel[]> => {
  const response = await api.get<Hotel[]>(
    "/hotels"
  );

  return response.data;
};


// --------------------------------------------------
// Get hotels by destination
// --------------------------------------------------

export const getHotelsByDestination = async (
  destinationId: number
): Promise<Hotel[]> => {
  const response = await api.get<Hotel[]>(
    `/hotels?destination_id=${destinationId}`
  );

  return response.data;
};


// --------------------------------------------------
// Get hotel by ID
// --------------------------------------------------

export const getHotelById = async (
  id: number
): Promise<Hotel> => {
  const response = await api.get<Hotel>(
    `/hotels/${id}`
  );

  return response.data;
};


// --------------------------------------------------
// Get current owner's hotels
// --------------------------------------------------

export const getMyHotels = async (): Promise<Hotel[]> => {
  const response = await api.get<Hotel[]>(
    "/hotels/owner/me"
  );

  return response.data;
};


// --------------------------------------------------
// Create hotel
// --------------------------------------------------

export const createHotel = async (
  hotelData: HotelCreate
): Promise<Hotel> => {
  const formData = new FormData();

  formData.append(
    "name",
    hotelData.name
  );

  formData.append(
    "description",
    hotelData.description
  );

  formData.append(
    "address",
    hotelData.address
  );

  formData.append(
    "city",
    hotelData.city
  );

  formData.append(
    "district",
    hotelData.district
  );

  formData.append(
    "destination_id",
    String(hotelData.destination_id)
  );

  formData.append(
    "image",
    hotelData.image
  );

  const response = await api.post<Hotel>(
    "/hotels",
    formData
  );

  return response.data;
};


// --------------------------------------------------
// Update hotel
// --------------------------------------------------

export const updateHotel = async (
  id: number,
  hotelData: HotelUpdate
): Promise<Hotel> => {
  const formData = new FormData();

  if (hotelData.name !== undefined) {
    formData.append(
      "name",
      hotelData.name
    );
  }

  if (hotelData.description !== undefined) {
    formData.append(
      "description",
      hotelData.description
    );
  }

  if (hotelData.address !== undefined) {
    formData.append(
      "address",
      hotelData.address
    );
  }

  if (hotelData.city !== undefined) {
    formData.append(
      "city",
      hotelData.city
    );
  }

  if (hotelData.district !== undefined) {
    formData.append(
      "district",
      hotelData.district
    );
  }

  if (hotelData.destination_id !== undefined) {
    formData.append(
      "destination_id",
      String(hotelData.destination_id)
    );
  }

  if (hotelData.image !== undefined) {
    formData.append(
      "image",
      hotelData.image
    );
  }

  const response = await api.patch<Hotel>(
    `/hotels/${id}`,
    formData
  );

  return response.data;
};


// --------------------------------------------------
// Delete hotel
// --------------------------------------------------

export const deleteHotel = async (
  id: number
): Promise<void> => {
  await api.delete(
    `/hotels/${id}`
  );
};