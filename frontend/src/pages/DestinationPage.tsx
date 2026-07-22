import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import type { Destination } from "../types/destination";

import DestinationGrid from "../components/destination/DestinationGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";

import "../styles/destinationPage.css";
import "../styles/destinationFilter.css";
import "../styles/destinationGrid.css";
import "../styles/pagination.css";

const DestinationPage = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);

        const data = await getDestinations();
        setDestinations(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <>

      <main className="destination-page">
        <section className="destination-header">
          <h1>Top Destinations</h1>

          <p>Explore the most beautiful places in Bangladesh</p>
        </section>

        <section className="destination-content">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="destination-message error">{error}</p>
          ) : destinations.length === 0 ? (
            <p className="destination-message">
              No destinations available.
            </p>
          ) : (
            <DestinationGrid destinations={destinations} />
          )}
        </section>
      </main>
    </>
  );
};

export default DestinationPage;