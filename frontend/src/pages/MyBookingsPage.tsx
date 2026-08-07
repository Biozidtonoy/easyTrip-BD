import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

import LoadingSpinner from "../components/common/LoadingSpinner";
import BookingGrid from "../components/booking/BookingGrid";
import BookingEditModal from "../components/booking/BookingEditModal";
import BookingDeleteModal from "../components/booking/BookingDeleteModal";

import {
  cancelBooking,
  getMyBookings,
  updateBooking,
} from "../services/bookingService";

import type { Booking } from "../types/booking";

import "../styles/myBookings.css";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingBooking, setEditingBooking] =
    useState<Booking | null>(null);

  const [editModalOpen, setEditModalOpen] =
    useState(false);

  const [updating, setUpdating] =
    useState(false);

  const [deleteBookingId, setDeleteBookingId] =
    useState<number | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

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

  // --------------------------
  // DELETE BOOKING
  // --------------------------

  const handleOpenDelete = (bookingId: number) => {
    setDeleteBookingId(bookingId);
    setDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteBookingId(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteBookingId) return;

    try {
      setDeleting(true);

      await cancelBooking(deleteBookingId);

      setBookings((prev) =>
        prev.filter(
          (booking) =>
            booking.id !== deleteBookingId
        )
      );

      toast.success(
        "Booking cancelled successfully."
      );

      handleCloseDelete();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Failed to cancel booking."
        );
      } else {
        toast.error(
          "Failed to cancel booking."
        );
      }
    } finally {
      setDeleting(false);
    }
  };

  // --------------------------
  // EDIT BOOKING
  // --------------------------

  const handleOpenEdit = (
    booking: Booking
  ) => {
    setEditingBooking(booking);
    setEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setEditingBooking(null);
  };

  const handleUpdateBooking = async (
    checkInDate: string,
    checkOutDate: string,
    specialRequests: string
  ) => {
    if (!editingBooking) return;

    try {
      setUpdating(true);

      await updateBooking(
        editingBooking.id,
        {
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          special_requests:
            specialRequests.trim() ||
            undefined,
        }
      );

      await fetchBookings();

      toast.success(
        "Booking updated successfully!"
      );

      handleCloseEdit();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Failed to update booking."
        );
      } else {
        toast.error(
          "Failed to update booking."
        );
      }
    } finally {
      setUpdating(false);
    }
  };

  // --------------------------
  // UI
  // --------------------------

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="my-bookings-page">
      <div className="container">
        <h1>My Bookings</h1>

        {bookings.length === 0 ? (
          <p>
            You haven't made any bookings
            yet.
          </p>
        ) : (
          <BookingGrid
            bookings={bookings}
            onCancel={handleOpenDelete}
            onEdit={handleOpenEdit}
          />
        )}

        {editingBooking && (
          <BookingEditModal
            booking={editingBooking}
            open={editModalOpen}
            loading={updating}
            onClose={handleCloseEdit}
            onUpdate={
              handleUpdateBooking
            }
          />
        )}

        <BookingDeleteModal
          open={deleteModalOpen}
          loading={deleting}
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </main>
  );
};

export default MyBookingsPage;