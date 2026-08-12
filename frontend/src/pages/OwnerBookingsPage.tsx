import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import LoadingSpinner from "../components/common/LoadingSpinner";

import {
  FaHotel,
  FaBed,
  FaDoorOpen,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";

import {
  getOwnerBookings,
  confirmBooking,
  rejectBooking,
} from "../services/bookingService";
import BookingRejectModal from "../components/booking/BookingRejectModal";

import type { Booking } from "../types/booking";

import "../styles/ownerBookings.css";

const OwnerBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejectBookingId, setRejectBookingId] = useState<number | null>(null);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const [processingBookingId, setProcessingBookingId] = useState<number | null>(
    null,
  );

  const fetchOwnerBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOwnerBookings();

      setBookings(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.detail ?? "Failed to load bookings.";

        setError(message);
        toast.error(message);
      } else {
        const message = "Failed to load bookings.";

        setError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const handleConfirmBooking = async (bookingId: number) => {
    try {
      setProcessingBookingId(bookingId);

      const updatedBooking = await confirmBooking(bookingId);

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId ? updatedBooking : booking,
        ),
      );

      toast.success("Booking confirmed successfully.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ?? "Failed to confirm booking.",
        );
      } else {
        toast.error("Failed to confirm booking.");
      }
    } finally {
      setProcessingBookingId(null);
    }
  };

  const handleOpenReject = (bookingId: number) => {
    setRejectBookingId(bookingId);
    setRejectModalOpen(true);
  };

  const handleCloseReject = () => {
    if (processingBookingId !== null) {
      return;
    }

    setRejectBookingId(null);
    setRejectModalOpen(false);
  };
  
  const handleRejectBooking = async (
  reason: string
) => {
  if (rejectBookingId === null) {
    return;
  }

  try {
    setProcessingBookingId(
      rejectBookingId
    );

    const updatedBooking =
      await rejectBooking(
        rejectBookingId,
        reason
      );

    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === rejectBookingId
          ? updatedBooking
          : booking
      )
    );

    toast.success(
      "Booking rejected successfully."
    );

    setRejectBookingId(null);
    setRejectModalOpen(false);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.detail ??
          "Failed to reject booking."
      );
    } else {
      toast.error(
        "Failed to reject booking."
      );
    }
  } finally {
    setProcessingBookingId(null);
  }
};



  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <main className="owner-bookings-page">
        <div className="owner-bookings-container">
          <div className="owner-bookings-error">
            <h1>Unable to Load Bookings</h1>

            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="owner-bookings-page">
      <div className="owner-bookings-container">
        {/* Header */}

        <header className="owner-bookings-header">
          <span className="owner-bookings-badge">Hotel Owner</span>

          <h1>Booking Management</h1>

          <p>View and manage bookings made for your hotels.</p>
        </header>

        {/* Overview */}

        <section className="owner-bookings-overview">
          <div className="owner-bookings-stat-card">
            <span>Total Bookings</span>

            <strong>{bookings.length}</strong>
          </div>

          <div className="owner-bookings-stat-card">
            <span>Pending</span>

            <strong>
              {
                bookings.filter((booking) => booking.status === "PENDING")
                  .length
              }
            </strong>
          </div>

          <div className="owner-bookings-stat-card">
            <span>Confirmed</span>

            <strong>
              {
                bookings.filter((booking) => booking.status === "CONFIRMED")
                  .length
              }
            </strong>
          </div>
        </section>

        {/* Bookings */}

        <section className="owner-bookings-section">
          <div className="owner-bookings-section-header">
            <div>
              <h2>Bookings</h2>

              <p>Reservations made for your hotels.</p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="owner-bookings-empty">
              <h3>No Bookings Yet</h3>

              <p>There are currently no bookings for your hotels.</p>
            </div>
          ) : (
            <div className="owner-bookings-grid">
              {bookings.map((booking) => (
                <article key={booking.id} className="owner-booking-card">
                  {/* Card Header */}

                  <div className="owner-booking-card-header">
                    <h3>{booking.booking_reference}</h3>

                    <span
                      className={`owner-booking-status ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking Information */}

                  <div className="owner-booking-details">
                    <div className="owner-booking-detail">
                      <div className="owner-booking-label">
                        <FaHotel />
                        <span>Hotel</span>
                      </div>

                      <strong>{booking.room.hotel.name}</strong>
                    </div>

                    <div className="owner-booking-detail">
                      <div className="owner-booking-label">
                        <FaBed />
                        <span>Room Type</span>
                      </div>

                      <strong>{booking.room.room_type}</strong>
                    </div>

                    <div className="owner-booking-detail">
                      <div className="owner-booking-label">
                        <FaDoorOpen />
                        <span>Room Number</span>
                      </div>

                      <strong>{booking.room.room_number}</strong>
                    </div>

                    <div className="owner-booking-detail">
                      <div className="owner-booking-label">
                        <FaCalendarAlt />
                        <span>Check-in</span>
                      </div>

                      <strong>
                        {new Date(booking.check_in_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </strong>
                    </div>

                    <div className="owner-booking-detail">
                      <div className="owner-booking-label">
                        <FaCalendarAlt />
                        <span>Check-out</span>
                      </div>

                      <strong>
                        {new Date(booking.check_out_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </strong>
                    </div>

                    <div className="owner-booking-detail">
                      <div className="owner-booking-label">
                        <FaMoneyBillWave />
                        <span>Total Price</span>
                      </div>

                      <strong>
                        ৳
                        {Number(booking.total_price).toLocaleString("en-BD", {
                          minimumFractionDigits: 2,
                        })}
                      </strong>
                    </div>

                    <div className="owner-booking-detail">
                      <div className="owner-booking-label">
                        <FaCreditCard />
                        <span>Payment</span>
                      </div>

                      <strong>{booking.payment_status}</strong>
                    </div>
                  </div>

                  {/* Special Request */}

                  {booking.special_requests && (
                    <div className="owner-booking-request">
                      <span>Special Request</span>

                      <p>{booking.special_requests}</p>
                    </div>
                  )}

                  {/* Cancellation Reason */}

                  {booking.cancellation_reason && (
                    <div className="owner-booking-cancellation">
                      <span>Cancellation Reason</span>

                      <p>{booking.cancellation_reason}</p>
                    </div>
                  )}

                  {/* Actions */}

                  {booking.status === "PENDING" && (
                    <div className="owner-booking-actions">
                      <button
                        type="button"
                        className="owner-booking-confirm-button"
                        onClick={() => handleConfirmBooking(booking.id)}
                        disabled={processingBookingId === booking.id}
                      >
                        {processingBookingId === booking.id
                          ? "Confirming..."
                          : "Confirm Booking"}
                      </button>

                      <button
                        type="button"
                        className="owner-booking-reject-button"
                        onClick={() => handleOpenReject(booking.id)}
                        disabled={processingBookingId === booking.id}
                      >
                        Reject Booking
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      <BookingRejectModal
        open={rejectModalOpen}
        loading={
          rejectBookingId !== null && processingBookingId === rejectBookingId
        }
        onClose={handleCloseReject}
        onConfirm={handleRejectBooking}
      />
    </main>
  );
};

export default OwnerBookingsPage;
