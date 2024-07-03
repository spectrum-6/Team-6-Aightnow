import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => sessionStorage,
    },
  ),
);

export default useUserStore;
