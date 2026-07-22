import type { Room } from "../../types/room";

import RoomCard from "./RoomCard";

import "../../styles/roomGrid.css";

interface RoomGridProps {
  rooms: Room[];
}

const RoomGrid = ({ rooms }: RoomGridProps) => {
  return (
    <section className="room-grid">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
        />
      ))}
    </section>
  );
};

export default RoomGrid;