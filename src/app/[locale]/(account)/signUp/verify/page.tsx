"use client";

import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import useUserStore from "@/stores/useUserStore";
import VerifySuccess from "./@modal/(.)success/page";
import { firestore } from "@/firebase/firebasedb";
import { useRouter } from "next/navigation";

export default function Verify() {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [message, setMessage] = useState("");
  const { setUserInfo } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setButtonEnable(userEmail.trim() !== "" && username.trim() !== "");
  }, [userEmail, username]);

  useEffect(() => {
    const handleVerificationFromURL = async () => {
      const auth = getAuth();
      if (isSignInWithEmailLink(auth, window.location.href)) {
        setIsVerifying(true);
        try {
          const email = window.localStorage.getItem("emailForSignIn");
          if (!email) {
            setMessage("이메일 정보를 찾을 수 없습니다. 다시 시도해주세요.");
            return;
          }

          await signInWithEmailLink(auth, email, window.location.href);
          const user = auth.currentUser;
          if (user) {
            await updateUserVerificationStatus(user);
            setMessage("이메일이 성공적으로 인증되었습니다.");
            router.push("/signUp/register");
          }
        } catch (error) {
          console.error("이메일 인증 실패:", error);
          setMessage("이메일 인증에 실패했습니다. 다시 시도해주세요.");
        } finally {
          setIsVerifying(false);
        }
      }
    };

    handleVerificationFromURL();
  }, [router]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const updateUserVerificationStatus = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, { emailVerified: true }, { merge: true });
  };

  const handleVerification = async () => {
    if (!validateEmail(userEmail)) {
      setMessage("유효하지 않은 이메일 형식입니다.");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        Math.random().toString(36).slice(-8), // 임시 랜덤 비밀번호
      );
      const user = userCredential.user;

      // 이메일 인증 링크 설정
      const actionCodeSettings = {
        url: `${window.location.origin}/signUp/emailVerified`,
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings);

      // Firestore에 사용자 정보 임시 저장
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        email: userEmail,
        username,
        uid: user.uid,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      });

      setUserInfo({ email: userEmail, username, uid: user.uid });
      setShowModal(true);
      setMessage("인증 이메일을 발송했습니다. 이메일을 확인해주세요.");

      // 이메일 저장 (이메일 링크 인증용)
      window.localStorage.setItem("emailForSignIn", userEmail);
    } catch (error: any) {
      console.error("이메일 인증에 실패했습니다.", error);
      if (error.code === "auth/email-already-in-use") {
        setMessage("이미 사용 중인 이메일 주소입니다.");
      } else {
        setMessage("이메일 인증에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">
        본인인증
      </h3>
      {isVerifying ? (
        <p>이메일 인증 중...</p>
      ) : (
        <form>
          <div className="flex flex-col gap-4 mb-14">
            <Input
              type="text"
              name="username"
              inputValue={username}
              setInputValue={(e) => setUsername(e.target.value)}
              placeholder="사용자 이름을 입력해 주세요."
              label="사용자 이름"
            />
            <Input
              type="text"
              name="email"
              inputValue={userEmail}
              setInputValue={(e) => setUserEmail(e.target.value)}
              placeholder="이메일 주소를 입력해 주세요."
              label="이메일 주소"
            />
          </div>
          <TextButton
            type="button"
            variant={isButtonEnable ? "primary" : "disable"}
            size="lg"
            disabled={!isButtonEnable}
            onClick={handleVerification}
          >
            인증링크 전송
          </TextButton>
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </form>
      )}
      {showModal && <VerifySuccess />}
    </AccountFormBox>
  );
}
