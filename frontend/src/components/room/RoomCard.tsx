import { Link } from "react-router-dom";

import type { Room } from "../../types/room";

import "../../styles/roomCard.css";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const image =
    room.images.length > 0
      ? room.images[0].image_url
      : "https://placehold.co/600x400?text=No+Image";

  return (
    <article className="room-card">

      <div className="room-image-container">
        <img
          src={image}
          alt={room.room_type}
          className="room-image"
        />
      </div>

      <div className="room-content">
        <h3>{room.room_type}</h3>

        <div className="room-info">

          <p>
            <strong>Room No:</strong> {room.room_number}
          </p>

          <p>
            <strong>Capacity:</strong> {room.capacity} Guests
          </p>

          <p>
            <strong>Price:</strong> ৳
            {Number(room.price_per_night).toLocaleString(
              "en-BD"
            )}{" "}
            / night
          </p>

          <p
            className={
              room.is_available
                ? "available"
                : "unavailable"
            }
          >
            {room.is_available
              ? "Available"
              : "Unavailable"}
          </p>

        </div>

        {room.is_available ? (
          <Link
            to={`/bookings/new/${room.id}`}
            className="book-room-btn"
          >
            Book Now
          </Link>
        ) : (
          <button
            className="book-room-btn disabled"
            disabled
          >
            Unavailable
          </button>
        )}

      </div>
    </article>
  );
};

export default RoomCard;