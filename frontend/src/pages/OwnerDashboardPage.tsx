import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Building2, MapPin, Pencil, Trash2 } from "lucide-react";

import HotelForm from "../components/owner/HotelForm";
import HotelEditForm from "../components/owner/HotelEditForm";

import type { Hotel, HotelCreate, HotelUpdate } from "../types/hotel";

import {
  createHotel,
  getMyHotels,
  updateHotel,
  deleteHotel,
} from "../services/hotelService";

import "../styles/ownerDashboard.css";

const OwnerDashboardPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Create
  const [formOpen, setFormOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  // Edit
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const [updating, setUpdating] = useState(false);

  // Delete
  const [deletingHotelId, setDeletingHotelId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMyHotels = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyHotels();

        setHotels(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.detail ?? "Failed to load your hotels.";

          setError(message);
          toast.error(message);
        } else {
          const message = "Failed to load your hotels.";

          setError(message);
          toast.error(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyHotels();
  }, []);

  const handleCreateHotel = async (data: HotelCreate) => {
    try {
      setCreating(true);

      const newHotel = await createHotel(data);

      setHotels((previousHotels) => [newHotel, ...previousHotels]);

      toast.success("Hotel created successfully.");

      setFormOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail ?? "Failed to create hotel.");
      } else {
        toast.error("Failed to create hotel.");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleOpenEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
  };

  const handleCloseEdit = () => {
    if (updating) {
      return;
    }

    setEditingHotel(null);
  };

  const handleUpdateHotel = async (data: HotelUpdate) => {
    if (!editingHotel) {
      return;
    }

    try {
      setUpdating(true);

      const updatedHotel = await updateHotel(editingHotel.id, data);

      setHotels((previousHotels) =>
        previousHotels.map((hotel) =>
          hotel.id === updatedHotel.id ? updatedHotel : hotel,
        ),
      );

      toast.success("Hotel updated successfully.");

      setEditingHotel(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail ?? "Failed to update hotel.");
      } else {
        toast.error("Failed to update hotel.");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteHotel = async (hotel: Hotel) => {
    try {
      setDeletingHotelId(hotel.id);

      await deleteHotel(hotel.id);

      setHotels((previousHotels) =>
        previousHotels.filter((item) => item.id !== hotel.id),
      );

      toast.success("Hotel deleted successfully.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail ?? "Failed to delete hotel.");
      } else {
        toast.error("Failed to delete hotel.");
      }
    } finally {
      setDeletingHotelId(null);
    }
  };

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="owner-dashboard">
        <div className="owner-dashboard-container">
          <div className="owner-dashboard-loading">Loading your hotels...</div>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Error State
  // --------------------------------------------------

  if (error) {
    return (
      <main className="owner-dashboard">
        <div className="owner-dashboard-container">
          <div className="owner-dashboard-error">
            <h1>Unable to Load Dashboard</h1>

            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Dashboard
  // --------------------------------------------------

  return (
    <main className="owner-dashboard">
      <div className="owner-dashboard-container">
        {/* Header */}

        <header className="owner-dashboard-header">
          <div>
            <span className="owner-dashboard-badge">Hotel Owner</span>

            <h1>Hotel Owner Dashboard</h1>

            <p>Manage your hotels and hotel operations from one place.</p>
          </div>

          <button
            type="button"
            className="owner-dashboard-create-button"
            onClick={() => setFormOpen(true)}
          >
            Create Hotel
          </button>
        </header>

        {/* Overview */}

        <section className="owner-dashboard-overview">
          <div className="owner-dashboard-stat-card">
            <div className="owner-dashboard-stat-icon">
              <Building2 size={22} />
            </div>

            <div>
              <span>My Hotels</span>

              <strong>{hotels.length}</strong>
            </div>
          </div>
        </section>

        {/* Hotels */}

        <section className="owner-dashboard-section">
          <div className="owner-dashboard-section-header">
            <div>
              <h2>My Hotels</h2>

              <p>Hotels currently owned and managed by you.</p>
            </div>
          </div>

          {/* No Hotels */}

          {hotels.length === 0 ? (
            <div className="owner-dashboard-empty">
              <div className="owner-dashboard-empty-icon">
                <Building2 size={30} />
              </div>

              <h3>No Hotels Yet</h3>

              <p>
                You do not have any hotels yet. Create your first hotel to get
                started.
              </p>

              <button
                type="button"
                className="owner-dashboard-empty-button"
                onClick={() => setFormOpen(true)}
              >
                Create Your First Hotel
              </button>
            </div>
          ) : (
            <div className="owner-dashboard-hotel-grid">
              {hotels.map((hotel) => (
                <article key={hotel.id} className="owner-dashboard-hotel-card">
                  {/* Hotel Image */}

                  <div className="owner-dashboard-hotel-image-wrapper">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="owner-dashboard-hotel-image"
                    />
                  </div>

                  {/* Hotel Content */}

                  <div className="owner-dashboard-hotel-content">
                    <h3>{hotel.name}</h3>

                    <p className="owner-dashboard-hotel-description">
                      {hotel.description}
                    </p>

                    {/* Location */}

                    <div className="owner-dashboard-hotel-location">
                      <MapPin size={16} />

                      <span>
                        {hotel.city}, {hotel.district}
                      </span>
                    </div>

                    {/* Address */}

                    <div className="owner-dashboard-hotel-address">
                      {hotel.address}
                    </div>

                    {/* Footer */}

                    <div className="owner-dashboard-hotel-footer">
                      <span>Hotel ID: #{hotel.id}</span>

                      <span>Destination ID: #{hotel.destination_id}</span>
                    </div>

                    {/* Actions */}

                    <div className="owner-dashboard-hotel-actions">
                      <button
                        type="button"
                        className="owner-dashboard-edit-button"
                        onClick={() => handleOpenEdit(hotel)}
                        disabled={deletingHotelId === hotel.id}
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="owner-dashboard-delete-button"
                        onClick={() => handleDeleteHotel(hotel)}
                        disabled={deletingHotelId === hotel.id}
                      >
                        <Trash2 size={16} />

                        {deletingHotelId === hotel.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                      <button
                        type="button"
                        className="owner-dashboard-manage-button"
                        onClick={() =>
                          navigate(`/owner/hotels/${hotel.id}/rooms`)
                        }
                      >
                        Manage Rooms
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Create Hotel Form */}

      {formOpen && (
        <div className="owner-hotel-form-overlay">
          <HotelForm
            loading={creating}
            onSubmit={handleCreateHotel}
            onCancel={() => setFormOpen(false)}
          />
        </div>
      )}

      {/* Edit Hotel Form */}

      {editingHotel && (
        <div className="owner-hotel-form-overlay">
          <HotelEditForm
            hotel={editingHotel}
            loading={updating}
            onSubmit={handleUpdateHotel}
            onCancel={handleCloseEdit}
          />
        </div>
      )}
    </main>
  );
};

export default OwnerDashboardPage;
