import { useEffect, useState } from "react";

import type {
  Room,
  RoomUpdate,
} from "../../types/room";

import "../../styles/roomEditForm.css";


interface RoomEditFormProps {
  room: Room;
  loading: boolean;
  onSubmit: (data: RoomUpdate) => void;
  onCancel: () => void;
}


const RoomEditForm = ({
  room,
  loading,
  onSubmit,
  onCancel,
}: RoomEditFormProps) => {

  const [roomNumber, setRoomNumber] = useState(
    room.room_number
  );

  const [roomType, setRoomType] = useState(
    room.room_type
  );

  const [pricePerNight, setPricePerNight] =
    useState(
      String(room.price_per_night)
    );

  const [capacity, setCapacity] = useState(
    String(room.capacity)
  );

  const [isAvailable, setIsAvailable] =
    useState(room.is_available);


  useEffect(() => {
    setRoomNumber(room.room_number);
    setRoomType(room.room_type);
    setPricePerNight(
      String(room.price_per_night)
    );
    setCapacity(
      String(room.capacity)
    );
    setIsAvailable(room.is_available);
  }, [room]);


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();


    const updateData: RoomUpdate = {
      room_number: roomNumber.trim(),
      room_type: roomType,
      price_per_night: Number(
        pricePerNight
      ),
      capacity: Number(capacity),
      is_available: isAvailable,
    };


    onSubmit(updateData);
  };


  return (
    <div className="owner-room-edit-form">

      {/* Header */}

      <div className="owner-room-edit-form-header">

        <div>
          <span>Room Management</span>

          <h2>
            Edit Room
          </h2>

          <p>
            Update the information for
            Room {room.room_number}.
          </p>
        </div>


        <button
          type="button"
          className="owner-room-edit-close"
          onClick={onCancel}
          disabled={loading}
        >
          ×
        </button>

      </div>


      <form onSubmit={handleSubmit}>

        {/* Room Number */}

        <div className="owner-room-edit-group">

          <label htmlFor="edit-room-number">
            Room Number
          </label>

          <input
            id="edit-room-number"
            type="text"
            value={roomNumber}
            onChange={(event) =>
              setRoomNumber(
                event.target.value
              )
            }
            required
            disabled={loading}
          />

        </div>


        {/* Room Type */}

        <div className="owner-room-edit-group">

          <label htmlFor="edit-room-type">
            Room Type
          </label>

          <select
            id="edit-room-type"
            value={roomType}
            onChange={(event) =>
              setRoomType(
                event.target.value
              )
            }
            required
            disabled={loading}
          >

            <option value="STANDARD">
              Standard
            </option>

            <option value="DELUXE">
              Deluxe
            </option>

            <option value="SUITE">
              Suite
            </option>

            <option value="FAMILY">
              Family
            </option>

          </select>

        </div>


        {/* Price + Capacity */}

        <div className="owner-room-edit-row">

          <div className="owner-room-edit-group">

            <label htmlFor="edit-room-price">
              Price Per Night
            </label>

            <input
              id="edit-room-price"
              type="number"
              min="0"
              step="0.01"
              value={pricePerNight}
              onChange={(event) =>
                setPricePerNight(
                  event.target.value
                )
              }
              required
              disabled={loading}
            />

          </div>


          <div className="owner-room-edit-group">

            <label htmlFor="edit-room-capacity">
              Capacity
            </label>

            <input
              id="edit-room-capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(event) =>
                setCapacity(
                  event.target.value
                )
              }
              required
              disabled={loading}
            />

          </div>

        </div>


        {/* Availability */}

        <div className="owner-room-edit-availability">

          <div>
            <strong>
              Room Availability
            </strong>

            <p>
              Control whether travelers
              can book this room.
            </p>
          </div>


          <label className="owner-room-edit-switch">

            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(event) =>
                setIsAvailable(
                  event.target.checked
                )
              }
              disabled={loading}
            />

            <span>
              {isAvailable
                ? "Available"
                : "Unavailable"}
            </span>

          </label>

        </div>


        {/* Actions */}

        <div className="owner-room-edit-actions">

          <button
            type="button"
            className="owner-room-edit-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="owner-room-edit-submit"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Room"}
          </button>

        </div>

      </form>

    </div>
  );
};


export default RoomEditForm;