"use client";

import { useEffect, useState } from "react";
import { fetchPopularNews } from "@/services/news/news";
import MainNewsItem from "./MainNewsItem";

export default function MainNews() {
  const [popularNews, setPopularNews] = useState<any>();

  useEffect(() => {
    const popularNewsData = async () => {
      const data = await fetchPopularNews();
      setPopularNews(data);
    };

    popularNewsData();
  }, []);

  const mainNewsData = popularNews && popularNews[0];

  return (
    <div className="flex flex-col gap-4 w-[1105px]">
      <span className="text-2xl text-navy-900 font-medium">주요 뉴스</span>
      {popularNews && popularNews?.length > 0 ? (
        <MainNewsItem
          id={mainNewsData.id}
          image={mainNewsData.image}
          title={mainNewsData.title}
          content={mainNewsData.content}
        />
      ) : (
        // Skeleton
        <div className="flex p-12 border border-navy-100 rounded-lg gap-5">
          <div className="w-[338px] h-[240px] bg-grayscale-200 rounded-3xl animate-pulse"></div>
          <div className="w-[667px] h-[240px] flex flex-col">
            <div className="w-3/4 h-8 mb-6 bg-grayscale-200 rounded animate-pulse"></div>
            <div className="space-y-2 py-6 border-t border-grayscale-500">
              <p className="w-full h-5 bg-grayscale-200 rounded animate-pulse"></p>
              <p className="w-full h-5 bg-grayscale-200 rounded animate-pulse"></p>
              <p className="w-full h-5 bg-grayscale-200 rounded animate-pulse"></p>
              <p className="w-full h-5 bg-grayscale-200 rounded animate-pulse"></p>
              <p className="w-full h-5 bg-grayscale-200 rounded animate-pulse"></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
