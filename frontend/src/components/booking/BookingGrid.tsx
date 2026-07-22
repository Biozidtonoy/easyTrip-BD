import type { Booking } from "../../types/booking";

import BookingCard from "./BookingCard";

import "../../styles/bookingGrid.css";

interface BookingGridProps {
  bookings: Booking[];
  onCancel: (bookingId: number) => void;
}

const BookingGrid = ({
  bookings,
  onCancel,
}: BookingGridProps) => {
  return (
    <section className="booking-grid">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancel}
        />
      ))}
    </section>
  );
};

export default BookingGrid;