/*
 * 1.
 * 2.
 * 3.
 */
"use client";

import Input from "@/components/Input";
import PopSearch from "@/containers/search/PopSearch";
import RecentSrc from "@/containers/search/RecentSrc";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useRecentSearchStore } from "@/stores/recentSearchStore"; // 최근 검색어 스토어 import
import useUserStore from "@/stores/useUserStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb";

export default function Search() {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const { user } = useUserStore(); // 유저 정보 가져오기
  const { recentSearch, setRecentSearch } = useRecentSearchStore(); // 최근 검색어 스토어에서 상태 가져오기

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력받은 값을 문자열로 설정
  };

  const handleSearch = async () => {
    if (inputValue.trim() !== "") {
      const query = inputValue; // 검색어로 사용
      // 최근 검색어 업데이트
      const newRecentSearch = [
        query,
        ...recentSearch.filter((term) => term !== query),
      ].slice(0, 10);
      setRecentSearch(newRecentSearch);

      // Firestore에 입력된 값 저장
      if (user) {
        const userDoc = doc(firestore, "users", user.uid);
        await updateDoc(userDoc, {
          "userStockCollection.recentSearch": arrayUnion({
            term: query,
            date: new Date().toISOString().split("T")[0], // 날짜만 저장
          }),
        });
      }

      // router.push(`/search/results?query=${query}`);
      router.push(`/search/searchAf`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="flex flex-col justify-center items-center w-full gap-8">
      {/* 검색 */}
      <div className="w-[590px] h-[56px]">
        <Input
          inputValue={inputValue}
          setInputValue={handleInputChange}
          iconType="search"
          iconPosition="left"
          placeholder="종목을 검색해주세요"
          onKeyPress={handleKeyPress}
        />
      </div>
      {/* 최근검색어 */}
      <RecentSrc />
      {/* 인기 검색어 */}
      <PopSearch />
    </main>
  );
}
