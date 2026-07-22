import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import "../styles/destinationPage.css";
import "../styles/destinationFilter.css";
import "../styles/destinationGrid.css";
import "../styles/pagination.css";
import DestinationFilter from "../components/destination/DestinationFilter";
import DestinationGrid from "../components/destination/DestinationGrid";
import Pagination from "../components/destination/Pagination";
import type { Destination } from "../types/destination";


const DestinationPage = () => {

  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <main className="destination-page">

      <section className="destination-header">

        <h1>Top Destinations</h1>

        <p>
          Explore the most beautiful places in Bangladesh
        </p>

      </section>

      <section className="destination-content">

        <DestinationFilter />

        <DestinationGrid destinations={destinations} />

      </section>

      <Pagination />

    </main>
  );
};

export default DestinationPage;