import { useEffect, useState, type ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import type { User } from "../types/auth";
import { getCurrentUser } from "../services/authService";
import { getToken, removeToken } from "../utils/storage";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to fetch current user:", error);

      removeToken();
      setUser(null);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (!getToken()) {
        setLoading(false);
        return;
      }

      await login();
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};