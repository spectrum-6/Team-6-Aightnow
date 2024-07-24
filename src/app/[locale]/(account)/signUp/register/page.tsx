"use client";

import React, { useState, useEffect } from "react";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { getUserInfo, updateUserInfo } from "@/firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import { duplicateCheck } from "@/utils/duplicateCheck";

const Register: React.FC = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserStore();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [message, setMessage] = useState("");
  // 아이디 중복확인 버튼 상태
  const [idInputState, setIdInputState] = useState<
    "warning" | "success" | null
  >(null);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await user.reload(); // 사용자 정보 새로고침
        if (!user.emailVerified) {
          setMessage(
            "이메일 인증이 완료되지 않았습니다. 인증 후 다시 시도해주세요.",
          );
          router.push("/signUp/verify");
        } else {
          // Firestore에서 사용자 정보 가져오기
          const userInfo = await getUserInfo(user.uid);
          if (userInfo) {
            setUserInfo(userInfo);
          }
        }
      } else {
        setMessage("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
        router.push("/login");
      }
    };

    checkEmailVerification();
  }, [router, setUserInfo]);

  useEffect(() => {
    setButtonEnable(
      id.trim() !== "" &&
        password.trim() !== "" &&
        password === confirmPassword &&
        phoneNumber.trim() !== "" &&
        birthDate.trim() !== "" &&
        idInputState === "success",
    );
  }, [id, password, confirmPassword, phoneNumber, birthDate, idInputState]);

  const [isPasswordConfirmError, setPasswordConfirmError] = useState(false);

  // id 중복 체크
  const idDuplicateCheck = async () => {
    if (!id) return;
    try {
      const res = await duplicateCheck("id", id);
      if (res.data > 0) {
        setIdInputState("warning");
      } else {
        setIdInputState("success");
      }
    } catch (error) {
      console.error("Failed to check for duplicate Id:", error);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.emailVerified) {
      setMessage(
        "이메일 인증이 완료되지 않았습니다. 인증 후 다시 시도해주세요.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 이미 존재하는 사용자인지 확인
      const existingUser = await getUserInfo(currentUser.uid);

      // 회원가입 정보 추가
      const updatedUserInfo = {
        ...(existingUser || {}),
        id,
        phoneNumber,
        birthDate,
        uid: currentUser.uid,
        email: currentUser.email,
        username: userInfo?.username || "",
        emailVerified: true,
        registrationCompleted: true,
      };

      // Firebase Authentication 비밀번호 업데이트
      await updatePassword(currentUser, password);

      // Firestore 사용자 정보 업데이트 또는 생성
      await updateUserInfo(currentUser.uid, updatedUserInfo);

      // Zustand 상태 업데이트
      setUserInfo(updatedUserInfo);

      // 회원가입 후 프로필 페이지로 이동
      router.push("/signUp/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">
        회원가입
      </h3>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col gap-4 mb-14">
          <DuplicateCheckInput
            type="text"
            name="id"
            inputValue={id}
            setInputValue={(e) => setId(e.target.value)}
            placeholder="아이디를 입력해 주세요."
            label="아이디"
            caption="*  6~12자의 영문, 숫자, ,_을 이용한 조합"
            state={idInputState}
            buttonClickHandler={idDuplicateCheck}
          />
          <Input
            type="password"
            name="password"
            inputValue={password}
            setInputValue={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
            label="비밀번호"
            caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
          />
          <Input
            type="password"
            name="confirmPassword"
            inputValue={confirmPassword}
            setInputValue={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력해 주세요."
            label="비밀번호 확인"
            state={isPasswordConfirmError ? "warning" : null}
            caption={
              isPasswordConfirmError
                ? "동일한 비밀번호가 아닙니다. 다시 확인 후 입력해 주세요."
                : ""
            }
          />
          <Input
            type="text"
            name="phoneNumber"
            inputValue={phoneNumber}
            setInputValue={(e) => setPhoneNumber(e.target.value)}
            placeholder=" - 를 제외한 휴대폰 번호를 입력해 주세요."
            label="전화번호"
          />
          <Input
            type="text"
            name="birthDate"
            inputValue={birthDate}
            setInputValue={(e) => setBirthDate(e.target.value)}
            placeholder="생년월일 6자리를 입력해주세요. (예시 : 991231)"
            label="생년월일"
          />
        </div>
        <TextButton
          type="submit"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
        >
          다음
        </TextButton>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </form>
    </AccountFormBox>
  );
};

export default Register;
