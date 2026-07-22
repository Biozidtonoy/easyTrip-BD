import type { Destination } from "../../types/destination";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "../../styles/destinationCardD.css";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="destination-card-link"
    >
      <article className="destination-card">
        <div className="destination-image">
          <img
            src={destination.image_url}
            alt={destination.name}
          />
        </div>

        <div className="destination-content">
          <h2 className="destination-title">
            <FaMapMarkerAlt className="title-icon" />
            {destination.name}
          </h2>

          <p className="destination-description">
            {destination.description}
          </p>

          <div className="destination-info">
            <div className="info-box">
              <span className="info-label">
                Division
              </span>

              <span className="info-value">
                <MdLocationCity />
                {destination.division}
              </span>
            </div>

            <div className="info-box">
              <span className="info-label">
                District
              </span>

              <span className="info-value">
                <FaMapMarkerAlt />
                {destination.district}
              </span>
            </div>
          </div>

          <div className="details-btn">
            <span>View Details</span>
            <FiArrowRight />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default DestinationCard;