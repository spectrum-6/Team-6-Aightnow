"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import SearchResult from "@/containers/like/modal/SearchResult";
import SearchContainer from "@/containers/like/modal/SearchContainer";
import { IconClose } from "@/icons";

export default function AddFavoriteStock() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [isFavoriteStock, setIsFavoriteStock] = useState<boolean>(false);

  const toggleFavoriteStock = (): void => {
    setIsFavoriteStock((prev) => !prev);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#4C4C4C] bg-opacity-[0.53]"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            router.back();
            setInputValue("");
          }
        }}
      >
        <div className="w-[794px] h-[735px] p-10 rounded-[32px] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <h3 className="mb-10 text-navy-900 text-2xl font-bold text-center">
              관심 종목 추가
            </h3>
            <button
              className="w-12 h-12 flex items-center justify-center absolute right-0 -top-2"
              onClick={() => {
                router.back();
                setInputValue("");
              }}
            >
              <IconClose />
            </button>
          </div>
          <div className="mb-6">
            <Input
              inputValue={inputValue}
              setInputValue={(e) => setInputValue(e.target.value)}
              iconType="search"
              iconPosition="right"
              placeholder="검색어를 입력해주세요."
            />
          </div>
          {inputValue ? (
            <SearchResult
              isFavoriteStock={isFavoriteStock}
              toggleFavoriteStock={toggleFavoriteStock}
            />
          ) : (
            <SearchContainer />
          )}
        </div>
      </div>
    </>
  );
}
