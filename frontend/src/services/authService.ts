import api from "../api/axios";
import { API_ENDPOINTS } from "../api/endpoints";
import type { User } from "../types/auth";

import type {
  LoginFormData,
  RegisterFormData,
  RegisterResponse,
  LoginResponse,
} from "../types/auth";

export const registerUser = async (
  data: RegisterFormData
): Promise<RegisterResponse> => {
  const response = await api.post(
    API_ENDPOINTS.REGISTER,
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginFormData
): Promise<LoginResponse> => {

  const formData = new URLSearchParams();

  formData.append("username", data.email);
  formData.append("password", data.password);

  const response = await api.post(
    API_ENDPOINTS.LOGIN,
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get(API_ENDPOINTS.CURRENT_USER);

  return response.data;
};