"use client";

import Input from "@/components/Input";
import PopSearch from "@/containers/search/PopSearch";
import RecentSrc from "@/containers/search/RecentSrc";
import { useState, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/useUserStore";
import { Timestamp } from "firebase/firestore";
import { TRecentSearch, UserInfo } from "@/types/UserInfo";
import { updateUserInfo } from "@/firebase/firestore";

const suggestions = [
  "애플",
  "apple",
  "aapl",
  "아마존",
  "amazon",
  "amzn",
  "구글",
  "google",
  "googl",
  "마이크로소프트",
  "microsoft",
  "msft",
  "엔비디아",
  "nvidia",
  "nvda",
  "테슬라",
  "tesla",
  "tsla",
  "유니티",
  "unity",
  "u",
]; // 추천 검색어 목록

export default function Search() {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]); // 필터링된 추천 검색어 목록

  const router = useRouter();

  const { userInfo, setUserInfo } = useUserStore(); // 유저 정보 가져오기

  // userStore 업데이트 및 DB 업데이트 로직 분리
  const updateRecentSearch = async (newRecentSearch: TRecentSearch[]) => {
    if (!userInfo || !userInfo.uid || !userInfo.userStockCollection) {
      throw new Error(`사용자 정보를 찾을 수 없습니다.`);
    }

    // 사용자 정보 업데이트
    const updatedUserInfo: Partial<UserInfo> = {
      ...userInfo,
      userStockCollection: {
        ...userInfo.userStockCollection,
        recentSearch: newRecentSearch,
      },
    };

    // DB 업데이트
    await updateUserInfo(userInfo?.uid, updatedUserInfo);
    // 세션 정보 업데이트
    setUserInfo(updatedUserInfo);
  };

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

  const handleSearch = async (query: string) => {
    // 필요한 user 정보가 없을 경우 에러 처리
    if (!userInfo || !userInfo.uid || !userInfo.userStockCollection) {
      throw new Error(`사용자 정보를 찾을 수 없습니다.`);
    }

    if (query.trim() !== "") {
      const recentSearch = userInfo.userStockCollection.recentSearch;

      // 최근 검색어 업데이트
      const newRecentSearch = [
        {
          term: query,
          date: Timestamp.fromDate(new Date()),
        },
        ...recentSearch.filter((item) => item.term !== query),
      ].slice(0, 10);

      // 압데이트 호출
      updateRecentSearch(newRecentSearch);

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
          setInputValue={(e) => setInputValue(e.target.value)}
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
      <RecentSrc updateRecentSearch={updateRecentSearch} />
      {/* 인기 검색어 */}
      <PopSearch />
    </main>
  );
}
