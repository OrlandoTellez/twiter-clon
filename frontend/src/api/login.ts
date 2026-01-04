import axios from "axios";
import type { LoginMethod } from "../types/auth";

// VITE_API_URL: http://localhost:3000/api/v1

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const login = async ({ username, password }: LoginMethod) => {
  const response = await API.post("auth/login", {
    username,
    password,
  });

  return response.data;
};
