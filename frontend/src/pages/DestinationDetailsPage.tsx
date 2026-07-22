import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

import { getDestinationById } from "../services/destinationService";
import type { Destination } from "../types/destination";
import LoadingSpinner from "../components/common/LoadingSpinner";

import "../styles/destinationDetailsPage.css";

const DestinationDetailsPage = () => {
  const { id } = useParams();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const data = await getDestinationById(Number(id));

        setDestination(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load destination.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <main className="destination-details-page">
        <p className="details-error">{error}</p>
      </main>
    );
  }

  if (!destination) {
    return (
      <main className="destination-details-page">
        <p className="details-error">Destination not found.</p>
      </main>
    );
  }

  return (
    <main className="destination-details-page">

      <div className="details-image">
        <img
          src={destination.image_url}
          alt={destination.name}
        />
      </div>

      <section className="details-content">

        <h1>{destination.name}</h1>

        <p className="details-description">
          {destination.description}
        </p>

        <div className="details-info">

          <div className="details-box">
            <span className="details-label">
              <MdLocationCity />
              Division
            </span>

            <span>{destination.division}</span>
          </div>

          <div className="details-box">
            <span className="details-label">
              <FaMapMarkerAlt />
              District
            </span>

            <span>{destination.district}</span>
          </div>

        </div>

      </section>

    </main>
  );
};

export default DestinationDetailsPage;