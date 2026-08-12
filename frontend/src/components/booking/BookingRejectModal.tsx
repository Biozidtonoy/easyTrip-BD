import { useEffect, useState } from "react";

import "../../styles/bookingRejectModal.css";


interface BookingRejectModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}


const BookingRejectModal = ({
  open,
  loading,
  onClose,
  onConfirm,
}: BookingRejectModalProps) => {
  const [reason, setReason] = useState("");


  useEffect(() => {
    if (open) {
      setReason("");
    }
  }, [open]);


  if (!open) {
    return null;
  }


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      return;
    }

    onConfirm(trimmedReason);
  };


  return (
    <div className="booking-reject-modal-overlay">
      <div className="booking-reject-modal">

        <div className="booking-reject-modal-header">
          <div>
            <span className="booking-reject-modal-label">
              Booking Management
            </span>

            <h2>Reject Booking</h2>

            <p>
              Please provide a reason for rejecting
              this booking.
            </p>
          </div>

          <button
            type="button"
            className="booking-reject-modal-close"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>


        <form onSubmit={handleSubmit}>

          <div className="booking-reject-modal-group">
            <label htmlFor="cancellation-reason">
              Cancellation Reason
            </label>

            <textarea
              id="cancellation-reason"
              value={reason}
              onChange={(event) =>
                setReason(event.target.value)
              }
              placeholder="Enter the reason for rejecting this booking..."
              rows={5}
              required
              disabled={loading}
            />
          </div>


          <div className="booking-reject-modal-actions">

            <button
              type="button"
              className="booking-reject-modal-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="booking-reject-modal-confirm"
              disabled={loading || !reason.trim()}
            >
              {loading
                ? "Rejecting..."
                : "Reject Booking"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};


export default BookingRejectModal;