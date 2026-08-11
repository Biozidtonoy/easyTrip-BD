import { useState } from "react";
import type { FormEvent } from "react";

import type {
  DestinationCreate,
} from "../../types/destination";

import "../../styles/destinationForm.css";

interface DestinationFormProps {
  loading: boolean;
  onSubmit: (
    data: DestinationCreate
  ) => void;
  onCancel: () => void;
}

const DestinationForm = ({
  loading,
  onSubmit,
  onCancel,
}: DestinationFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [division, setDivision] =
    useState("");
  const [district, setDistrict] =
    useState("");
  const [image, setImage] =
    useState<File | null>(null);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!image) {
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      division: division.trim(),
      district: district.trim(),
      image,
    });
  };

  return (
    <form
      className="destination-form"
      onSubmit={handleSubmit}
    >
      <div className="destination-form-header">
        <h2>Create Destination</h2>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="destination-form-close"
        >
          ×
        </button>
      </div>

      <div className="destination-form-group">
        <label htmlFor="destination-name">
          Destination Name
        </label>

        <input
          id="destination-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Cox's Bazar"
          required
        />
      </div>

      <div className="destination-form-group">
        <label htmlFor="destination-description">
          Description
        </label>

        <textarea
          id="destination-description"
          rows={5}
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Describe the destination..."
          required
        />
      </div>

      <div className="destination-form-row">
        <div className="destination-form-group">
          <label htmlFor="destination-division">
            Division
          </label>

          <input
            id="destination-division"
            type="text"
            value={division}
            onChange={(event) =>
              setDivision(event.target.value)
            }
            placeholder="Chattogram"
            required
          />
        </div>

        <div className="destination-form-group">
          <label htmlFor="destination-district">
            District
          </label>

          <input
            id="destination-district"
            type="text"
            value={district}
            onChange={(event) =>
              setDistrict(event.target.value)
            }
            placeholder="Cox's Bazar"
            required
          />
        </div>
      </div>

      <div className="destination-form-group">
        <label htmlFor="destination-image">
          Destination Image
        </label>

        <input
          id="destination-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            const selectedFile =
              event.target.files?.[0] ?? null;

            setImage(selectedFile);
          }}
          required
        />
      </div>

      <div className="destination-form-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="destination-form-cancel"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !image}
          className="destination-form-submit"
        >
          {loading
            ? "Creating..."
            : "Create Destination"}
        </button>
      </div>
    </form>
  );
};

export default DestinationForm;