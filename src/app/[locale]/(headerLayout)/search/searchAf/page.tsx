"use client";

import Input from "@/components/Input";
import News from "@/containers/search/searchAf/News";
import Stock from "@/containers/search/searchAf/Stock";
import { useRouter, useSearchParams } from "next/navigation"; // useSearchParams import
import { ChangeEvent, useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb"; // Firebase 파일 import
import useUserStore from "@/stores/useUserStore"; // 유저 스토어 import
import { useRecentViewStore } from "@/stores/recentSearchStore"; // 최근 조회 종목 스토어 import

// 검색어 매핑 함수
const mapSearchTermToStock = (term: string) => {
  const mapping: { [key: string]: string } = {
    애플: "AAPL",
    Apple: "AAPL",
    AAPL: "AAPL",
    아마존: "AMZN",
    AMZN: "AMZN",
    구글: "GOOGL",
    GOOGL: "GOOGL",
    마이크로소프트: "MSFT",
    Microsoft: "MSFT",
    MSFT: "MSFT",
    엔비디아: "NVDA",
    Nvidia: "NVDA",
    NVDA: "NVDA",
    테슬라: "TSLA",
    Tesla: "TSLA",
    TSLA: "TSLA",
    유니티: "U",
    Unity: "U",
    U: "U",
  };
  return mapping[term.toLowerCase()] || null;
};

export default function SearchAf() {
  const router = useRouter(); // useRouter 훅 사용
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState<string>(query);
  const [stockName, setStockName] = useState<string | null>(null); // 주식 이름 상태
  const { user } = useUserStore(); // 유저 정보 가져오기
  const { recentViews, setRecentViews } = useRecentViewStore(); // 최근 조회 종목 스토어 가져오기

  useEffect(() => {
    const fetchStockData = async (stockCode: string) => {
      const stockDoc = doc(firestore, "stocks", stockCode);
      const stockSnap = await getDoc(stockDoc);
      if (stockSnap.exists()) {
        setStockName(stockSnap.data().stockName); // 주식 이름 설정
        console.log(
          "stocks 컬렉션에서 가져온 데이터",
          stockSnap.data().stockName,
        );
      } else {
        console.log("stocks 컬렉션이 존재하지 않습니다.");
      }
    };

    if (query && user) {
      const stockCode = mapSearchTermToStock(query); // 검색어를 매핑하여 주식 코드 가져오기
      if (stockCode) {
        fetchStockData(stockCode);
      } else {
        console.log("검색어와 일치하는 주식 코드가 없습니다.", query);
      }
    }
  }, [query, user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력된 값을 문자열로 설정
  };

  const handleItemClick = async (itemCode: string) => {
    if (user) {
      // 'searchCount' 컬렉션에 해당 종목 코드의 카운트를 +1
      const countDoc = doc(firestore, "searchCount", itemCode);
      await updateDoc(countDoc, {
        count: increment(1),
      });

      // 'users' 컬렉션의 'userStockCollection' 맵의 'recentView' 배열에 해당 종목 코드를 추가/업데이트
      const userDoc = doc(firestore, "users", user.uid);
      await updateDoc(userDoc, {
        "userStockCollection.recentView": arrayUnion(itemCode),
      });

      // 최근 조회 종목 업데이트
      const newRecentViews = [
        itemCode,
        ...recentViews.filter((code) => code !== itemCode),
      ].slice(0, 10);
      setRecentViews(newRecentViews);
    }

    // 리포트 페이지로 이동
    router.push(`/report/${itemCode}`);
  };

  return (
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
      {/* <Stock query={query} onItemClick={handleItemClick} /> */}
      {stockName && (
        <Stock stockName={stockName} onItemClick={handleItemClick} />
      )}
      {/* 뉴스 */}
      <p>뉴스지롱</p>
      {/* <News query={query} onItemClick={handleItemClick} /> */}
    </main>
  );
}
