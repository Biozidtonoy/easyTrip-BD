import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import "../../styles/hotelCard.css";
import "../../styles/animations.css";

type HotelCardProps = {
  image: string;
  name: string;
  location: string;
  rating: number;
  price: number;
};

const HotelCard = ({
  image,
  name,
  location,
  rating,
  price,
}: HotelCardProps) => {
  return (
    <div className="hotel-card fade-in">
      <img src={image} alt={name} />

      <div className="hotel-body">
        <div className="hotel-rating">
          <FaStar className="star-icon" />
          <span>{rating}</span>
        </div>

        <h3>{name}</h3>

        <p className="hotel-location">
          <FaLocationDot className="location-icon" />
          <span>{location}</span>
        </p>

        <div className="hotel-footer">
          <span className="hotel-price">
            From <strong>${price}</strong> / night
          </span>

          <button className="book-btn">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;