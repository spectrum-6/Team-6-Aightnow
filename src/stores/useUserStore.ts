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
  clearUserInfo: () =>
    set({
      user: null,
      userInfo: null,
      registrationStep: null,
      isInitialized: false,
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
            socialProvider: session.provider || userInfo.socialProvider,
          },
        });
      }
    } else {
      set({ user: null, userInfo: null });
    }
  },

  syncFirebaseUser: async (firebaseUser) => {
    try {
      const userInfo = await getUserInfo(firebaseUser.uid);
      if (userInfo) {
        set({
          userInfo: {
            ...userInfo,
            id: userInfo.id || firebaseUser.uid,
            uid: firebaseUser.uid,
            email: firebaseUser.email || userInfo.email,
            username: firebaseUser.displayName || userInfo.username,
            profileImgUrl: firebaseUser.photoURL || userInfo.profileImgUrl,
            phoneNumber: firebaseUser.phoneNumber || userInfo.phoneNumber,
            socialProvider: userInfo.socialProvider || "firebase",
            createdAt:
              firebaseUser.metadata.creationTime ||
              userInfo.createdAt ||
              new Date().toISOString(),
            lastLoginAt:
              firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
          },
        });
        await updateLastLoginAt(firebaseUser.uid);
      } else {
        console.warn("User info not found in Firestore:", firebaseUser.uid);
      }
    } catch (error) {
      console.error("Error syncing Firebase user:", error);
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
      console.log("Firebase auth state: User logged in", user.uid);
      store.setUser(user);
      await store.syncFirebaseUser(user);
    } else {
      console.log("Firebase auth state: User logged out");
      store.clearUserInfo();
    }

    store.setIsInitialized(true);
  });

  return unsubscribe;
};
