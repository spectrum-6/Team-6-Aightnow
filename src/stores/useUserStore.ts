import { create } from "zustand";
import { UserInfo } from "@/types/UserInfo";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebasedb";
import { getUserInfo, updateLastLoginAt } from "@/firebase/firestore";
import { Session } from "next-auth";

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

const useUserStore = create<UserState>((set) => ({
  user: null,
  userInfo: null,
  registrationStep: null,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setRegistrationStep: (step) => set({ registrationStep: step }),
  clearUserInfo: () =>
    set({ user: null, userInfo: null, registrationStep: null }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
  syncSessionUser: (session) => {
    if (session?.user) {
      set({
        userInfo: {
          id: session.user.id,
          email: session.user.email || "",
          username: session.user.name || "",
          phoneNumber: session.user.phoneNumber || "",
          profileImgUrl: session.user.image || "",
          socialProvider: session.provider, //소셜 로그인
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

// 클라이언트 사이드에서만 실행되는 함수
export const initializeAuthListener = () => {
  if (typeof window === "undefined") {
    return () => {}; // 서버 사이드에서는 아무 것도 하지 않음
  }

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    const store = useUserStore.getState();

    if (user) {
      // 사용자가 로그인한 경우
      console.log("사용자가 로그인하였습니다.", user.uid);

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
      // 사용자가 로그인하지 않은 상태
      store.clearUserInfo();
      console.log("사용자가 로그아웃했습니다.");
    }

    // 초기화 완료 표시
    store.setIsInitialized(true);
  });

  // 클린업 함수 반환
  return unsubscribe;
};
