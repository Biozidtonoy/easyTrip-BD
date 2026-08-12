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
      {bookings.map((booking) => {
        const canEdit = booking.status === "PENDING";

        const canCancel =
          booking.status === "PENDING" ||
          booking.status === "CONFIRMED";

        return (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancel={onCancel}
            onEdit={onEdit}
            canEdit={canEdit}
            canCancel={canCancel}
          />
        );
      })}
    </section>
  );
};

export default BookingGrid;