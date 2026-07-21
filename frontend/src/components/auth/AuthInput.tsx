import "../../styles/form.css";

type AuthInputProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput = ({
  label,
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
}: AuthInputProps) => {
  return (
    <div className="form-group">

      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {error && (
        <small className="error-text">
          {error}
        </small>
      )}

    </div>
  );
};

export default AuthInput;