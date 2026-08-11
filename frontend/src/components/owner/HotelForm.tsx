import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";

import type { HotelCreate } from "../../types/hotel";
import type { Destination } from "../../types/destination";

import { getDestinations } from "../../services/destinationService";

import "../../styles/hotelForm.css";

interface HotelFormProps {
  loading?: boolean;
  onSubmit: (data: HotelCreate) => Promise<void>;
  onCancel: () => void;
}

const HotelForm = ({ loading = false, onSubmit, onCancel }: HotelFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [loadingDestinations, setLoadingDestinations] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});

  /*
   * Load destinations
   */
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoadingDestinations(true);

        const data = await getDestinations();

        setDestinations(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.detail ?? "Failed to load destinations.",
          );
        } else {
          toast.error("Failed to load destinations.");
        }
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  /*
   * Validate form
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Hotel name is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Hotel description is required.";
    } else if (description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters.";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!district.trim()) {
      newErrors.district = "District is required.";
    }

    if (!destinationId) {
      newErrors.destinationId = "Please select a destination.";
    }

    if (!image) {
      newErrors.image = "Hotel image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * Submit
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!image) {
      return;
    }

    const hotelData: HotelCreate = {
      name: name.trim(),
      description: description.trim(),
      address: address.trim(),
      city: city.trim(),
      district: district.trim(),
      destination_id: Number(destinationId),
      image,
    };

    await onSubmit(hotelData);
  };

  /*
   * Image selection
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setImage(file);

    if (file) {
      setErrors((previous) => {
        const updated = { ...previous };

        delete updated.image;

        return updated;
      });
    }
  };

  return (
    <div className="hotel-form-overlay">
      <div className="hotel-form-modal">
        {/* Header */}

        <div className="hotel-form-header">
          <div>
            <span className="hotel-form-badge">Hotel Owner</span>

            <h2>Create Hotel</h2>

            <p>Add a new hotel to your EasyTrip BD account.</p>
          </div>

          <button
            type="button"
            className="hotel-form-close"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close form"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form className="hotel-form" onSubmit={handleSubmit}>
          {/* Hotel Name */}

          <div className="hotel-form-field">
            <label htmlFor="hotel-name">Hotel Name</label>

            <input
              id="hotel-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Ocean Paradise Resort"
              disabled={loading}
            />

            {errors.name && (
              <span className="hotel-form-error">{errors.name}</span>
            )}
          </div>

          {/* Description */}

          <div className="hotel-form-field">
            <label htmlFor="hotel-description">Description</label>

            <textarea
              id="hotel-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe your hotel..."
              rows={5}
              disabled={loading}
            />

            {errors.description && (
              <span className="hotel-form-error">{errors.description}</span>
            )}
          </div>

          {/* Address */}

          <div className="hotel-form-field">
            <label htmlFor="hotel-address">Address</label>

            <input
              id="hotel-address"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Example: Marine Drive Road"
              disabled={loading}
            />

            {errors.address && (
              <span className="hotel-form-error">{errors.address}</span>
            )}
          </div>

          {/* City + District */}

          <div className="hotel-form-row">
            <div className="hotel-form-field">
              <label htmlFor="hotel-city">City</label>

              <input
                id="hotel-city"
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Example: Cox's Bazar"
                disabled={loading}
              />

              {errors.city && (
                <span className="hotel-form-error">{errors.city}</span>
              )}
            </div>

            <div className="hotel-form-field">
              <label htmlFor="hotel-district">District</label>

              <input
                id="hotel-district"
                type="text"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                placeholder="Example: Cox's Bazar"
                disabled={loading}
              />

              {errors.district && (
                <span className="hotel-form-error">{errors.district}</span>
              )}
            </div>
          </div>

          {/* Destination */}

          <div className="hotel-form-field">
            <label htmlFor="hotel-destination">Destination</label>

            <select
              id="hotel-destination"
              value={destinationId}
              onChange={(event) => setDestinationId(event.target.value)}
              disabled={loading || loadingDestinations}
            >
              <option value="">
                {loadingDestinations
                  ? "Loading destinations..."
                  : "Select a destination"}
              </option>

              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name} — {destination.district}
                </option>
              ))}
            </select>

            {errors.destinationId && (
              <span className="hotel-form-error">{errors.destinationId}</span>
            )}
          </div>

          {/* Image */}

          <div className="hotel-form-field">
            <label htmlFor="hotel-image">Hotel Image</label>

            <input
              id="hotel-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />

            {image && (
              <span className="hotel-form-file-name">
                Selected: {image.name}
              </span>
            )}

            {errors.image && (
              <span className="hotel-form-error">{errors.image}</span>
            )}
          </div>

          {/* Actions */}

          <div className="hotel-form-actions">
            <button
              type="button"
              className="hotel-form-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hotel-form-submit"
              disabled={loading}
            >
              {loading ? "Creating Hotel..." : "Create Hotel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelForm;
