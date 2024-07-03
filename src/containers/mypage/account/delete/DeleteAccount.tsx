"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import Link from "next/link";

export default function DeleteAccount() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const reasons = [
    "이용이 불편하고 장애가 많아서",
    "다른 서비스가 더 좋아서",
    "사용 빈도가 낮아서",
    "콘텐츠 불만",
    "기타",
  ];

  // useEffect(() => {
  //   if (!isOpen) {
  //     router.back();
  //   }
  // }, [isOpen, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    router.replace("/accountCancel");
    setTimeout(() => setIsOpen(false), 0);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="bg-white rounded-[32px] w-[590px] h-[544px] p-10 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">회원 탈퇴</h3>

        <form className="">
          <div className="flex flex-col w-[386px] mb-4">
            <label htmlFor="reason" className="text-base mb-2 text-left">
              회원탈퇴 사유
            </label>
            <Dropdown list={reasons} placeholder="탈퇴사유를 선택해주세요." />
          </div>

          <div className="flex flex-col w-[386px] mb-14">
            <label htmlFor="password" className="text-base mb-1 text-left">
              비밀번호입력
            </label>
            <input
              type="password"
              id="password"
              className="w-full h-[56px] rounded-lg border border-grayscale-300 focus:outline-none px-4"
            />
          </div>

          <Link
            href="/accountCancel"
            className="flex items-center justify-center w-[386px] h-[64px] bg-grayscale-200 hover:bg-navy-700 text-grayscale-300 hover:text-white font-medium py-2 px-6 rounded-lg text-lg mb-2"
            onClick={handleLinkClick}
          >
            회원탈퇴
          </Link>
        </form>
      </div>
    </div>
  );
}
