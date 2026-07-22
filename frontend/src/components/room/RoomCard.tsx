import type { Room } from "../../types/room";

import "../../styles/roomCard.css";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <article className="room-card">

      <h3>{room.room_type}</h3>

      <div className="room-info">

        <p>
          <strong>Room No:</strong> {room.room_number}
        </p>

        <p>
          <strong>Capacity:</strong> {room.capacity} Guests
        </p>

        <p>
          <strong>Price:</strong> ৳{room.price_per_night} / night
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

    </article>
  );
};

export default RoomCard;