import "../../styles/bestHotels.css";
import "../../styles/animations.css";
import { hotels } from "../../data/hotels";
import HotelCard from "./HotelCard";

const BestHotelsSection = () => {
  return (
    <section className="best-hotels fade-in">

      <div className="best-hotels-container">

        <div className="best-hotels-header">

          <div>

            <h2>Best Hotels</h2>

            <p>
              Find the perfect place to stay
              during your journey.
            </p>

          </div>

          <button>
            View All Hotels →
          </button>

        </div>

        <div className="hotel-grid">

          {hotels.map((hotel) => (

            <HotelCard
              key={hotel.id}
              {...hotel}
            />

          ))}

        </div>

      </div>
    </section>
  );
};

export default BestHotelsSection;