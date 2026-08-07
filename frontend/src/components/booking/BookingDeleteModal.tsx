import { useEffect } from "react";

import "../../styles/bookingDeleteModal.css";

interface BookingDeleteModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BookingDeleteModal = ({
  open,
  loading,
  onClose,
  onConfirm,
}: BookingDeleteModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  return (
    <div
      className="booking-delete-overlay"
      onClick={() => {
        if (!loading) {
          onClose();
        }
      }}
    >
      <div
        className="booking-delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Cancel Booking</h2>

        <p>
          Are you sure you want to cancel this booking?
        </p>

        <p className="booking-delete-warning">
          Your booking will be cancelled immediately.
        </p>

        <div className="booking-delete-actions">
          <button
            className="booking-delete-no"
            onClick={onClose}
            disabled={loading}
          >
            Keep Booking
          </button>

          <button
            className="booking-delete-yes"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Cancelling..."
              : "Yes, Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDeleteModal;