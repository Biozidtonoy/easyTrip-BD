import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

import { getDestinationById } from "../services/destinationService";
import { getHotelsByDestination } from "../services/hotelService";

import type { Destination } from "../types/destination";
import type { Hotel } from "../types/hotel";

import LoadingSpinner from "../components/common/LoadingSpinner";
import HotelGrid from "../components/hotel/HotelGrid";

import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "../styles/destinationDetailsPage.css";

const DestinationDetailsPage = () => {
  const { id } = useParams();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const [destinationData, hotelData] = await Promise.all([
          getDestinationById(Number(id)),
          getHotelsByDestination(Number(id)),
        ]);

        setDestination(destinationData);
        setHotels(hotelData);
      } catch (err) {
        console.error(err);
        setError("Failed to load destination details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back </span>
      </button>
      <div className="details-image">
        <img src={destination.image_url} alt={destination.name} />
      </div>

      <section className="details-content">
        <h1>{destination.name}</h1>

        <p className="details-description">{destination.description}</p>

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

      <section className="destination-hotels">
        <h2>Hotels in this Destination</h2>

        {hotels.length === 0 ? (
          <p className="details-empty">
            No hotels available for this destination.
          </p>
        ) : (
          <HotelGrid hotels={hotels} />
        )}
      </section>
    </main>
  );
};

export default DestinationDetailsPage;