// 동작 테스트 1 코드
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditAccountInfo() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
  }, [isOpen, router]);

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
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.replace("/mypage/usersettings/deleteaccount");
  };

  const handleButtonClick = () => {
    setIsOpen(false);
    router.push("/mypage"); // 'mypage' 경로로 이동
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="bg-white rounded-[32px] w-[590px] h-[892px] p-10 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">정보 수정</h3>

        <form action="" className="mb-14">
          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              아이디
            </label>
            <input
              type="text"
              className="w-[386px] h-[56px] border border-gray-300 rounded-lg px-4 focus:outline-none"
            />
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              새 비밀번호 입력
            </label>
            <input
              type="password"
              placeholder="새로운 비밀번호를 입력해주세요."
              className="w-[386px] h-[56px] border border-gray-300 rounded-lg px-4 mb-1 focus:outline-none"
            />
            <span className="text-grayscale-700 font-medium text-xs self-start">
              * 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합
            </span>
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor="password-confirmation"
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              새 비밀번호 확인
            </label>
            <input
              id="password-confirmation"
              type="password"
              placeholder="새로운 비밀번호를 확인해주세요."
              className="w-[386px] h-[56px] border border-gray-300 rounded-lg px-4 focus:outline-none"
            />
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              휴대폰번호
            </label>
            <input
              type="number"
              className="w-[386px] h-[56px] border border-gray-300 rounded-lg px-4 focus:outline-none"
            />
          </div>

          <div className="w-[386px] mb-4 flex flex-col items-center">
            <label
              htmlFor=""
              className="block text-navy-900 mb-1 .text-base font-medium self-start"
            >
              생년월일
            </label>
            <input
              type="number"
              className="w-[386px] h-[56px] border border-gray-300 rounded-lg px-4 focus:outline-none"
            />
          </div>
        </form>
        <button
          className="flex items-center justify-center w-[386px] h-[64px] bg-grayscale-200 hover:bg-navy-700 text-grayscale-300 hover:text-white font-medium py-2 px-6 rounded-lg text-lg mb-2"
          onClick={handleButtonClick}
        >
          수정하기
        </button>

        <Link
          href="mypage/usersettings/deleteaccount"
          className="text-warning-100 .text-sm underline"
          onClick={handleLinkClick}
        >
          회원탈퇴
        </Link>
      </div>
    </div>
  );
}
