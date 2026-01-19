import { create } from "zustand";
import type { User } from "../types/user";
import { persist } from "zustand/middleware";

interface UserStore {
  user_id: number;
  name: string;
  last_name: string;
  username: string;
  bio: string;
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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user_id: 0,
      name: "",
      last_name: "",
      username: "",
      bio: "",
      image_profile: "",
      image_banner: "",
      setUser: (user) => set({ user_id: user.id, ...user }),
      clearUser: () => set({ user_id: 0, ...userEmpty }),
    }),
    {
      name: "user-storage",
    },
  ),
);
