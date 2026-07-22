import type { Destination } from "../../types/destination";

import "../../styles/destinationCard.css";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <article className="destination-card">
      <div className="destination-content">

        <h2 className="destination-title">
          📍 {destination.name}
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
              {destination.division}
            </span>
          </div>

          <div className="info-box">
            <span className="info-label">
              District
            </span>

            <span className="info-value">
              {destination.district}
            </span>
          </div>

        </div>

        <button className="details-btn">
          View Details
        </button>

      </div>
    </article>
  );
};

export default DestinationCard;