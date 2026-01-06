import { API } from "../constants/api";
import type { LoginMethod, RegisterMethod } from "../types/auth";

export const login = async ({ username, password }: LoginMethod) => {
  const response = await API.post("auth/login", {
    username,
    password,
  });

  return response.data;
};

export const registerUser = async ({
  name,
  last_name,
  age,
  email,
  username,
  password,
}: RegisterMethod) => {
  const response = await API.post("auth/register", {
    name,
    last_name,
    age,
    email,
    username,
    password,
  });

  return response.data;
};
