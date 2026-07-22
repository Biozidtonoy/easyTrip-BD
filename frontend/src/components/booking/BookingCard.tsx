import type { Booking } from "../../types/booking";

import {
  FaHotel,
  FaBed,
  FaDoorOpen,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";

import "../../styles/bookingCard.css";

interface BookingCardProps {
  booking: Booking;
  onCancel: (bookingId: number) => void;
}

const BookingCard = ({
  booking,
  onCancel,
}: BookingCardProps) => {
  return (
    <article className="booking-card-item">
      <div className="booking-card-header">
        <h3 className="booking-reference">
          {booking.booking_reference}
        </h3>

        <span className={`status ${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>
      </div>

      <div className="booking-card-body">
        <div className="booking-detail">
          <div className="booking-label">
            <FaHotel className="booking-icon" />
            <span>Hotel</span>
          </div>

          <span className="booking-value">
            {booking.room.hotel.name}
          </span>
        </div>

        <div className="booking-detail">
          <div className="booking-label">
            <FaBed className="booking-icon" />
            <span>Room Type</span>
          </div>

          <span className="booking-value">
            {booking.room.room_type}
          </span>
        </div>

        <div className="booking-detail">
          <div className="booking-label">
            <FaDoorOpen className="booking-icon" />
            <span>Room Number</span>
          </div>

          <span className="booking-value">
            {booking.room.room_number}
          </span>
        </div>

        <div className="booking-detail">
          <div className="booking-label">
            <FaCalendarAlt className="booking-icon" />
            <span>Check-in</span>
          </div>

          <span className="booking-value">
            {new Date(booking.check_in_date).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>

        <div className="booking-detail">
          <div className="booking-label">
            <FaCalendarAlt className="booking-icon" />
            <span>Check-out</span>
          </div>

          <span className="booking-value">
            {new Date(booking.check_out_date).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>

        <div className="booking-detail">
          <div className="booking-label">
            <FaMoneyBillWave className="booking-icon" />
            <span>Total Price</span>
          </div>

          <span className="booking-value">
            ৳
            {Number(booking.total_price).toLocaleString("en-BD", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="booking-detail">
          <div className="booking-label">
            <FaCreditCard className="booking-icon" />
            <span>Payment</span>
          </div>

          <span className="booking-value payment-status">
            {booking.payment_status}
          </span>
        </div>
      </div>

      <div className="booking-card-actions">
        <button
          className="cancel-booking-btn"
          onClick={() => onCancel(booking.id)}
        >
          Cancel Booking
        </button>
      </div>
    </article>
  );
};

export default BookingCard;