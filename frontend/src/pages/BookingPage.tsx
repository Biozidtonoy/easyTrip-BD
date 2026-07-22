import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";

import { getRoomById } from "../services/roomService";
import { createBooking } from "../services/bookingService";

import type { Room } from "../types/room";

import "../styles/bookingPage.css";

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (!roomId) return;

        const data = await getRoomById(Number(roomId));
        setRoom(data);
      } catch {
        setError("Failed to load room.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const bookingSummary = useMemo(() => {
    if (!room || !checkInDate || !checkOutDate) {
      return {
        nights: 0,
        totalPrice: 0,
        error: "",
      };
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return {
        nights: 0,
        totalPrice: 0,
        error: "Check-in date cannot be in the past.",
      };
    }

    if (checkOut <= checkIn) {
      return {
        nights: 0,
        totalPrice: 0,
        error: "Check-out date must be after check-in.",
      };
    }

    const nights =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);

    return {
      nights,
      totalPrice: nights * Number(room.price_per_night),
      error: "",
    };
  }, [room, checkInDate, checkOutDate]);

  const handleBooking = async () => {
    if (!room) return;

    try {
      setSubmitting(true);

      await createBooking({
        room_id: room.id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        special_requests: specialRequests.trim() || undefined,
      });

      toast.success("Booking created successfully!");

      navigate("/my-bookings");
    } catch (error: unknown) {
      let message = "Failed to create booking.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.detail ?? message;
      }

      setError(message);

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!room) {
    return <p>Room not found.</p>;
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="booking-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>

      <section className="booking-container">
        <h1>Book Your Stay</h1>

        <div className="booking-card">
          <h2>Room Details</h2>

          <div className="booking-room-layout">
            <div className="booking-room-image-wrapper">
              <img
                src={
                  room.images.length > 0
                    ? room.images[0].image_url
                    : "https://placehold.co/600x400?text=No+Image"
                }
                alt={room.room_type}
                className="booking-room-image"
              />
            </div>

            <div className="booking-room-info">
              <div className="booking-info-row">
                <span className="booking-info-label">Room Type</span>

                <span className="booking-info-value">{room.room_type}</span>
              </div>

              <div className="booking-info-row">
                <span className="booking-info-label">Room Number</span>

                <span className="booking-info-value">{room.room_number}</span>
              </div>

              <div className="booking-info-row">
                <span className="booking-info-label">Capacity</span>

                <span className="booking-info-value">
                  {room.capacity} Guests
                </span>
              </div>

              <div className="booking-info-row">
                <span className="booking-info-label">Price</span>

                <span className="booking-info-value">
                  ৳
                  {Number(room.price_per_night).toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  / night
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-card">
          <h2>Booking Details</h2>

          <label htmlFor="checkIn">Check-in Date</label>

          <input
            id="checkIn"
            type="date"
            min={today}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />

          <label htmlFor="checkOut">Check-out Date</label>

          <input
            id="checkOut"
            type="date"
            min={checkInDate || today}
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />

          <label htmlFor="specialRequests">Special Requests (Optional)</label>

          <textarea
            id="specialRequests"
            rows={4}
            placeholder="Any special requests..."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>

        <div className="booking-card">
          <h2>Booking Summary</h2>

          <p>
            <strong>Number of Nights:</strong> {bookingSummary.nights}
          </p>

          <p>
            <strong>Total Price:</strong> ৳{bookingSummary.totalPrice}
          </p>

          {bookingSummary.error && (
            <p className="booking-error">{bookingSummary.error}</p>
          )}

          {error && <div className="booking-api-error">{error}</div>}

          <button
            className="booking-btn"
            onClick={handleBooking}
            disabled={
              submitting ||
              bookingSummary.nights === 0 ||
              !!bookingSummary.error
            }
          >
            {submitting ? "Creating Booking..." : "Book Now"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default BookingPage;
