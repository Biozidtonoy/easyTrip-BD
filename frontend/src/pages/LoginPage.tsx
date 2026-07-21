import { Link } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import SubmitButton from "../components/auth/SubmitButton";
import { validateLoginForm } from "../utils/validators";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { saveToken } from "../utils/storage";
import { useAuth } from "../hooks/useAuth";




const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const validationErrors = validateLoginForm(
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

      const response = await loginUser(formData);

      saveToken(response.access_token);
      await login();
      
      setSuccessMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.detail ?? "Invalid email or password.",
        );
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue your journey.">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
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

        <SubmitButton text="Login" loading={loading} />
      </form>

      <p className="auth-footer">
        Don't have an account?
        <Link to="/register">Register</Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
