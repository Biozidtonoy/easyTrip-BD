import DestinationCard from "./DestinationCard";
import type { Destination } from "../../types/destination";

import "../../styles/destinationGrid.css";

interface DestinationGridProps {
  destinations: Destination[];
}

const DestinationGrid = ({
  destinations,
}: DestinationGridProps) => {
  return (
    <section className="destination-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
        />
      ))}
    </section>
  );
};

export default DestinationGrid;