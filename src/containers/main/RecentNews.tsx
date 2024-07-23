"use client";

import { fetchLatestNews } from "@/app/api/news/route";
import { useEffect, useState } from "react";
import RecentNewsList from "./RecentNewsList";

export default function RecentNews() {
  const [latestNews, setLatestNews] = useState<any>();

  useEffect(() => {
    const latestNewsData = async () => {
      const data = await fetchLatestNews();
      setLatestNews(data);
    };

    latestNewsData();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-[1105px]">
      <span className="text-2xl text-navy-900 font-medium">최신 뉴스</span>
      <div className="flex flex-col border border-primary-100 rounded-lg px-[40.5px]">
        {latestNews && latestNews?.news.length > 0 ? (
          latestNews?.news
            .slice(0, 3)
            .map((item: any, index: number) => (
              <RecentNewsList
                key={index}
                id={item.id}
                title={item.title}
                date={item.date}
                company={item.company}
                content={item.content}
                image={item.image}
                isLast={index === latestNews.news.slice(0, 3).length - 1}
              />
            ))
        ) : (
          // Skeleton
          <></>
        )}
      </div>
    </div>
  );
}
