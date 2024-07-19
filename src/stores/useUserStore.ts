import { create } from "zustand";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebasedb";
import { getUserInfo, updateLastLoginAt } from "@/firebase/firestore";
import { Session } from "next-auth";
import { UserInfo } from "@/types/UserInfo";

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
  syncFirebaseUser: (firebaseUser: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  userInfo: null,
  registrationStep: null,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setRegistrationStep: (step) => set({ registrationStep: step }),
  clearUserInfo: () => set({ 
    user: null, 
    userInfo: null, 
    registrationStep: null,
    isInitialized: false 
  }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),

  syncSessionUser: async (session) => {
    if (session?.user) {
      const userInfo = await getUserInfo(session.user.id);
      if (userInfo) {
        set({
          userInfo: {
            ...userInfo,
            id: session.user.id,
            uid: session.user.id,
            email: session.user.email || null,
            username: session.user.name || null,
            profileImgUrl: session.user.image || null,
            socialProvider: session.provider,
          },
        });
      }
    } else {
      set({ user: null, userInfo: null });
    }
  },

  syncFirebaseUser: async (firebaseUser) => {
    const userInfo = await getUserInfo(firebaseUser.uid);
    if (userInfo) {
      set({
        userInfo: {
          ...userInfo,
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName,
          profileImgUrl: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
          createdAt:
            firebaseUser.metadata.creationTime || new Date().toISOString(),
          lastLoginAt:
            firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
        },
      });
    }
  },
}));

export default useUserStore;

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
          store.syncFirebaseUser(user);
          await updateLastLoginAt(user.uid);
        } else {
          console.warn(
            "사용자 정보를 Firestore에서 찾을 수 없습니다.",
            user.uid,
          );
          store.syncFirebaseUser(user);
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
