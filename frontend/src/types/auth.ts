export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
    id: number;
    name: string;
    email: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}