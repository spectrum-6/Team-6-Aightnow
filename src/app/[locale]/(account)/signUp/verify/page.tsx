"use client";

import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import useUserStore from "@/stores/useUserStore";
import VerifySuccess from "./@modal/(.)success/page";
import { firestore } from "@/firebase/firebasedb";

export default function Verify() {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [message, setMessage] = useState("");
  const { setUserInfo } = useUserStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setButtonEnable(userEmail.trim() !== "" && username.trim() !== "");
  }, [userEmail, username]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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
        "temporary-password", // 임시 비밀번호
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      // Firestore에 사용자 정보 저장
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        email: userEmail,
        username,
        uid: user.uid,
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString(),
      });

      setUserInfo({ email: userEmail, username, uid: user.uid });
      setShowModal(true);
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
      {showModal && <VerifySuccess />}
    </AccountFormBox>
  );
}
