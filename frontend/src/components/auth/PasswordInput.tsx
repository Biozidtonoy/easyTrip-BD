import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../../styles/form.css";

type PasswordInputProps = {
  value: string;
  name: string;
  placeholder: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = ({
  value,
  name,
  placeholder,
  error,
  onChange,
}: PasswordInputProps) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">

      <label>Password</label>

      <div className="password-wrapper">

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

        <button
          type="button"
          className="toggle-password"
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

      {error && (
        <small className="error-text">
          {error}
        </small>
      )}

    </div>
  );
};

export default PasswordInput;