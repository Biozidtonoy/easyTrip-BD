import "../../styles/popularDestinations.css";
import { Link } from "react-router-dom";
import { destinations } from "../../data/destination";
import "../../styles/animations.css";
import DestinationCard from "./DestinationCard";

const PopularDestinationsSection = () => {
  return (
    <section className="popular-section fade-in">
      <div className="popular-container">
        <div className="popular-header">
          <div>
            <h2>Popular Destinations</h2>

            <p>Explore the most loved places in Bangladesh.</p>
          </div>

          <Link to="/destinations" className="view-all-btn">
            View All →
          </Link>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection;
