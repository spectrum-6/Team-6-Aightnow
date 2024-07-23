"use client";

import { useEffect, useState } from "react";
import { fetchFavoriteStockNews } from "@/app/api/news/route";
import InterestCard from "./InterestCard";
import useUserStore from "@/stores/useUserStore";

export default function InterestNews() {
  // 세션에 저장된 유저 정보
  const { userInfo } = useUserStore();
  const watchList = userInfo?.userStockCollection?.watchList;

  // 관심 종목 뉴스
  const [favoriteStockNews, setFavoriteStockNews] = useState<any>();

  useEffect(() => {
    const favoriteStockNewsData = async () => {
      if (watchList) {
        const data = await fetchFavoriteStockNews(watchList);
        setFavoriteStockNews(data);
      }
    };

    favoriteStockNewsData();
  }, []);

  const displayNewsData = favoriteStockNews?.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl text-navy-900 font-medium">관심 종목</span>
      <div className="flex gap-5">
        {/* 관심 종목 card */}
        {displayNewsData && displayNewsData?.length > 0 ? (
          displayNewsData?.map((item: any, index: number) => {
            return (
              <InterestCard
                key={index}
                id={item.id}
                title={item.title}
                date={item.date}
                stockName={item.stockName}
              />
            );
          })
        ) : (
          // Skeleton
          <></>
        )}
      </div>
    </div>
  );
}
