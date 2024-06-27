"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconEdit } from "@/icons";

import Link from "next/link";

export default function VerifyPassword() {
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

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.replace("/mypage/usersettings/editaccountinfo");
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
      <div className="bg-white rounded-[32px] w-[590px] h-[444px] p-6 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">
          비밀번호 인증
        </h3>

        <div className="w-[386px] mb-14 flex flex-col items-center">
          <label
            htmlFor=""
            className="block text-navy-900 mb-1 .text-base font-medium self-start"
          >
            현재 비밀번호 입력
          </label>
          <input
            type="password"
            className="w-[386px] h-[56px] border border-gray-300 rounded-lg px-4 focus:outline-none"
          />
        </div>

        <Link
          href="mypage/usersettings/editaccountinfo"
          className="flex items-center justify-center w-[386px] h-[64px] bg-grayscale-200 hover:bg-navy-700 text-grayscale-300 hover:text-white font-medium py-2 px-6 rounded-lg text-lg"
          onClick={handleLinkClick}
        >
          수정하기
        </Link>
      </div>
    </div>
  );
}

// 여기서 수정하기 버튼 누르면 정보수정으로 이동
