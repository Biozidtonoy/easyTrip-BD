import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ImagePlus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import type {
  Room,
  RoomImage,
} from "../../types/room";

import {
  uploadRoomImage,
  updateRoomImage,
  deleteRoomImage,
} from "../../services/roomService";

import "../../styles/roomImageManager.css";


interface RoomImageManagerProps {
  room: Room;
  onClose: () => void;
  onRoomUpdated: (room: Room) => void;
}


const RoomImageManager = ({
  room,
  onClose,
  onRoomUpdated,
}: RoomImageManagerProps) => {

  const [uploading, setUploading] =
    useState(false);

  const [updatingImageId, setUpdatingImageId] =
    useState<number | null>(null);

  const [deletingImageId, setDeletingImageId] =
    useState<number | null>(null);


 

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {

      setUploading(true);

      const newImage =
        await uploadRoomImage(
          room.id,
          file
        );

      const updatedRoom: Room = {
        ...room,
        images: [
          ...room.images,
          newImage,
        ],
      };

      onRoomUpdated(updatedRoom);

      toast.success(
        "Room image uploaded successfully."
      );

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {

        toast.error(
          error.response?.data?.detail ??
          "Failed to upload room image."
        );

      } else {

        toast.error(
          "Failed to upload room image."
        );
      }

    } finally {

      setUploading(false);

      event.target.value = "";
    }
  };


 

  const handleUpdateImage = async (
    image: RoomImage,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {

      setUpdatingImageId(image.id);

      const updatedImage =
        await updateRoomImage(
          room.id,
          image.id,
          file
        );

      const updatedRoom: Room = {
        ...room,
        images: room.images.map(
          (currentImage) =>
            currentImage.id === image.id
              ? updatedImage
              : currentImage
        ),
      };

      onRoomUpdated(updatedRoom);

      toast.success(
        "Room image updated successfully."
      );

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {

        toast.error(
          error.response?.data?.detail ??
          "Failed to update room image."
        );

      } else {

        toast.error(
          "Failed to update room image."
        );
      }

    } finally {

      setUpdatingImageId(null);

      event.target.value = "";
    }
  };


  

  const handleDeleteImage = async (
    imageId: number
  ) => {

    try {

      setDeletingImageId(imageId);

      await deleteRoomImage(
        room.id,
        imageId
      );

      const updatedRoom: Room = {
        ...room,
        images: room.images.filter(
          (image) =>
            image.id !== imageId
        ),
      };

      onRoomUpdated(updatedRoom);

      toast.success(
        "Room image deleted successfully."
      );

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {

        toast.error(
          error.response?.data?.detail ??
          "Failed to delete room image."
        );

      } else {

        toast.error(
          "Failed to delete room image."
        );
      }

    } finally {

      setDeletingImageId(null);
    }
  };


  return (
    <div className="room-image-manager">

     

      <div className="room-image-manager-header">

        <div>

          <span>
            Room Management
          </span>

          <h2>
            Room Images
          </h2>

          <p>
            Manage images for Room{" "}
            {room.room_number}.
          </p>

        </div>


        <button
          type="button"
          className="room-image-manager-close"
          onClick={onClose}
          disabled={
            uploading ||
            updatingImageId !== null ||
            deletingImageId !== null
          }
        >
          <X size={20} />
        </button>

      </div>


      

      <div className="room-image-upload">

        <div className="room-image-upload-icon">
          <ImagePlus size={24} />
        </div>

        <div className="room-image-upload-content">

          <strong>
            Add Room Image
          </strong>

          <p>
            Upload JPEG, PNG, or WebP images.
          </p>

        </div>


        <label
          className={
            uploading
              ? "room-image-upload-button disabled"
              : "room-image-upload-button"
          }
        >

          <ImagePlus size={16} />

          {uploading
            ? "Uploading..."
            : "Upload Image"}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={
              handleUploadImage
            }
            disabled={uploading}
          />

        </label>

      </div>


      

      {room.images.length === 0 ? (

        <div className="room-image-empty">

          <ImagePlus size={32} />

          <h3>
            No Images Yet
          </h3>

          <p>
            Upload the first image for
            this room.
          </p>

        </div>

      ) : (

        <div className="room-image-grid">

          {room.images.map(
            (image) => (

              <article
                key={image.id}
                className="room-image-item"
              >

                <div className="room-image-preview">

                  <img
                    src={image.image}
                    alt={`Room ${room.room_number}`}
                  />

                </div>


                <div className="room-image-actions">

                  {/* Replace */}

                  <label
                    className="room-image-edit-button"
                  >

                    <Pencil size={15} />

                    {updatingImageId ===
                    image.id
                      ? "Updating..."
                      : "Replace"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) =>
                        handleUpdateImage(
                          image,
                          event
                        )
                      }
                      disabled={
                        updatingImageId !== null ||
                        deletingImageId !== null
                      }
                    />

                  </label>


                  {/* Delete */}

                  <button
                    type="button"
                    className="room-image-delete-button"
                    onClick={() =>
                      handleDeleteImage(
                        image.id
                      )
                    }
                    disabled={
                      updatingImageId !== null ||
                      deletingImageId !== null
                    }
                  >

                    <Trash2 size={15} />

                    {deletingImageId ===
                    image.id
                      ? "Deleting..."
                      : "Delete"}

                  </button>

                </div>

              </article>

            )
          )}

        </div>

      )}


      <div className="room-image-manager-footer">

        <span>
          {room.images.length}{" "}
          {room.images.length === 1
            ? "image"
            : "images"}
        </span>

        <button
          type="button"
          onClick={onClose}
          disabled={
            uploading ||
            updatingImageId !== null ||
            deletingImageId !== null
          }
        >
          Done
        </button>

      </div>

    </div>
  );
};


export default RoomImageManager;