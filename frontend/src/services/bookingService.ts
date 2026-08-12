import api from "../api/axios";

import type {
  Booking,
  BookingCreate,
  BookingUpdate,
} from "../types/booking";

export const createBooking = async (
  bookingData: BookingCreate
): Promise<Booking> => {
  const response = await api.post<Booking>(
    "/bookings",
    bookingData
  );

  return response.data;
};

export const updateBooking = async (
  bookingId: number,
  bookingData: BookingUpdate
): Promise<Booking> => {
  const response = await api.patch<Booking>(
    `/bookings/${bookingId}`,
    bookingData
  );

  return response.data;
};

export const getMyBookings = async (): Promise<
  Booking[]
> => {
  const response = await api.get<Booking[]>(
    "/bookings"
  );

  return response.data;
};

export const cancelBooking = async (
  bookingId: number
): Promise<void> => {
  await api.delete(`/bookings/${bookingId}`);
};

export const getOwnerBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>(
    "/bookings/owner"
  );

  return response.data;
};

export const confirmBooking = async (
  bookingId: number
): Promise<Booking> => {
  const response = await api.patch<Booking>(
    `/bookings/${bookingId}/confirm`
  );

  return response.data;
};


export const rejectBooking = async (
  bookingId: number,
  cancellationReason: string
): Promise<Booking> => {
  const response = await api.patch<Booking>(
    `/bookings/${bookingId}/reject`,
    {
      cancellation_reason: cancellationReason,
    }
  );

  return response.data;
};