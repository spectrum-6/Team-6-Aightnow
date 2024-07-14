"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import { authDeleteUser, reauthenticateUser } from "@/firebase/fireauth";
import useUserStore from "@/stores/useUserStore";
import { UserInfo } from "@/types/UserInfo";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const deleteUser = async (userInfo: UserInfo, reasonWithdrawal: string) => {
  const withdrawalUserInfo = {
    userInfo: userInfo,
    reasonWithdrawal: reasonWithdrawal,
  };

  // auth에서 사용자 삭제
  const authDelete = await authDeleteUser();

  // DB에서 사용자 삭제
  if (authDelete?.result) {
    const dbDelete = await (
      await fetch(`${baseUrl}/api/users/${userInfo.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(withdrawalUserInfo),
      })
    ).json();

    return dbDelete;
  } else {
    console.log("사용자 삭제 실패");
  }
};

export default function DeleteAccount() {
  const { userInfo } = useUserStore();

  const router = useRouter();
  const reasons = [
    "이용이 불편하고 장애가 많아서",
    "다른 서비스가 더 좋아서",
    "사용 빈도가 낮아서",
    "콘텐츠 불만",
    "기타",
  ];

  // 모달 닫기
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

  const [reasonWithdrawal, setReasonWithdrawal] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  useEffect(() => {
    setButtonEnable(reasonWithdrawal !== "" && password.trim() !== "");
  }, [reasonWithdrawal, password]);

  // 탈퇴 버튼 클릭
  const handleButtonClick = async () => {
    // 비밀번호 재인증
    const res = await reauthenticateUser(password);

    if (res?.result && userInfo) {
      const res = await deleteUser(userInfo, reasonWithdrawal);
      // 탈퇴 완료 페이지로 이동
      if (res.status === 200) {
        router.replace("/accountCancel");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      router.back();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen p-4"
      // onClick={(event) => {
      //   if (event.target === event.currentTarget) {
      //     setIsOpen(false);
      //   }
      // }}
    >
      <div className="bg-white rounded-[32px] w-[590px] h-[544px] p-10 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">회원 탈퇴</h3>

        <form className="">
          <div className="flex flex-col w-[386px] mb-4">
            <label htmlFor="reason" className="text-base mb-2 text-left">
              회원탈퇴 사유
            </label>
            <Dropdown
              list={reasons}
              placeholder="탈퇴사유를 선택해주세요."
              onChangeEvent={setReasonWithdrawal}
            />
          </div>

          <div className="flex flex-col w-[386px] mb-14">
            <Input
              type="password"
              name="password"
              inputValue={password}
              setInputValue={(e) => setPassword(e.target.value)}
              placeholder=""
              label="비밀번호 입력"
            />
          </div>

          <TextButton
            type="button"
            variant={isButtonEnable ? "primary" : "disable"}
            size="lg"
            disabled={!isButtonEnable}
            onClick={handleButtonClick}
          >
            회원탈퇴
          </TextButton>
        </form>
      </div>
    </div>
  );
}
