import { API } from "../constants/api";
import type { LoginMethod } from "../types/auth";

export const login = async ({ username, password }: LoginMethod) => {
  const response = await API.post("auth/login", {
    username,
    password,
  });

  return response.data;
};
