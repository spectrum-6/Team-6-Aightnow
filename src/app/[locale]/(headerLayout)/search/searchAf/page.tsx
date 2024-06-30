"use client";

import ChatBotBtn from "@/components/Chatbot/ChatBotBtn";
import Input from "@/components/Input";
import News from "@/containers/search/searchAf/News";
import Stock from "@/containers/search/searchAf/Stock";
import { ChangeEvent, useState } from "react";

export default function SearchAf() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <main className="flex flex-col gap-8 items-center justify-center">
        {/* 검색 */}
        <div className="w-[590px]">
          <Input
            inputValue={inputValue}
            setInputValue={handleInputChange}
            iconType="search"
            iconPosition="left"
            placeholder="종목을 검색해주세요"
          />
        </div>
        {/* 주식 */}
        <Stock />
        {/* 뉴스 */}
        <News />
      </main>
      <ChatBotBtn />
    </>
  );
}
