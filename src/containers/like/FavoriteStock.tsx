"use client";

import FavoriteStockItem from "./FavoriteStockItem";
import { TStockType } from "@/types/stockType";
import { useEffect, useState } from "react";
import { useStockStore } from "@/stores/stockStore";
import { UserInfo } from "@/types/UserInfo";
import { useTranslation } from "@/utils/localization/client";

export default function FavoriteStock({ userInfo }: { userInfo: UserInfo }) {
  const [favoriteStock, setFavoriteStock] = useState<TStockType[]>();

  // filter를 위해 stock name을 영어로 변환
  const { t } = useTranslation("en", "stock");

  // zustand 에 저장된 값을 이용해 data filter
  const { stockList } = useStockStore();
  const watchList = userInfo.userStockCollection?.watchList;

  const getFilterdData = (stockList: TStockType[], watchList: string[]) => {
    const filteredData = watchList
      .map((item) => {
        const matchedItem = stockList.find(
          (stock) => t(stock.stockName).toLowerCase() === t(item).toLowerCase(),
        );
        return matchedItem ? matchedItem : null;
      })
      .filter((item) => item !== null);

    setFavoriteStock(filteredData);
  };

  // // zustand에 값이 변경되면 zustand에 저장된 값을 기준으로 재렌더링
  useEffect(() => {
    if (stockList.length > 0 && watchList && watchList.length > 0) {
      getFilterdData(stockList, watchList);
    }
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
