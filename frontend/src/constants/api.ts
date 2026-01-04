import axios from "axios";

// http://localhost:3000/api/v1

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
