import { Link } from "react-router-dom";
import { useState } from "react";
import { validateRegisterForm } from "../utils/validators";
import { registerUser } from "../services/authService";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import SubmitButton from "../components/auth/SubmitButton";
import { AxiosError } from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const validationErrors = validateRegisterForm(
      formData.name,
      formData.email,
      formData.password,
    );

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);

      return;
    }

    setErrors({});

    try {
      setLoading(true);

      await registerUser(formData);

      setSuccessMessage("Registration successful!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.detail ?? "Registration failed.");
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join easytripBd today.">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your full name"
          error={errors.name}
          onChange={handleChange}
        />

        <AuthInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          error={errors.email}
          onChange={handleChange}
        />

        <PasswordInput
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          error={errors.password}
          onChange={handleChange}
        />

        <SubmitButton text="Create Account" loading={loading} />
      </form>

      <p className="auth-footer">
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
