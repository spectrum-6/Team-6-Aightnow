import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/types/UserInfo";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/firebase/fireauth";
import { getUserInfo, updateLastLoginAt } from "@/firebase/firestore";

interface UserState {
  user: User | null;
  userInfo: UserInfo | null;
  setUser: (user: User | null) => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
  clearUserInfo: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      userInfo: null,
      setUser: (user) => set({ user }),
      setUserInfo: (userInfo) => set({ userInfo }),
      clearUserInfo: () => set({ user: null, userInfo: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    },
  ),
);

export const initializeAuthListener = () => {
  onAuthStateChanged(async (user) => {
    if (user) {
      const userInfo = await getUserInfo(user.uid);
      useUserStore.getState().setUser(user);
      useUserStore.getState().setUserInfo(userInfo);
      if (userInfo) {
        await updateLastLoginAt(user.uid); // userInfo가 존재할 때만 실행
      }
    } else {
      useUserStore.getState().clearUserInfo();
    }
  });
};

export default useUserStore;
