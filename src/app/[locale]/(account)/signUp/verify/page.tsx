"use client"; // 클라이언트 컴포넌트로 설정

import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import { useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@/firebase/fireauth";
import { useRouter } from "next/navigation"; // next/navigation 사용

export default function Verify() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setButtonEnable(userEmail.trim() !== "" && userPassword.trim() !== "");
  }, [userEmail, userPassword]);

  const handleVerification = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword,
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Redirect after sending the email
      router.push("/ko/signUp/verify/success"); // 성공 페이지로 이동
    } catch (error) {
      console.error("이메일 인증에 실패했습니다.", error);
      setMessage("이메일 인증에 실패했습니다. 다시 시도해주세요.");
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
            name="email"
            inputValue={userEmail}
            setInputValue={(e) => setUserEmail(e.target.value)}
            placeholder="이메일 주소를 입력해 주세요."
            label="이메일주소"
          />
          <Input
            type="password"
            name="password"
            inputValue={userPassword}
            setInputValue={(e) => setUserPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
            label="비밀번호"
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
        {message && <p>{message}</p>}
      </form>
    </AccountFormBox>
  );
}
