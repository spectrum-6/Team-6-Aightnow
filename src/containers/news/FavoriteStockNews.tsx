/**
 * 1. users 컬렉션의 interests 배열과 news 컬렉션의 stockName을 비교하여 관련 뉴스를 가져온다.
 */
"use client";
import { useEffect, useState } from "react";
import FavoriteStockNewsItem from "./FavoriteStockNewsItem";
import { fetchFavoriteStockNews, TNewsData } from "@/services/news/news";
import useUserStore from "@/stores/useUserStore";

export default function FavoriteStockNews() {
  const [data, setData] = useState<TNewsData[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const userInfo = useUserStore((state) => state.userInfo);

  // 사용자 정보가 로드되었을 때 관심 종목을 설정
  useEffect(() => {
    console.log("현재 시간:", new Date());
    if (userInfo) {
      // 임시로 관심 종목을 설정 (실제 구현 시에는 userInfo.interests를 사용)
      setInterests(["AAPL", "TSLA"]);
    }
  }, [userInfo]);

  // 관심 종목을 기반으로 뉴스를 가져오기
  useEffect(() => {
    // 관심 종목이 설정되어 있을 경우
    const getFavoriteStockNews = async () => {
      if (interests.length > 0) {
        // 관심 종목 관련 뉴스를 가져와서 상태를 업데이트
        const news = await fetchFavoriteStockNews(interests);
        setData(news);
      }
    };

    getFavoriteStockNews();
  }, [interests]);

  const displayData = data.slice(0, 3);

  return (
    <>
      <section className="w-[1200px] pt-12 mx-auto">
        <h2 className="mb-6 text-navy-900 text-3xl font-bold">
          관심종목과 관련된 뉴스
        </h2>
        <ul className="flex gap-5">
          {displayData.map((item, index) => (
            <FavoriteStockNewsItem
              key={index}
              id={item.id}
              title={item.title}
              date={item.date}
              company={item.company}
              image={item.image}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
