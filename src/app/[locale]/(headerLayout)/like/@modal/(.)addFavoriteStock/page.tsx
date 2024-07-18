"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import SearchResult from "@/containers/like/modal/SearchResult";
import SearchContainer from "@/containers/like/modal/SearchContainer";
import { IconClose } from "@/icons";
import { TStockType } from "@/types/stockType";

// DB에 저장된 모든 stock 리스트 조회
const getStockListData = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/api/scheduleStock`);

    return await response.json();
  } catch (e) {
    console.log("error : ", e);
  }
};

export default function AddFavoriteStock() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const closeModal = () => {
    router.back();
    setInputValue("");
  };

  const [stockListData, setStockListData] = useState<TStockType[]>([]);

  const getList = async () => {
    const result = await getStockListData();
    if (result) {
      setStockListData(result);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#4C4C4C] bg-opacity-[0.53]"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="w-[794px] h-auto p-10 rounded-[32px] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <h3 className="mb-10 text-navy-900 text-2xl font-bold text-center">
              관심 종목 추가
            </h3>
            <button
              className="w-12 h-12 flex items-center justify-center absolute right-0 -top-2"
              onClick={closeModal}
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
              inputValue={inputValue}
              stockListData={stockListData}
            />
          ) : (
            <SearchContainer />
          )}
        </div>
      </div>
    </>
  );
}
