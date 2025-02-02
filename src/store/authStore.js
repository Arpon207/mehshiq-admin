import axios from "axios";
import { create } from "zustand";

const authrequest = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "production"
      ? "https://mehshiq-backend.vercel.app/api"
      : "http://localhost:5000/api",
});

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authrequest.post(`/auth/signup`, {
        email,
        password,
        name,
      });
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authrequest.post(`/auth/login`, {
        email,
        password,
      });
      if (response.data.success === true) {
        localStorage.setItem("authToken", response.data.user.token);
      }
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logged in.",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({ isLoading: true, error: null });
    try {
      localStorage.removeItem("authToken");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Error logging out.",
        isLoading: "false",
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await authrequest.get(`/auth/check-auth`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("authToken");
      }
      set({
        error: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));
