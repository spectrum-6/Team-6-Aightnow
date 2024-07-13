"use client";

import Input from "@/components/Input";
import PopSearch from "@/containers/search/PopSearch";
import RecentSrc from "@/containers/search/RecentSrc";
import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecentSearchStore } from "@/stores/recentSearchStore"; // 최근 검색어 스토어 import
import useUserStore from "@/stores/useUserStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb";

const suggestions = [
  "애플",
  "아마존",
  "구글",
  "마이크로소프트",
  "엔비디아",
  "테슬라",
  "유니티",
]; // 추천 검색어 목록

export default function Search() {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]); // 필터링된 추천 검색어 목록
  const router = useRouter();
  const { user } = useUserStore(); // 유저 정보 가져오기
  const { recentSearch, setRecentSearch } = useRecentSearchStore(); // 최근 검색어 스토어에서 상태 가져오기

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력받은 값을 문자열로 설정
  };

  const handleSearch = async (query: string) => {
    if (query.trim() !== "") {
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

      // 검색 결과 페이지로 이동
      router.push(`/search/searchAf?query=${query}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
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
        {filteredSuggestions.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded mt-2 absolute w-[590px]">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* 최근검색어 */}
      <RecentSrc />
      {/* 인기 검색어 */}
      <PopSearch />
    </main>
  );
}
