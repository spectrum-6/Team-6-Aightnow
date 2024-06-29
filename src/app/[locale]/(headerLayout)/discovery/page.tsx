"use client";

import ChatBotBtn from "@/components/Chatbot/ChatBotBtn";
import Input from "@/components/Input";
import { IconClose, IconTime } from "@/icons";
import { useState, ChangeEvent } from "react";

export default function Discovery() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <main className="flex flex-col w-[590px] gap-8">
        {/* 검색 */}
        <div style={{ width: "590px", height: "56px" }}>
          <Input
            inputValue={inputValue}
            setInputValue={handleInputChange}
            iconType="search"
            iconPosition="left"
            placeholder="종목을 검색해주세요"
          />
        </div>
        {/* 최근검색어 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-navy-900 font-bold text-2xl">
              최근 검색어
            </span>
            <span className="text-grayscale-600 font-medium border-b border-gray-600">
              전체삭제
            </span>
          </div>
          <div className="flex flex-col bg-white p-6 rounded-xl">
            <div className="flex w-[542px] h-[40px] justify-between items-center">
              <div className="flex gap-2 items-center">
                <IconTime />
                <span className="font-medium text-grayscale-600 text-base">
                  테슬라
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-regular text-sm text-grayscale-400">
                  06.14
                </span>
                <IconClose />
              </div>
            </div>
            <div className="flex w-[542px] h-[40px] justify-between items-center">
              <div className="flex gap-2 items-center">
                <IconTime />
                <span className="font-medium text-grayscale-600 text-base">
                  테슬라
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-regular text-sm text-grayscale-400">
                  06.14
                </span>
                <IconClose />
              </div>
            </div>
            <div className="flex w-[542px] h-[40px] justify-between items-center">
              <div className="flex gap-2 items-center">
                <IconTime />
                <span className="font-medium text-grayscale-600 text-base">
                  테슬라
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-regular text-sm text-grayscale-400">
                  06.14
                </span>
                <IconClose />
              </div>
            </div>
          </div>
        </div>
        {/* 인기 검색어 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <span className="text-navy-900 font-bold text-2xl">
              인기 검색어
            </span>
            <span className="text-grayscale-600 font-medium text-sm border-b border-grayscale-600">
              00:00 기준
            </span>
          </div>
          <div className="flex p-6 gap-4 rounded-xl bg-white">
            <ul className=" w-[263px]">
              <li className="flex gap-5 h-10 items-center">
                <span className="text-base font-medium">1</span>
                <span className="text-base font-medium text-gray-600">
                  테슬라
                </span>
              </li>
            </ul>
            <ul className=" w-[263px]">
              <li className="flex gap-5 h-10 items-center">
                <span className="text-base font-medium">1</span>
                <span className="text-base font-medium text-gray-600">
                  테슬라
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <ChatBotBtn />
    </>
  );
}
