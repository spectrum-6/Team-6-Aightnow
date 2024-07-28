"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import TextButton from "@/components/Button/TextButton";
import { authDeleteUser, reauthenticateUser } from "@/firebase/fireauth";
import useUserStore from "@/stores/useUserStore";
import { UserInfo } from "@/types/UserInfo";
import { useSession } from "next-auth/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//
const deleteUser = async (
  userInfo: UserInfo,
  reasonWithdrawal: string,
  socialProvider: string,
  accessToken: string,
) => {
  const withdrawalUserInfo = {
    userInfo: userInfo,
    reasonWithdrawal: reasonWithdrawal,
  };

  // auth에서 사용자 삭제
  const authDelete = await authDeleteUser();

  // 구글 연동 해제
  if (socialProvider === "kakao") {
    const socialDelete = await (
      await fetch("https://kapi.kakao.com/v1/user/unlink", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    ).json();
  }

  // 구글 연동 해제
  if (socialProvider === "google") {
    const socialDelete = await (
      await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    ).json();
  }

  // 네이버 연동 해제 - 테스트 필요
  if (socialProvider === "naver") {
    const socialDelete = await (
      await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${accessToken}
`)
    ).json();

    console.log(socialDelete);
  }

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

export default function DeleteAccountSocial() {
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

  const { userInfo } = useUserStore();
  const [reasonWithdrawal, setReasonWithdrawal] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  useEffect(() => {
    setButtonEnable(reasonWithdrawal !== "");
  }, [reasonWithdrawal]);

  const { data: session } = useSession();

  // 탈퇴 버튼 클릭
  const handleButtonClick = async () => {
    if (userInfo && session) {
      const res = await deleteUser(
        userInfo,
        reasonWithdrawal,
        userInfo.socialProvider as string,
        session.accessToken as string,
      );
      // 탈퇴 완료 페이지로 이동
      if (res.status === 200) {
        router.replace("/accountCancel");
      }
    } else {
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
      <div className="bg-white rounded-[32px] w-[590px] h-auto p-10 flex flex-col items-center justify-center">
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

          <p className="mt-8 mb-4 text-warning-100">
            {userInfo?.socialProvider?.toUpperCase()} 연동이 해제되며, 아잇나우
            서비스에서 탈퇴됩니다.
          </p>

          <div className="flex gap-4 h-10">
            <TextButton
              type="button"
              variant="primary"
              size="full"
              onClick={() => router.back()}
            >
              뒤로 가기
            </TextButton>
            <TextButton
              type="button"
              variant={isButtonEnable ? "warning" : "disable"}
              size="full"
              disabled={!isButtonEnable}
              onClick={handleButtonClick}
            >
              회원탈퇴
            </TextButton>
          </div>
        </form>
      </div>
    </div>
  );
}
