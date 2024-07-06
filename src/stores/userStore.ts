import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TUser = {
  userId: string;
  userName: string;
  userNickname: string;
  transLang: string;
  userUID: string;
};

type TUserStoreState = {
  user: TUser | null;
  setUser: (userData: TUser) => void;
  clearUser: () => void;
};

const useUserStore = create<TUserStoreState>()(
  persist(
    (set) => ({
      // 테스트용 하드코딩
      // user: {
      //   userUID: "ychTesUID",
      //   userId: "spectrum",
      //   userName: "김스펙",
      //   userNickname: "스펙트럼",
      //   transLang: "en",
      // },
      user: null,
      setUser: (userData: TUser) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
