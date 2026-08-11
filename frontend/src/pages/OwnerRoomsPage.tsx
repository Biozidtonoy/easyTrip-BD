import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  ArrowLeft,
  BedDouble,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import RoomForm from "../components/owner/RoomForm";
import RoomEditForm from "../components/owner/RoomEditForm";

import type {
  Room,
  RoomCreate,
  RoomUpdate,
} from "../types/room";

import {
  getRoomsByHotel,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../services/roomService";

import "../styles/ownerRooms.css";


const OwnerRoomsPage = () => {
  const { hotelId } = useParams();

  const navigate = useNavigate();


  const [rooms, setRooms] = useState<Room[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);

  const [creating, setCreating] = useState(false);

  const [editingRoom, setEditingRoom] =
    useState<Room | null>(null);

  const [updating, setUpdating] = useState(false);

  const [deletingRoomId, setDeletingRoomId] =
    useState<number | null>(null);


  /* ---------- Fetch Rooms ---------- */

  useEffect(() => {
    const fetchRooms = async () => {

      if (!hotelId) {
        setError("Hotel ID is missing.");
        setLoading(false);
        return;
      }


      try {
        setLoading(true);
        setError("");

        const data =
          await getRoomsByHotel(
            Number(hotelId)
          );

        setRooms(data);

      } catch (error: unknown) {

        if (axios.isAxiosError(error)) {

          const message =
            error.response?.data?.detail ??
            "Failed to load rooms.";

          setError(message);

          toast.error(message);

        } else {

          const message =
            "Failed to load rooms.";

          setError(message);

          toast.error(message);
        }

      } finally {
        setLoading(false);
      }
    };


    fetchRooms();

  }, [hotelId]);


  /* ---------- Create Room ---------- */

  const handleCreateRoom = async (
    data: RoomCreate
  ) => {

    try {

      setCreating(true);

      const newRoom =
        await createRoom(data);

      setRooms((previousRooms) => [
        newRoom,
        ...previousRooms,
      ]);

      toast.success(
        "Room created successfully."
      );

      setFormOpen(false);

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {

        toast.error(
          error.response?.data?.detail ??
          "Failed to create room."
        );

      } else {

        toast.error(
          "Failed to create room."
        );
      }

    } finally {

      setCreating(false);
    }
  };


  /* ---------- Edit Room ---------- */

  const handleUpdateRoom = async (
    data: RoomUpdate
  ) => {

    if (!editingRoom) {
      return;
    }


    try {

      setUpdating(true);

      const updatedRoom =
        await updateRoom(
          editingRoom.id,
          data
        );


      setRooms((previousRooms) =>
        previousRooms.map((room) =>
          room.id === updatedRoom.id
            ? updatedRoom
            : room
        )
      );


      toast.success(
        "Room updated successfully."
      );


      setEditingRoom(null);

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {

        toast.error(
          error.response?.data?.detail ??
          "Failed to update room."
        );

      } else {

        toast.error(
          "Failed to update room."
        );
      }

    } finally {

      setUpdating(false);
    }
  };


  /* ---------- Delete Room ---------- */

  const handleDeleteRoom = async (
    roomId: number
  ) => {

    try {

      setDeletingRoomId(roomId);

      await deleteRoom(roomId);


      setRooms((previousRooms) =>
        previousRooms.filter(
          (room) =>
            room.id !== roomId
        )
      );


      toast.success(
        "Room deleted successfully."
      );

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {

        toast.error(
          error.response?.data?.detail ??
          "Failed to delete room."
        );

      } else {

        toast.error(
          "Failed to delete room."
        );
      }

    } finally {

      setDeletingRoomId(null);
    }
  };


  /* ---------- Loading ---------- */

  if (loading) {

    return (
      <main className="owner-rooms-page">

        <div className="owner-rooms-container">

          <div className="owner-rooms-loading">
            Loading rooms...
          </div>

        </div>

      </main>
    );
  }


  /* ---------- Error ---------- */

  if (error) {

    return (
      <main className="owner-rooms-page">

        <div className="owner-rooms-container">

          <button
            type="button"
            className="owner-rooms-back-button"
            onClick={() =>
              navigate("/owner/dashboard")
            }
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>


          <div className="owner-rooms-error">

            <h1>
              Unable to Load Rooms
            </h1>

            <p>
              {error}
            </p>

          </div>

        </div>

      </main>
    );
  }


  return (
    <main className="owner-rooms-page">

      <div className="owner-rooms-container">

        {/* ---------- Header ---------- */}

        <header className="owner-rooms-header">

          <div>

            <button
              type="button"
              className="owner-rooms-back-button"
              onClick={() =>
                navigate(
                  "/owner/dashboard"
                )
              }
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>


            <span className="owner-rooms-badge">
              Hotel Owner
            </span>


            <h1>
              Room Management
            </h1>


            <p>
              Manage rooms for Hotel #{hotelId}.
            </p>

          </div>


          <button
            type="button"
            className="owner-rooms-create-button"
            onClick={() =>
              setFormOpen(true)
            }
          >
            <Plus size={18} />
            Create Room
          </button>

        </header>


        {/* ---------- Overview ---------- */}

        <section className="owner-rooms-overview">

          <div className="owner-rooms-stat-card">

            <div className="owner-rooms-stat-icon">
              <BedDouble size={22} />
            </div>

            <div>

              <span>
                Total Rooms
              </span>

              <strong>
                {rooms.length}
              </strong>

            </div>

          </div>

        </section>


        {/* ---------- Rooms ---------- */}

        <section className="owner-rooms-section">

          <div className="owner-rooms-section-header">

            <div>

              <h2>
                Hotel Rooms
              </h2>

              <p>
                Rooms currently managed
                for this hotel.
              </p>

            </div>

          </div>


          {rooms.length === 0 ? (

            <div className="owner-rooms-empty">

              <div className="owner-rooms-empty-icon">
                <BedDouble size={30} />
              </div>


              <h3>
                No Rooms Yet
              </h3>


              <p>
                This hotel does not have
                any rooms yet.
              </p>


              <button
                type="button"
                className="owner-rooms-empty-button"
                onClick={() =>
                  setFormOpen(true)
                }
              >
                Create First Room
              </button>

            </div>

          ) : (

            <div className="owner-rooms-grid">

              {rooms.map((room) => (

                <article
                  key={room.id}
                  className="owner-room-card"
                >

                  {/* Room Header */}

                  <div className="owner-room-card-header">

                    <div className="owner-room-icon">
                      <BedDouble size={22} />
                    </div>


                    <div>

                      <span>
                        Room
                      </span>

                      <h3>
                        {room.room_number}
                      </h3>

                    </div>

                  </div>


                  {/* Details */}

                  <div className="owner-room-card-details">

                    <div>
                      <span>
                        Type
                      </span>

                      <strong>
                        {room.room_type}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Capacity
                      </span>

                      <strong>
                        {room.capacity} Guest
                        {room.capacity !== 1
                          ? "s"
                          : ""}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Price
                      </span>

                      <strong>
                        ৳ {room.price_per_night}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Availability
                      </span>

                      <strong
                        className={
                          room.is_available
                            ? "room-available"
                            : "room-unavailable"
                        }
                      >
                        {room.is_available
                          ? "Available"
                          : "Unavailable"}
                      </strong>
                    </div>

                  </div>


                  {/* Footer */}

                  <div className="owner-room-card-footer">

                    <span>
                      Room ID: #{room.id}
                    </span>

                  </div>


                  {/* Actions */}

                  <div className="owner-room-card-actions">

                    <button
                      type="button"
                      className="owner-room-edit-button"
                      onClick={() =>
                        setEditingRoom(room)
                      }
                      disabled={
                        deletingRoomId === room.id
                      }
                    >
                      <Pencil size={16} />
                      Edit
                    </button>


                    <button
                      type="button"
                      className="owner-room-delete-button"
                      onClick={() =>
                        handleDeleteRoom(
                          room.id
                        )
                      }
                      disabled={
                        deletingRoomId === room.id
                      }
                    >
                      <Trash2 size={16} />

                      {deletingRoomId === room.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>


      {/* ---------- Create Form ---------- */}

      {formOpen && hotelId && (

        <div className="owner-room-form-overlay">

          <RoomForm
            hotelId={Number(hotelId)}
            loading={creating}
            onSubmit={handleCreateRoom}
            onCancel={() =>
              setFormOpen(false)
            }
          />

        </div>

      )}


      {/* ---------- Edit Form ---------- */}

      {editingRoom && (

        <div className="owner-room-form-overlay">

          <RoomEditForm
            room={editingRoom}
            loading={updating}
            onSubmit={handleUpdateRoom}
            onCancel={() =>
              setEditingRoom(null)
            }
          />

        </div>

      )}

    </main>
  );
};


export default OwnerRoomsPage;