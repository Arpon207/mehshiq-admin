import axios from "axios";

export const request = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "production"
      ? "https://mehshiq-backend.vercel.app/api"
      : "http://localhost:5000/api",
  headers: {
    authorization: `bearer ${localStorage.getItem("authToken")}`,
  },
});
