import { User, signInWithEmailAndPassword } from "firebase/auth";
import { UserInfo } from "@/types/UserInfo";
import { auth } from "./firebasedb";
import { getUserInfo, getUserInfoById } from "./firestore";

// 아이디로 로그인
export const signIn = async (
  id: string,
  password: string,
): Promise<UserInfo> => {
  try {
    console.log("ID로 로그인 시도 중:", id);
    const userInfo = await getUserInfoById(id);
    console.log("사용자 정보 가져옴:", userInfo);

    if (!userInfo || !userInfo.email) {
      console.error("ID에 대한 사용자를 찾을 수 없거나 이메일이 없음:", id);
      throw new Error("사용자를 찾을 수 없음");
    }

    console.log("이메일로 Firebase 인증 시도 중:", userInfo.email);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userInfo.email,
      password,
    );
    const user = userCredential.user;

    console.log("Firebase 인증 성공, 사용자 UID:", user.uid);
    const updatedUserInfo = await getUserInfo(user.uid);

    if (!updatedUserInfo) {
      console.error("로그인 후 사용자 정보를 찾을 수 없음 UID:", user.uid);
      throw new Error("로그인 후 사용자 정보를 찾을 수 없음");
    }

    console.log("로그인 성공, 사용자 정보 반환 중");
    return updatedUserInfo;
  } catch (error: any) {
    console.error("로그인 오류:", error);
    throw error;
  }
};

//로그아웃
export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw error;
  }
};

//현재 로그인된 사용자 가져오기
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Firebase 인증 상태 변경 리스너
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};
