import { useEffect, useState } from "react";

import "../../styles/hotelEditForm.css";

import type {
  Hotel,
  HotelUpdate,
} from "../../types/hotel";


interface HotelEditFormProps {
  hotel: Hotel;
  loading: boolean;
  onSubmit: (data: HotelUpdate) => void;
  onCancel: () => void;
}


const HotelEditForm = ({
  hotel,
  loading,
  onSubmit,
  onCancel,
}: HotelEditFormProps) => {
  const [name, setName] = useState(hotel.name);

  const [description, setDescription] = useState(
    hotel.description
  );

  const [address, setAddress] = useState(
    hotel.address
  );

  const [city, setCity] = useState(
    hotel.city
  );

  const [district, setDistrict] = useState(
    hotel.district
  );

  const [destinationId, setDestinationId] =
    useState(
      String(hotel.destination_id)
    );

  const [image, setImage] =
    useState<File | undefined>(
      undefined
    );


  useEffect(() => {
    setName(hotel.name);

    setDescription(
      hotel.description
    );

    setAddress(
      hotel.address
    );

    setCity(
      hotel.city
    );

    setDistrict(
      hotel.district
    );

    setDestinationId(
      String(hotel.destination_id)
    );

    setImage(undefined);

  }, [hotel]);


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();


    const updateData: HotelUpdate = {
      name,
      description,
      address,
      city,
      district,
      destination_id:
        Number(destinationId),
      image,
    };


    onSubmit(updateData);
  };


  return (
    <div className="owner-hotel-edit-form">

      {/* =====================================
          Header
      ====================================== */}

      <div className="owner-hotel-edit-form-header">

        <div>

          <span>
            Hotel Management
          </span>

          <h2>
            Edit Hotel
          </h2>

          <p>
            Update your hotel information.
          </p>

        </div>


        <button
          type="button"
          className="owner-hotel-edit-form-close"
          onClick={onCancel}
          disabled={loading}
        >
          ×
        </button>

      </div>


      {/* =====================================
          Form
      ====================================== */}

      <form onSubmit={handleSubmit}>

        {/* Hotel Name */}

        <div className="owner-hotel-edit-form-group">

          <label htmlFor="edit-hotel-name">
            Hotel Name
          </label>

          <input
            id="edit-hotel-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            required
          />

        </div>


        {/* Description */}

        <div className="owner-hotel-edit-form-group">

          <label htmlFor="edit-hotel-description">
            Description
          </label>

          <textarea
            id="edit-hotel-description"
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            rows={5}
            required
          />

        </div>


        {/* Address */}

        <div className="owner-hotel-edit-form-group">

          <label htmlFor="edit-hotel-address">
            Address
          </label>

          <input
            id="edit-hotel-address"
            type="text"
            value={address}
            onChange={(event) =>
              setAddress(
                event.target.value
              )
            }
            required
          />

        </div>


        {/* City + District */}

        <div className="owner-hotel-edit-form-row">

          <div className="owner-hotel-edit-form-group">

            <label htmlFor="edit-hotel-city">
              City
            </label>

            <input
              id="edit-hotel-city"
              type="text"
              value={city}
              onChange={(event) =>
                setCity(
                  event.target.value
                )
              }
              required
            />

          </div>


          <div className="owner-hotel-edit-form-group">

            <label htmlFor="edit-hotel-district">
              District
            </label>

            <input
              id="edit-hotel-district"
              type="text"
              value={district}
              onChange={(event) =>
                setDistrict(
                  event.target.value
                )
              }
              required
            />

          </div>

        </div>


        {/* Destination */}

        <div className="owner-hotel-edit-form-group">

          <label htmlFor="edit-hotel-destination">
            Destination ID
          </label>

          <input
            id="edit-hotel-destination"
            type="number"
            min="1"
            value={destinationId}
            onChange={(event) =>
              setDestinationId(
                event.target.value
              )
            }
            required
          />

        </div>


        {/* Image */}

        <div className="owner-hotel-edit-form-group">

          <label htmlFor="edit-hotel-image">
            Replace Hotel Image
          </label>

          <input
            id="edit-hotel-image"
            type="file"
            accept="image/*"
            onChange={(event) =>
              setImage(
                event.target.files?.[0]
              )
            }
          />

          <small>
            Leave empty to keep the
            current image.
          </small>

        </div>


        {/* Actions */}

        <div className="owner-hotel-edit-form-actions">

          <button
            type="button"
            className="owner-hotel-edit-cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="owner-hotel-edit-submit-button"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Hotel"}
          </button>

        </div>

      </form>

    </div>
  );
};


export default HotelEditForm;