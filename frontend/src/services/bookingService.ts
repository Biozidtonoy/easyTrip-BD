import api from "../api/axios";

import type {
  Booking,
  BookingCreate,
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