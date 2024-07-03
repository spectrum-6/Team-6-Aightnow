import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  applyActionCode,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebasedb from "./firebasebd";

// Firebase 앱 인스턴스에서 auth 객체 초기화
const auth = getAuth(firebasedb);
const googleProvider = new GoogleAuthProvider();

// Google 계정으로 로그인
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    throw error;
  }
};

// 이메일과 비밀번호로 회원가입
const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// 이메일 인증 메일 발송
const sendVerificationEmail = async (user: any, actionCodeSettings: any) => {
  try {
    await sendEmailVerification(user, actionCodeSettings);
  } catch (error) {
    throw error;
  }
};

// 이메일 인증 처리
const verifyEmail = async (oobCode: string) => {
  try {
    await applyActionCode(auth, oobCode);
  } catch (error) {
    throw error;
  }
};

export {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  applyActionCode,
  sendEmailVerification,
  verifyEmail,
  signInWithEmailAndPassword,
};
