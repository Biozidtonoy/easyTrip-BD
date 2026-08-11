import { useState } from "react";

import type {
  RoomCreate,
} from "../../types/room";

import "../../styles/roomForm.css";


interface RoomFormProps {
  hotelId: number;
  loading: boolean;
  onSubmit: (data: RoomCreate) => void;
  onCancel: () => void;
}


const RoomForm = ({
  hotelId,
  loading,
  onSubmit,
  onCancel,
}: RoomFormProps) => {

  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("STANDARD");
  const [pricePerNight, setPricePerNight] = useState("");
  const [capacity, setCapacity] = useState("");


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();


    const roomData: RoomCreate = {
      hotel_id: hotelId,
      room_number: roomNumber.trim(),
      room_type: roomType,
      price_per_night: Number(pricePerNight),
      capacity: Number(capacity),
    };


    onSubmit(roomData);
  };


  return (
    <div className="owner-room-form">

      {/* Header */}

      <div className="owner-room-form-header">

        <div>
          <span>Room Management</span>

          <h2>Create Room</h2>

          <p>
            Add a new room to your hotel.
          </p>
        </div>


        <button
          type="button"
          className="owner-room-form-close"
          onClick={onCancel}
          disabled={loading}
        >
          ×
        </button>

      </div>


      {/* Form */}

      <form onSubmit={handleSubmit}>

        {/* Room Number */}

        <div className="owner-room-form-group">

          <label htmlFor="room-number">
            Room Number
          </label>

          <input
            id="room-number"
            type="text"
            value={roomNumber}
            onChange={(event) =>
              setRoomNumber(event.target.value)
            }
            placeholder="e.g. 101"
            required
            disabled={loading}
          />

        </div>


        {/* Room Type */}

        <div className="owner-room-form-group">

          <label htmlFor="room-type">
            Room Type
          </label>

          <select
            id="room-type"
            value={roomType}
            onChange={(event) =>
              setRoomType(event.target.value)
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

        <div className="owner-room-form-row">

          <div className="owner-room-form-group">

            <label htmlFor="room-price">
              Price Per Night
            </label>

            <input
              id="room-price"
              type="number"
              min="0"
              step="0.01"
              value={pricePerNight}
              onChange={(event) =>
                setPricePerNight(
                  event.target.value
                )
              }
              placeholder="e.g. 3500"
              required
              disabled={loading}
            />

          </div>


          <div className="owner-room-form-group">

            <label htmlFor="room-capacity">
              Capacity
            </label>

            <input
              id="room-capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(event) =>
                setCapacity(
                  event.target.value
                )
              }
              placeholder="e.g. 2"
              required
              disabled={loading}
            />

          </div>

        </div>


        {/* Hotel */}

        <div className="owner-room-form-hotel-info">

          <span>
            Hotel ID
          </span>

          <strong>
            #{hotelId}
          </strong>

        </div>


        {/* Actions */}

        <div className="owner-room-form-actions">

          <button
            type="button"
            className="owner-room-form-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="owner-room-form-submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Room"}
          </button>

        </div>

      </form>

    </div>
  );
};


export default RoomForm;