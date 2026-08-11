import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type {
  Destination,
  DestinationUpdate,
} from "../../types/destination";

import "../../styles/destinationForm.css";

interface DestinationEditFormProps {
  destination: Destination;
  loading: boolean;
  onSubmit: (data: DestinationUpdate) => void;
  onCancel: () => void;
}

const DestinationEditForm = ({
  destination,
  loading,
  onSubmit,
  onCancel,
}: DestinationEditFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [division, setDivision] =
    useState("");
  const [district, setDistrict] =
    useState("");
  const [image, setImage] =
    useState<File | undefined>(undefined);

  useEffect(() => {
    setName(destination.name);
    setDescription(destination.description);
    setDivision(destination.division);
    setDistrict(destination.district);
    setImage(undefined);
  }, [destination]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data: DestinationUpdate = {
      name: name.trim(),
      description: description.trim(),
      division: division.trim(),
      district: district.trim(),
    };

    if (image) {
      data.image = image;
    }

    onSubmit(data);
  };

  return (
    <form
      className="destination-form"
      onSubmit={handleSubmit}
    >
      <div className="destination-form-header">
        <h2>Edit Destination</h2>

        <button
          type="button"
          className="destination-form-close"
          onClick={onCancel}
          disabled={loading}
        >
          ×
        </button>
      </div>

      <div className="destination-form-group">
        <label htmlFor="edit-destination-name">
          Destination Name
        </label>

        <input
          id="edit-destination-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />
      </div>

      <div className="destination-form-group">
        <label htmlFor="edit-destination-description">
          Description
        </label>

        <textarea
          id="edit-destination-description"
          rows={5}
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          required
        />
      </div>

      <div className="destination-form-row">
        <div className="destination-form-group">
          <label htmlFor="edit-destination-division">
            Division
          </label>

          <input
            id="edit-destination-division"
            type="text"
            value={division}
            onChange={(event) =>
              setDivision(event.target.value)
            }
            required
          />
        </div>

        <div className="destination-form-group">
          <label htmlFor="edit-destination-district">
            District
          </label>

          <input
            id="edit-destination-district"
            type="text"
            value={district}
            onChange={(event) =>
              setDistrict(event.target.value)
            }
            required
          />
        </div>
      </div>

      <div className="destination-form-group">
        <label htmlFor="edit-destination-image">
          Replace Image
        </label>

        <input
          id="edit-destination-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            setImage(
              event.target.files?.[0]
            );
          }}
        />

        <small>
          Leave empty to keep the current image.
        </small>
      </div>

      <div className="destination-form-actions">
        <button
          type="button"
          className="destination-form-cancel"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="destination-form-submit"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Destination"}
        </button>
      </div>
    </form>
  );
};

export default DestinationEditForm;