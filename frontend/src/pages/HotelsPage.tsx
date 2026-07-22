import { useEffect, useState } from "react";

import LoadingSpinner from "../components/common/LoadingSpinner";
import HotelGrid from "../components/hotel/HotelGrid";

import { getHotels } from "../services/hotelService";

import type { Hotel } from "../types/hotel";

import "../styles/hotelsPage.css";

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch {
        setError("Failed to load hotels.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="page-error">{error}</p>;
  }

  return (
    <main className="hotels-page">

      <section className="hotels-header">

        <h1>Hotels</h1>

        <p>
          Discover comfortable stays across Bangladesh.
          Browse hotels and find the perfect place for your next trip.
        </p>

      </section>

      {hotels.length === 0 ? (
        <p className="empty-message">
          No hotels found.
        </p>
      ) : (
        <HotelGrid hotels={hotels} />
      )}

    </main>
  );
};

export default HotelsPage;