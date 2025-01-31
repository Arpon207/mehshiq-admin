import axios from "axios";

export const request = axios.create({
  baseURL: "https://mehshiq-backend.vercel.app/api/",
  withCredentials: true,
});
