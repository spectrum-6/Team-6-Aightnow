"use client";

import useUserStore from "@/stores/userStore";
import FavoriteStockItem from "./FavoriteStockItem";
import { TStockType } from "@/app/types/stockType";
import { useEffect, useState } from "react";
import { TWatchList } from "@/app/types/userStockType";
import { useWatchListStore } from "@/stores/watchListStore";
import { useStockStore } from "@/stores/stockStore";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 주식 리스트 조회
const getStockList = async (): Promise<TStockType[]> => {
  const res = await (await fetch(`${baseUrl}/api/stocks`)).json();
  return res;
};

// 사용자의 관심종목 리스트 조회
const getUserWatchList = async (userUID: string): Promise<TWatchList[]> => {
  const res = await (await fetch(`${baseUrl}/api/userStock/${userUID}`)).json();
  return res.watchList;
};

export default function FavoriteStock() {
  const [favoriteStock, setFavoriteStock] = useState<TStockType[]>();
  const setWatchList = useWatchListStore((state) => state.setWatchList);
  const setStockList = useStockStore((state) => state.setStockList);

  // session storage 에서 user UID 값을 조회
  const userUID = useUserStore((state) => state.user?.userUID) || "";

  const getDataAndStoreState = async () => {
    // promise.all 로 데이터를 병렬 패칭
    const [stockListData, watchListData] = await Promise.all([
      getStockList(),
      getUserWatchList(userUID),
    ]);

    // zustand store에 관심종목을 저장
    setWatchList(watchListData);
    setStockList(stockListData);
  };

  // zustand 에 저장된 값을 이용해 data filter
  const watchList = useWatchListStore((state) => state.watchList);
  const stockList = useStockStore((state) => state.stockList);

  const getFilterdData = () => {
    const watchListMap = new Map<string, any>();
    watchList.forEach((stock) => {
      watchListMap.set(stock.symbolCode, stock.timestamp);
    });

    //stockList를 필터링하고 timestamp 기준으로 정렬
    const filteredData = stockList
      .filter((stock) => watchListMap.has(stock.symbolCode))
      .sort(
        (a, b) =>
          watchListMap.get(b.symbolCode).seconds -
          watchListMap.get(a.symbolCode).seconds,
      );

    setFavoriteStock(filteredData);
  };

  // 최초 렌더링 시 DB 조회하여 값을 세팅
  useEffect(() => {
    getDataAndStoreState();
  }, []);

  // zustand에 값이 변경되면 zustand에 저장된 값을 기준으로 재렌더링
  useEffect(() => {
    getFilterdData();
  }, [watchList, stockList]);

  return (
    <>
      <ul className="flex gap-[19px] flex-wrap">
        {favoriteStock &&
          favoriteStock.map((item, index) => (
            <FavoriteStockItem
              key={index}
              stockName={item.stockName}
              symbolCode={item.symbolCode}
              closePrice={item.closePrice}
              compareToPreviousClosePrice={item.compareToPreviousClosePrice}
              fluctuationsRatio={item.fluctuationsRatio}
              // total={item.total}
            />
          ))}
      </ul>
    </>
  );
}
