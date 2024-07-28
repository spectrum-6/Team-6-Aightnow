"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/stores/useUserStore";
import { getPromptData } from "./getPromptData";
import { TStockType } from "@/types/stockType";
import { Badge } from "@/components/Badge";
import Card from "./Card";
import { IconAi } from "@/icons";

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

export default function UserAIReport() {
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
          const promptResult = await getPromptData(
            stocks[item.symbolCode],
            item.symbolCode,
          );
          console.log("!!!", promptResult);
          return promptResult;
        });

        const resolvedResults: any = await Promise.all(promises);
        setPromptResults(resolvedResults);
      }
    };

    fetchData();
  }, [favoriteStock]);

  return (
    <div className="w-[1200px] flex flex-col gap-5">
      <div className="flex gap-4">
        <h4 className="font-bold text-navy-900 leading-9">
          {userInfo?.nickname}님의 AI 리포트
        </h4>
        <Badge variant="navy" icon={<IconAi />} />
      </div>
      <div className="flex gap-5">
        {promptResults.length > 0 && favoriteStock.length > 0
          ? promptResults.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  reutersCode={favoriteStock[index].reutersCode}
                  stockName={favoriteStock[index].stockName}
                  symbolCode={favoriteStock[index].symbolCode}
                  closePrice={favoriteStock[index].closePrice}
                  compareToPreviousClosePrice={
                    favoriteStock[index].compareToPreviousClosePrice
                  }
                  fluctuationsRatio={favoriteStock[index].fluctuationsRatio}
                />
              );
            })
          : watchList?.map((_, index) => {
              return <Card key={index} />;
            })}
      </div>
    </div>
  );
}
