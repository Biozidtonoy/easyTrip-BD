import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../components/common/LoadingSpinner";

import { getHotelById } from "../services/hotelService";

import type { Hotel } from "../types/hotel";

import "../styles/hotelDetailsPage.css";

import { getRoomsByHotel } from "../services/roomService";

import type { Room } from "../types/room";

import RoomGrid from "../components/room/RoomGrid";

import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const HotelDetailsPage = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState<Hotel | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [rooms, setRooms] = useState<Room[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const [hotelData, roomData] = await Promise.all([
          getHotelById(Number(id)),
          getRoomsByHotel(Number(id)),
        ]);

        setHotel(hotelData);
        setRooms(roomData);
      } catch (err) {
        console.error(err);

        setError("Failed to load hotel.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <main className="hotel-details-page">
        <p className="details-error">{error}</p>
      </main>
    );
  }

  if (!hotel) {
    return (
      <main className="hotel-details-page">
        <p className="details-error">
          Hotel not found.
        </p>
      </main>
    );
  }

  return (
    <main className="hotel-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back </span>
      </button>
      <div className="hotel-details-image">
        <img src={hotel.image_url} alt={hotel.name} />
      </div>

      <section className="hotel-details-content">
        <h1>{hotel.name}</h1>

        <p className="hotel-description">{hotel.description}</p>

        <div className="hotel-info">
          <div className="hotel-info-box">
            <h4>Address</h4>
            <p>{hotel.address}</p>
          </div>

          <div className="hotel-info-box">
            <h4>City</h4>
            <p>{hotel.city}</p>
          </div>

          <div className="hotel-info-box">
            <h4>District</h4>
            <p>{hotel.district}</p>
          </div>
        </div>
      </section>

      <section className="hotel-rooms">
        <h2>Available Rooms</h2>

        {rooms.length === 0 ? (
          <p className="details-empty">No rooms available.</p>
        ) : (
          <RoomGrid rooms={rooms} />
        )}
      </section>
    </main>
  );
};

export default HotelDetailsPage;