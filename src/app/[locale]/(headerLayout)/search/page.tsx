"use client";

import Input from "@/components/Input";
import PopSearch from "@/containers/search/PopSearch";
import RecentSrc from "@/containers/search/RecentSrc";
import { useState, ChangeEvent } from "react";

export default function Search() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center w-full gap-8">
        {/* 검색 */}
        <div className="w-[590px] h-[56px]">
          <Input
            inputValue={inputValue}
            setInputValue={handleInputChange}
            iconType="search"
            iconPosition="left"
            placeholder="종목을 검색해주세요"
          />
        </div>
        {/* 최근검색어 */}
        <RecentSrc />
        {/* 인기 검색어 */}
        <PopSearch />
      </main>
    </>
  );
}
