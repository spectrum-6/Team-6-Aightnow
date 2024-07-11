"use client";

import FavoriteStockItem from "./FavoriteStockItem";
import { TStockType } from "@/types/stockType";
import { useEffect, useState } from "react";
import { useWatchListStore } from "@/stores/watchListStore";
import { useStockStore } from "@/stores/stockStore";
import { TWatchList } from "@/types/userStockType";

export default function FavoriteStock() {
  const [favoriteStock, setFavoriteStock] = useState<TStockType[]>();

  // zustand 에 저장된 값을 이용해 data filter
  const { stockList } = useStockStore();
  const { watchList } = useWatchListStore();

  const getFilterdData = (stockList: TStockType[], watchList: TWatchList[]) => {
    const filteredData = watchList
      .map((item) => {
        const matchedItem = stockList.find(
          (stock) => stock.symbolCode === item.symbolCode,
        );
        return matchedItem ? matchedItem : null;
      })
      .filter((item) => item !== null);

    setFavoriteStock(filteredData);
  };

  // zustand에 값이 변경되면 zustand에 저장된 값을 기준으로 재렌더링
  useEffect(() => {
    getFilterdData(stockList, watchList);
  }, [stockList, watchList]);

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
            />
          ))}
      </ul>
    </>
  );
}
