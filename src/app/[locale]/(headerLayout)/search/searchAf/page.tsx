"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb";
import ChatBotBtn from "@/components/Chatbot/ChatBotBtn";
import Input from "@/components/Input";
import News from "@/containers/search/searchAf/News";
import Stock from "@/containers/search/searchAf/Stock";

// 검색어 매핑 함수
const mapSearchTermToStock = (term: string) => {
  const mapping: { [key: string]: string } = {
    애플: "AAPL",
    apple: "AAPL",
    aapl: "AAPL",
    아마존: "AMZN",
    amazon: "AMZN",
    amzn: "AMZN",
    구글: "GOOGL",
    google: "GOOGL",
    googl: "GOOGL",
    마이크로소프트: "MSFT",
    microsoft: "MSFT",
    msft: "MSFT",
    엔비디아: "NVDA",
    nvidia: "NVDA",
    nvda: "NVDA",
    테슬라: "TSLA",
    tesla: "TSLA",
    tsla: "TSLA",
    유니티: "U",
    unity: "U",
    u: "U",
  };
  return mapping[term] || mapping[term.toLowerCase()] || null;
};

// 가격 변동에 따른 클래스 이름 반환 함수
const changeClassName = (price: number) =>
  price > 0 ? "text-warning-100" : price < 0 ? "text-blue-600" : "text-grayscale-500";

// 비교 가격 포맷팅 함수
const formatComparePrice = (comparePrice: string) =>
  Number(comparePrice) > 0
    ? `▲${comparePrice}`
    : Number(comparePrice) < 0
    ? `▼${comparePrice.replace("-", "")}`
    : `${comparePrice}`;

// 비율 포맷팅 함수
const formatRatio = (ratio: string) =>
  Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

export default function SearchAf() {
  const [inputValue, setInputValue] = useState<string>("");
  const [stockData, setStockData] = useState<any>(null); // 주식 데이터 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태
  const searchParams = useSearchParams(); // URL 쿼리 파라미터 가져오기
  const query = searchParams.get("query"); // 'query' 파라미터 값 가져오기

  useEffect(() => {
    if (query) {
      setInputValue(query); // URL 쿼리 파라미터를 inputValue로 설정
    }
  }, [query]);

  useEffect(() => {
    const fetchStockData = async () => {
      console.log(`Fetching data for: ${inputValue}`); // 로그 추가
      const stockCode = mapSearchTermToStock(inputValue);
      if (stockCode) {
        try {
          const stockDoc = doc(firestore, "scheduleStockData", stockCode);
          const stockSnap = await getDoc(stockDoc);
          if (stockSnap.exists()) {
            const data = stockSnap.data();
            console.log('Stock data:', data); // 로그 추가
            setStockData({
              stockName: inputValue,
              stockCode: data.reutersCode,
              SymbolCode: data.symbolCode,
              closePrice: data.closePrice,
              compareToPreviousClosePrice: data.compareToPreviousClosePrice,
              fluctuationsRatio: data.fluctuationsRatio,
            }); // 주식 데이터 설정
            setErrorMessage(null); // 에러 메시지 초기화
          } else {
            console.log("stocks 컬렉션이 존재하지 않습니다.");
            setStockData(null); // 주식 데이터 초기화
            setErrorMessage("검색어와 일치하는 주식 코드가 없습니다.");
          }
        } catch (error) {
          console.error('Error fetching stock data:', error);
          setErrorMessage("데이터를 불러오는 도중 오류가 발생했습니다.");
        }
      } else {
        console.log("검색어와 일치하는 주식 코드가 없습니다.", inputValue);
        setStockData(null); // 주식 데이터 초기화
        setErrorMessage("검색어와 일치하는 주식 코드가 없습니다.");
      }
    };

    if (inputValue) {
      fetchStockData();
    }
  }, [inputValue]);

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
        {stockData ? (
          <Stock
            stockNames={[
              {
                stockName: stockData.stockName,
                stockCode: stockData.stockCode,
                SymbolCode: stockData.SymbolCode,
                closePrice: stockData.closePrice,
                compareToPreviousClosePrice: stockData.compareToPreviousClosePrice,
                fluctuationsRatio: stockData.fluctuationsRatio,
              },
            ]}
            onItemClick={async (itemCode: string) => {
              console.log(`Item clicked: ${itemCode}`);
            }}
          />
        ) : errorMessage ? (
          <div className="text-red-500">{errorMessage}</div>
        ) : (
          <div className="text-gray-500">검색어를 입력해주세요.</div>
        )}
        {/* 뉴스 */}
        <News stockCode={mapSearchTermToStock(inputValue)} />
      </main>
      <ChatBotBtn />
    </>
  );
}
