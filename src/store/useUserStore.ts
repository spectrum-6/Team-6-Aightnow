import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserInfo } from "@/types/UserInfo";
import { User, onAuthStateChanged } from "firebase/auth";
import { Session } from "next-auth";
import { auth } from "@/firebase/firebasedb";
import { getUserInfo, updateLastLoginAt } from "@/firebase/firestore";

export interface UserState {
  user: User | null;
  userInfo: UserInfo | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
  setSession: (session: Session | null) => void;
  clearUserInfo: () => void;
  syncNextAuthSession: (session: Session) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      userInfo: null,
      session: null,
      setUser: (user) => set({ user }),
      setUserInfo: (userInfo) => set({ userInfo }),
      setSession: (session) => set({ session }),
      clearUserInfo: () => set({ user: null, userInfo: null, session: null }),
      syncNextAuthSession: (session) => {
        set({ session });
        if (session?.user) {
          set({
            userInfo: {
              ...get().userInfo,
              email: session.user.email!,
              username: session.user.name || undefined,
              socialProvider: (session as any).provider,
            } as UserInfo,
          });
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
    },
  ),
);

export default useUserStore;

// 클라이언트 사이드에서만 실행되는 함수
export const initializeAuthListener = () => {
  if (typeof window === "undefined") {
    return () => {}; // 서버 사이드에서는 아무 것도 하지 않음
  }

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    const store = useUserStore.getState();

    if (user) {
      // 사용자가 로그인한 경우
      console.log("User is signed in:", user.uid);

      try {
        // Firestore에서 사용자 정보 가져오기
        const userInfo = await getUserInfo(user.uid);

        // Zustand 스토어 업데이트
        store.setUser(user);
        store.setUserInfo(userInfo);

        // 마지막 로그인 시간 업데이트
        await updateLastLoginAt(user.uid);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    } else {
      // 사용자가 로그아웃한 경우
      console.log("User is signed out");
      store.clearUserInfo();
    }
  });

  // 클린업 함수 반환
  return unsubscribe;
};
