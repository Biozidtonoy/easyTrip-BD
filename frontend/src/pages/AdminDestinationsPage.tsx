import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import DestinationEditForm from "../components/admin/DestinationEditForm";
import DestinationForm from "../components/admin/DestinationForm";
import DeleteDestinationModal from "../components/admin/DeleteDestinationModal";

import type {
  Destination,
  DestinationCreate,
  DestinationUpdate,
} from "../types/destination";

import {
  getDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../services/destinationService";

import "../styles/adminDestinations.css";

const AdminDestinationsPage = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);

  const [creating, setCreating] = useState(false);

  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);

  const [updating, setUpdating] = useState(false);
  const [deletingDestination, setDeletingDestination] =
    useState<Destination | null>(null);

  const [deleting, setDeleting] = useState(false);

  const fetchDestinations = async () => {
    try {
      setError("");

      const data = await getDestinations();

      setDestinations(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ?? "Failed to load destinations.",
        );
      } else {
        setError("Failed to load destinations.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);


  const handleCreateDestination = async (data: DestinationCreate) => {
    try {
      setCreating(true);

      const newDestination = await createDestination(data);

      setDestinations((prev) => [newDestination, ...prev]);

      toast.success("Destination created successfully.");

      setFormOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ?? "Failed to create destination.",
        );
      } else {
        toast.error("Failed to create destination.");
      }
    } finally {
      setCreating(false);
    }
  };



  const handleOpenEdit = (destination: Destination) => {
    setEditingDestination(destination);
  };

  const handleCloseEdit = () => {
    setEditingDestination(null);
  };

  const handleUpdateDestination = async (data: DestinationUpdate) => {
    if (!editingDestination) {
      return;
    }

    try {
      setUpdating(true);

      const updatedDestination = await updateDestination(
        editingDestination.id,
        data,
      );

      setDestinations((prev) =>
        prev.map((destination) =>
          destination.id === updatedDestination.id
            ? updatedDestination
            : destination,
        ),
      );

      toast.success("Destination updated successfully.");

      handleCloseEdit();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ?? "Failed to update destination.",
        );
      } else {
        toast.error("Failed to update destination.");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenDelete = (destination: Destination) => {
    setDeletingDestination(destination);
  };

  const handleCloseDelete = () => {
    setDeletingDestination(null);
  };

  const handleDeleteDestination = async () => {
    if (!deletingDestination) {
      return;
    }

    try {
      setDeleting(true);

      await deleteDestination(deletingDestination.id);

      setDestinations((prev) =>
        prev.filter((destination) => destination.id !== deletingDestination.id),
      );

      toast.success("Destination deleted successfully.");

      handleCloseDelete();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ?? "Failed to delete destination.",
        );
      } else {
        toast.error("Failed to delete destination.");
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="admin-destinations">
        <div className="admin-destinations-container">
          <p>Loading destinations...</p>
        </div>
      </main>
    );
  }


  if (error) {
    return (
      <main className="admin-destinations">
        <div className="admin-destinations-container">
          <p className="admin-destinations-error">{error}</p>
        </div>
      </main>
    );
  }



  return (
    <main className="admin-destinations">
      <div className="admin-destinations-container">
        {/* Header */}

        <header className="admin-destinations-header">
          <div>
            <span className="admin-dashboard-badge">Administrator</span>

            <h1>Destination Management</h1>

            <p>Manage destinations available on EasyTrip BD.</p>
          </div>

          <button
            className="admin-destination-create-button"
            type="button"
            onClick={() => setFormOpen(true)}
          >
            Create Destination
          </button>
        </header>

        {/* Destination List */}

        {destinations.length === 0 ? (
          <div className="admin-destinations-empty">
            <h2>No destinations found</h2>

            <p>Create your first destination to get started.</p>
          </div>
        ) : (
          <section className="admin-destination-grid">
            {destinations.map((destination) => (
              <article key={destination.id} className="admin-destination-card">
                {/* Image */}

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="admin-destination-image"
                />

                {/* Content */}

                <div className="admin-destination-content">
                  <h2>{destination.name}</h2>

                  <p>{destination.description}</p>

                  {/* Location */}

                  <div className="admin-destination-location">
                    <span>{destination.district}</span>

                    <span>{destination.division}</span>
                  </div>

                  {/* Actions */}

                  <div className="admin-destination-actions">
                    <button
                      type="button"
                      className="admin-destination-edit"
                      onClick={() => handleOpenEdit(destination)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-destination-delete"
                      onClick={() => handleOpenDelete(destination)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Create Destination Modal */}

        {formOpen && (
          <div className="destination-form-overlay">
            <DestinationForm
              loading={creating}
              onSubmit={handleCreateDestination}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        )}

        {/* Edit Destination Modal */}

        {editingDestination && (
          <div className="destination-form-overlay">
            <DestinationEditForm
              destination={editingDestination}
              loading={updating}
              onSubmit={handleUpdateDestination}
              onCancel={handleCloseEdit}
            />
          </div>
        )}

        {deletingDestination && (
          <DeleteDestinationModal
            destinationName={deletingDestination.name}
            loading={deleting}
            onConfirm={handleDeleteDestination}
            onCancel={handleCloseDelete}
          />
        )}
      </div>
    </main>
  );
};

export default AdminDestinationsPage;
