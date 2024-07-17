// useUserStore.ts

import { create } from "zustand";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebasedb";
import { getUserInfo, updateLastLoginAt } from "@/firebase/firestore";
import { Session } from "next-auth";
import { UserInfo } from "@/types/UserInfo";

// UserState 인터페이스 정의
export interface UserState {
  user: User | null;
  userInfo: UserInfo | null;
  registrationStep: string | null;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
  setRegistrationStep: (step: string | null) => void;
  clearUserInfo: () => void;
  setIsInitialized: (isInitialized: boolean) => void;
  syncSessionUser: (session: Session | null) => void;
}

// Zustand store 생성
const useUserStore = create<UserState>((set) => ({
  user: null,
  userInfo: null,
  registrationStep: null,
  isInitialized: false,

  // Firebase User 객체 설정
  setUser: (user) => set({ user }),

  // UserInfo 객체 설정
  setUserInfo: (userInfo) => set({ userInfo }),

  // 회원가입 단계 설정
  setRegistrationStep: (step) => set({ registrationStep: step }),

  // 사용자 정보 초기화
  clearUserInfo: () =>
    set({ user: null, userInfo: null, registrationStep: null }),

  // 초기화 상태 설정
  setIsInitialized: (isInitialized) => set({ isInitialized }),

  // NextAuth 세션과 상태 동기화
  syncSessionUser: (session) => {
    if (session?.user) {
      set({
        userInfo: {
          id: session.user.id,
          email: session.user.email || "",
          username: session.user.name || "",
          phoneNumber: session.user.phoneNumber || "",
          profileImgUrl: session.user.image || "",
          socialProvider: session.provider, // 소셜 로그인 제공자
          createdAt: session.user.createdAt,
          lastLoginAt: session.user.lastLoginAt,
        } as UserInfo,
      });
    } else {
      set({ user: null, userInfo: null });
    }
  },
}));

export default useUserStore;

// Firebase 인증 상태 리스너 초기화

export const initializeAuthListener = () => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    const store = useUserStore.getState();

    if (user) {
      console.log("Firebase 인증 상태: 사용자 로그인", user.uid);

      try {
        const userInfo = await getUserInfo(user.uid);

        if (userInfo) {
          console.log(
            "Firestore에서 사용자 정보를 성공적으로 가져왔습니다.",
            user.uid,
          );
          store.setUser(user);
          store.setUserInfo(userInfo);
          await updateLastLoginAt(user.uid);
        } else {
          console.warn(
            "사용자 정보를 Firestore에서 찾을 수 없습니다.",
            user.uid,
          );
          // 여기에서 추가적인 처리를 할 수 있습니다. 예: 사용자 정보 초기화
          store.clearUserInfo();
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        store.clearUserInfo();
      }
    } else {
      console.log("Firebase 인증 상태: 로그아웃");
      store.clearUserInfo();
    }

    store.setIsInitialized(true);
  });

  return unsubscribe;
};
