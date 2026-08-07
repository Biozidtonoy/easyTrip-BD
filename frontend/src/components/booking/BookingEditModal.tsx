import { useEffect, useMemo, useState } from "react";
import type { Booking } from "../../types/booking";

import "../../styles/bookingEditModal.css";

interface BookingEditModalProps {
  booking: Booking;
  open: boolean;
  loading: boolean;

  onClose: () => void;

  onUpdate: (
    checkInDate: string,
    checkOutDate: string,
    specialRequests: string,
  ) => void;
}

const BookingEditModal = ({
  booking,
  open,
  loading,
  onClose,
  onUpdate,
}: BookingEditModalProps) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (!booking) return;

    setCheckInDate(booking.check_in_date);
    setCheckOutDate(booking.check_out_date);
    setSpecialRequests(booking.special_requests ?? "");
  }, [booking]);

  const bookingSummary = useMemo(() => {
    if (!checkInDate || !checkOutDate) {
      return {
        nights: 0,
        error: "",
      };
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return {
        nights: 0,
        error: "Check-in date cannot be in the past.",
      };
    }

    if (checkOut <= checkIn) {
      return {
        nights: 0,
        error: "Check-out date must be after check-in.",
      };
    }

    return {
      nights:
        (checkOut.getTime() - checkIn.getTime()) /
        (1000 * 60 * 60 * 24),
      error: "",
    };
  }, [checkInDate, checkOutDate]);

  const hasChanges =
    checkInDate !== booking.check_in_date ||
    checkOutDate !== booking.check_out_date ||
    specialRequests !== (booking.special_requests ?? "");

  if (!open) return null;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="booking-modal-overlay"
      onClick={() => {
        if (
          hasChanges &&
          !window.confirm("Discard your changes?")
        ) {
          return;
        }

        onClose();
      }}
    >
      <div
        className="booking-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Edit Booking</h2>

        <label>Check-in Date</label>

        <input
          type="date"
          min={today}
          value={checkInDate}
          onChange={(e) =>
            setCheckInDate(e.target.value)
          }
        />

        <label>Check-out Date</label>

        <input
          type="date"
          min={checkInDate || today}
          value={checkOutDate}
          onChange={(e) =>
            setCheckOutDate(e.target.value)
          }
        />

        <label>Special Requests</label>

        <textarea
          rows={4}
          value={specialRequests}
          onChange={(e) =>
            setSpecialRequests(e.target.value)
          }
        />

        {bookingSummary.error && (
          <p className="booking-modal-error">
            {bookingSummary.error}
          </p>
        )}

        <div className="booking-modal-footer">
          <button
            className="booking-modal-cancel"
            onClick={() => {
              if (
                hasChanges &&
                !window.confirm(
                  "Discard your changes?",
                )
              ) {
                return;
              }

              onClose();
            }}
          >
            Cancel
          </button>

          <button
            className="booking-modal-update"
            disabled={
              loading ||
              bookingSummary.nights === 0 ||
              !!bookingSummary.error ||
              !hasChanges
            }
            onClick={() =>
              onUpdate(
                checkInDate,
                checkOutDate,
                specialRequests,
              )
            }
          >
            {loading
              ? "Updating..."
              : "Update Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingEditModal;