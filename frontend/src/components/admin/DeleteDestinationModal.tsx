import "../../styles/destinationDeleteModal.css";

interface DeleteDestinationModalProps {
  destinationName: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteDestinationModal = ({
  destinationName,
  loading,
  onConfirm,
  onCancel,
}: DeleteDestinationModalProps) => {
  return (
    <div
      className="destination-delete-overlay"
      onClick={onCancel}
    >
      <div
        className="destination-delete-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="destination-delete-icon">
          !
        </div>

        <h2>
          Delete Destination?
        </h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>
            {destinationName}
          </strong>
          ?
        </p>

        <p className="destination-delete-warning">
          This action cannot be undone.
        </p>

        <div className="destination-delete-actions">
          <button
            type="button"
            className="destination-delete-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="destination-delete-confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete Destination"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDestinationModal;