"use client";

import { useEffect, useState } from "react";
import { fetchPopularNews } from "@/app/api/news/route";
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

  const mainNewsData = popularNews[0];

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
        <></>
      )}
    </div>
  );
}
