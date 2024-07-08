import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserInfo } from "@/types/UserInfo";
import { auth } from "./firebasedb";
import { getUserInfo } from "./firestore";

// 아이디로 로그인
export const signIn = async (
  id: string,
  password: string,
): Promise<UserInfo> => {
  try {
    // API 요청을 보냅니다. action을 'login'으로 명시합니다.
    const response = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", id, password }),
    });

    // 응답이 성공적이지 않으면 오류를 던집니다.
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    // 응답에서 사용자 정보를 추출합니다.
    const { userInfo } = await response.json();

    // Firebase Authentication으로 직접 로그인
    // 음...이 부분은 서버에서 이미 인증을 했으므로 생략할 수 있겠지...
    // await signInWithEmailAndPassword(auth, user.email, password);

    return userInfo;
  } catch (error: any) {
    console.error("로그인 오류:", error);
    throw error;
  }
};

export const signUp = async (
  userInfo: Partial<UserInfo>,
  password: string,
): Promise<UserInfo> => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        id: userInfo.email,
        password,
        email: userInfo.email,
        userInfo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    const { userInfo: registeredUserInfo } = await response.json();
    return registeredUserInfo;
  } catch (error: any) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw error;
  }
};

// Google 로그인
export const signInWithGoogle = async (): Promise<{ userInfo: UserInfo }> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    let userInfo = await getUserInfo(user.uid);
    if (!userInfo) {
      // 신규 사용자일 경우 기본 정보 생성
      userInfo = {
        uid: user.uid,
        email: user.email || "",
        username: user.displayName || "",
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
    }
    return { userInfo };
  } catch (error: any) {
    console.error("Google sign-in error:", error.message);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};
