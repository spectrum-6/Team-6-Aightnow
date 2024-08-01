import {
  EmailAuthProvider,
  User,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { UserInfo } from "@/types/UserInfo";
import { auth } from "./firebasedb";
import { getUserInfo, getUserInfoById, updateUserInfo } from "./firestore";

// Firebase를 사용한 로그인 (토큰 반환 추가)
export const signIn = async (
  id: string,
  password: string,
): Promise<{
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}> => {
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

    // 사용자가 입력한 ID를 updatedUserInfo에 추가
    updatedUserInfo.id = id;

    // Firestore에 업데이트된 사용자 정보 저장
    await updateUserInfo(user.uid, { id: id });

    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    // accessToken 쿠키 저장
    document.cookie = `userAccessToken=${accessToken}; path=/`;

    return { userInfo: updatedUserInfo, accessToken, refreshToken };
  } catch (error: any) {
    console.error("로그인 오류:", error);
    throw error;
  }
};

// 리프레시 토큰을 사용하여 새 액세스 토큰 획득
export const refreshToken = async (
  refreshToken: string,
): Promise<{ accessToken: string; userInfo: UserInfo }> => {
  try {
    // Firebase Admin SDK를 사용하여 서버 측에서 처리해야 함
    // 여기서는 예시로 클라이언트 측 로직만 표현
    const response = await fetch("/api/refreshToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("토큰 갱신 실패");
    }

    const { accessToken, uid } = await response.json();
    const userInfo = await getUserInfo(uid);

    if (!userInfo) {
      throw new Error("사용자 정보를 찾을 수 없음");
    }

    return { accessToken, userInfo };
  } catch (error) {
    console.error("토큰 갱신 오류:", error);
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

// 사용자의 비밀번호 재인증
export const reauthenticateUser = async (currentPassword: string) => {
  const user = auth.currentUser;
  if (user && user.email) {
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    try {
      await reauthenticateWithCredential(user, credential);
      return { result: true };
    } catch (error) {
      return { error: error };
    }
  }
};

// 사용자의 비밀번호 재설정
export const changePassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updatePassword(user, newPassword);
      return { result: true };
    } catch (error) {
      return { error: error };
    }
  }
};

// 사용자 탈퇴
export const authDeleteUser = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      await user.delete();
      return { result: true };
    } catch (error) {
      return { error: error };
    }
  }
};

// 이메일 인증 상태 확인
export const checkEmailVerification = async (): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    await user.reload(); // 사용자 정보 새로고침
    return user.emailVerified;
  }

  return false;
};

// 이메일 인증 메일 재전송
export const resendVerificationEmail = async (): Promise<void> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    await sendEmailVerification(user);
  } else {
    throw new Error("이메일 인증 메일을 보낼 수 없습니다.");
  }
};
