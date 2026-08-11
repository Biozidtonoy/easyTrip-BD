import axios from "axios";

import { getToken } from "../utils/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // File upload requests
  if (config.data instanceof FormData) {
    // Let the browser set:
    // multipart/form-data; boundary=...
    delete config.headers["Content-Type"];
  }

  // OAuth2 login requests
  else if (config.data instanceof URLSearchParams) {
    config.headers["Content-Type"] =
      "application/x-www-form-urlencoded";
  }

  // Normal API requests
  else {
    config.headers["Content-Type"] =
      "application/json";
  }

  return config;
});

export default api;