type SubmitButtonProps = {
  text: string;
  loading?: boolean;
};

const SubmitButton = ({
  text,
  loading = false,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="submit-btn"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default SubmitButton;