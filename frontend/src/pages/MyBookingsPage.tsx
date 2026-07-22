import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

import LoadingSpinner from "../components/common/LoadingSpinner";
import BookingGrid from "../components/booking/BookingGrid";

import {
  cancelBooking,
  getMyBookings,
} from "../services/bookingService";

import type { Booking } from "../types/booking";

import "../styles/myBookings.css";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();

      setBookings(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ??
            "Failed to load bookings."
        );
      } else {
        setError("Failed to load bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (
    bookingId: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      await cancelBooking(bookingId);

      setBookings((prev) =>
        prev.filter(
          (booking) => booking.id !== bookingId
        )
      );

      toast.success("Booking cancelled successfully.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Failed to cancel booking."
        );
      } else {
        toast.error("Failed to cancel booking.");
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="my-bookings-page">
      <div className="my-bookings-container">
        <h1>My Bookings</h1>

        {bookings.length === 0 ? (
          <p>You haven't made any bookings yet.</p>
        ) : (
          <BookingGrid
            bookings={bookings}
            onCancel={handleCancelBooking}
          />
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;