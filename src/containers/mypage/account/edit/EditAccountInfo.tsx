"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/stores/useUserStore";
import Input from "@/components/Input";
import TextButton from "@/components/Button/TextButton";
import { changePassword } from "@/firebase/fireauth";
import { updateUserInfo } from "@/firebase/firestore";

export default function EditAccountInfo() {
  const { userInfo, setUserInfo } = useUserStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordConfirmError, setPasswordConfirmError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");
  const [birthDate, setBirthDate] = useState(userInfo?.birthDate || "");
  const [isButtonEnable, setButtonEnable] = useState(false);
  // 모달 닫기
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  useEffect(() => {
    // 비밀번호 확인
    if (confirmPassword.trim() !== "" && password !== confirmPassword) {
      setPasswordConfirmError(true);
      setButtonEnable(false);
      return;
    } else {
      setPasswordConfirmError(false);
    }

    if (
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      birthDate.trim() !== ""
    ) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [password, confirmPassword, phoneNumber, birthDate]);

  const handleButtonClick = async () => {
    // 비밀번호 재설정
    const res = await changePassword(password);

    if (res?.result) {
      // DB에 회원정보 업데이트
      if (
        userInfo?.uid &&
        (phoneNumber !== userInfo?.phoneNumber ||
          birthDate !== userInfo?.birthDate)
      ) {
        const updatedUserInfo = {
          ...userInfo,
          password,
          phoneNumber,
          birthDate,
        };

        await updateUserInfo(userInfo?.uid, updatedUserInfo);
        setUserInfo(updatedUserInfo);
        alert("계정 정보가 수정되었습니다.");
      }
    } else {
      alert("계정 정보 수정에 실패하였습니다.");
    }

    router.back(); // 'mypage' 경로로 이동
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    router.replace("/settings/account/delete/deleteaccount");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          router.back();
        }
      }}
    >
      <div className="bg-white rounded-[32px] w-[590px] h-[892px] p-10 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">정보 수정</h3>

        <form action="" className="mb-10">
          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              아이디
            </label>
            <Input
              type="text"
              name="id"
              inputValue={userInfo?.id || ""}
              disabled={true}
              setInputValue={(e) => e.preventDefault()}
            />
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              새 비밀번호 입력
            </label>

            <Input
              type="password"
              name="password"
              inputValue={password}
              setInputValue={(e) => setPassword(e.target.value)}
              placeholder="새로운 비밀번호를 입력해 주세요."
              caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
            />
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor="password-confirmation"
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              새 비밀번호 확인
            </label>
            <Input
              type="password"
              name="confirmPassword"
              inputValue={confirmPassword}
              setInputValue={(e) => setConfirmPassword(e.target.value)}
              placeholder="새로운 비밀번호를 확인해 주세요."
              state={isPasswordConfirmError ? "warning" : null}
              caption={
                isPasswordConfirmError
                  ? "동일한 비밀번호가 아닙니다. 다시 확인 후 입력해 주세요."
                  : ""
              }
            />
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              휴대폰번호
            </label>
            <Input
              type="text"
              name="phoneNumber"
              inputValue={phoneNumber}
              setInputValue={(e) => setPhoneNumber(e.target.value)}
              placeholder=" - 를 제외한 휴대폰 번호를 입력해 주세요."
            />
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              생년월일
            </label>
            <Input
              type="text"
              name="birthDate"
              inputValue={birthDate}
              setInputValue={(e) => setBirthDate(e.target.value)}
              placeholder="생년월일 6자리를 입력해주세요. (예시 : 991231)"
            />
          </div>
        </form>

        <TextButton
          type="button"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
          onClick={handleButtonClick}
        >
          수정하기
        </TextButton>

        <Link
          href="/settings/account/delete/deleteaccount"
          className="text-warning-100 text-sm underline mt-2"
          onClick={handleLinkClick}
        >
          회원탈퇴
        </Link>
      </div>
    </div>
  );
}
