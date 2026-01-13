import { create } from "zustand";
import type { User } from "../types/user";

interface UserStore {
  name: string;
  image_profile: string;
  image_banner: string;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
}

const userEmpty = {
  name: "",
  image_profile: "",
  image_banner: "",
};

export const userStore = create<UserStore>((set) => ({
  name: "",
  image_profile: "",
  image_banner: "",
  setUser: (user) => set(user),
  clearUser: () => set(userEmpty),
}));
