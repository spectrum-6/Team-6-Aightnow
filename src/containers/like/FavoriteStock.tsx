"use client";

import FavoriteStockItem from "./FavoriteStockItem";
import { TStockType } from "@/types/stockType";
import { useEffect, useState } from "react";
import useUserStore from "@/stores/useUserStore";
import promptGenerator from "@/libs/prompts/promptGenerator";
import { getStockDataWithSymbolCode } from "@/utils/getStockDataFromDB";
import CardSkeleton from "./CardSkeleton";

type TFavoriteStockType = TStockType & {
  promptResult: any;
};

export default function FavoriteStock() {
  // 세션에 저장된 유저 정보
  const { userInfo } = useUserStore();
  const watchList = userInfo?.userStockCollection?.watchList; //symbolCode List

  const [favoriteStock, setFavoriteStock] = useState<TFavoriteStockType[]>([]);

  useEffect(() => {
    if (!watchList) return;

    const fetchStockData = async () => {
      if (watchList && watchList.length > 0) {
        const promises = watchList.map(async (symbolCode) => {
          // await new Promise((resolve) => setTimeout(resolve, 5000));

          // 관심종목에 저장된 코드로 주식정보를 가져옴
          const resultData = await getStockDataWithSymbolCode(symbolCode);
          // 프롬프트 데이터를 가져옴
          const promptResult = await promptGenerator(
            symbolCode.toLowerCase(),
            symbolCode,
          );

          const result = { ...resultData, promptResult: promptResult };
          return result;
        });

        const resolvedResults: any = await Promise.all(promises);
        setFavoriteStock(resolvedResults);
      }
    };

    fetchStockData();
  }, [watchList]);

  return (
    <>
      <ul className="flex gap-[19px] flex-wrap">
        {favoriteStock.length > 0
          ? favoriteStock.map((item, index) => (
              <FavoriteStockItem
                key={index}
                promptResult={item.promptResult}
                stockName={item.stockName}
                symbolCode={item.symbolCode}
                closePrice={item.closePrice}
                compareToPreviousClosePrice={item.compareToPreviousClosePrice}
                fluctuationsRatio={item.fluctuationsRatio}
              />
            ))
          : watchList?.map((_, index) => <CardSkeleton key={_} />)}
      </ul>
    </>
  );
}
