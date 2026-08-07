import type { Booking } from "../../types/booking";

import BookingCard from "./BookingCard";

import "../../styles/bookingGrid.css";

interface BookingGridProps {
  bookings: Booking[];

  onCancel: (bookingId: number) => void;

  onEdit: (booking: Booking) => void;
}

const BookingGrid = ({
  bookings,
  onCancel,
  onEdit,
}: BookingGridProps) => {
  return (
    <section className="booking-grid">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancel}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
};

export default BookingGrid;