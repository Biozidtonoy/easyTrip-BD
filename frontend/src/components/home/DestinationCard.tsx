import "../../styles/destinationCard.css";
import "../../styles/animations.css";
import { FaLocationDot } from "react-icons/fa6";

type DestinationCardProps = {
  image: string;
  name: string;
  category: string;
  description: string;
  location: string;
};

const DestinationCard = ({
  image,
  name,
  category,
  description,
  location,
}: DestinationCardProps) => {
  return (
    <div className="destination-card">
      <div className="destination-image">
        <img src={image} alt={name} />

        <span className="destination-category">
          {category}
        </span>
      </div>

      <div className="destination-body">
        <h3>{name}</h3>

        <p>{description}</p>

        <span className="destination-location">
          <FaLocationDot className="location-icon" />
            <span>{location}</span>
        </span>
      </div>
    </div>
  );
};

export default DestinationCard;