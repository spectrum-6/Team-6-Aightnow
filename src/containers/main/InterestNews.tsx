"use client";

import { useEffect, useState } from "react";
import { fetchFavoriteStockNews } from "@/services/news/news";
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
        {displayNewsData && displayNewsData?.length > 0
          ? displayNewsData?.map((item: any, index: number) => {
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
          : // Skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-[355px] h-[100px] border border-navy-100 rounded-lg flex items-center p-4"
              >
                <div className="w-full flex gap-8 animate-pulse">
                  <div className="flex flex-col flex-grow">
                    <div className="w-20 h-4 mb-2 rounded bg-grayscale-200"></div>
                    <div className="w-full h-6 rounded bg-grayscale-200"></div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-grayscale-200 flex-shrink-0"></div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
