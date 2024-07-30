"use client";

import FavoriteStockItem from "./FavoriteStockItem";
import { TStockType } from "@/types/stockType";
import { useEffect, useState } from "react";
import useUserStore from "@/stores/useUserStore";
import promptGenerator from "@/libs/prompts/promptGenerator";

type TStocks = {
  [key: string]: string; // index signature
};

const stocks: TStocks = {
  AAPL: "aapl",
  TSLA: "tsla",
  AMZN: "amzn",
  MSFT: "msft",
  GOOGL: "googl",
  U: "u",
  NVDA: "nvda",
};
// DB에 저장된 stock 조회
const getStockData = async (symbolCode: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/api/scheduleStock/${symbolCode}`);

    return await response.json();
  } catch (e) {
    console.log("error : ", e);
  }
};

export default function FavoriteStock() {
  // 세션에 저장된 유저 정보
  const { userInfo } = useUserStore();
  const watchList = userInfo?.userStockCollection?.watchList; //symbolCode List

  const [favoriteStock, setFavoriteStock] = useState<TStockType[]>([]);

  useEffect(() => {
    let list: TStockType[] = [];
    if (watchList) {
      watchList.map(async (symbolCode) => {
        const result = await getStockData(symbolCode);

        if (result) {
          list.push(result);
        }
        setFavoriteStock([...list]);
      });
    }
  }, [watchList]);

  // 프롬프트 데이터 가져오기
  const [promptResults, setPromptResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        favoriteStock.length > 0 &&
        favoriteStock.length === watchList?.length
      ) {
        const promises = favoriteStock.map(async (item) => {
          const promptResult = await promptGenerator(
            stocks[item.symbolCode],
            item.symbolCode,
          );
          return promptResult;
        });

        const resolvedResults: any = await Promise.all(promises);
        setPromptResults(resolvedResults);
      }
    };

    fetchData();
  }, [favoriteStock]);

  return (
    <>
      <ul className="flex gap-[19px] flex-wrap">
        {favoriteStock &&
          promptResults &&
          favoriteStock.map((item, index) => (
            <FavoriteStockItem
              key={index}
              promptResult={promptResults[index]}
              stockName={item.stockName}
              symbolCode={item.symbolCode}
              closePrice={item.closePrice}
              compareToPreviousClosePrice={item.compareToPreviousClosePrice}
              fluctuationsRatio={item.fluctuationsRatio}
            />
          ))}
      </ul>
    </>
  );
}
