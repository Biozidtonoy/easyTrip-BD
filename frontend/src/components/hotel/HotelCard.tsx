import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Hotel } from "../../types/hotel";

import "../../styles/hotelCardD.css";

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
  <Link
    to={`/hotels/${hotel.id}`}
    className="hotel-card-link"
  >
    <article className="hotel-card">

      <div className="hotel-card-image">
        <img
          src={hotel.image_url}
          alt={hotel.name}
        />
      </div>

      <div className="hotel-card-content">

        <h3>{hotel.name}</h3>

        <div className="hotel-card-location">

          <span>
            <MdLocationCity />
            {hotel.city}
          </span>

          <span>
            <FaMapMarkerAlt />
            {hotel.district}
          </span>

        </div>

        <p className="hotel-card-address">
          {hotel.address}
        </p>

        <div className="hotel-card-button">
          <span>View Details</span>
          <FiArrowRight />
        </div>

      </div>

    </article>
  </Link>
);
};

export default HotelCard;