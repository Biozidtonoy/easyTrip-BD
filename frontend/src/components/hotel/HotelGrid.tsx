import type { Hotel } from "../../types/hotel";
import HotelCard from "./HotelCard";

import "../../styles/hotelGrid.css";

interface HotelGridProps {
  hotels: Hotel[];
}

const HotelGrid = ({ hotels }: HotelGridProps) => {
  return (
    <section className="hotel-grid">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
        />
      ))}
    </section>
  );
};

export default HotelGrid;