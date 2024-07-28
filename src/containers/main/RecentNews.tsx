"use client";

import { fetchLatestNews } from "@/services/news/news";
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
      <div className="flex flex-col border border-navy-100 rounded-lg px-[40.5px]">
        <ul>
          {latestNews && latestNews?.news.length > 0
            ? latestNews?.news
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
            : // Skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <li
                  key={index}
                  className={`border-b border-grayscale-400 ${
                    index === 2 ? "border-b-0" : ""
                  }`}
                >
                  <div className="flex py-[46px] gap-5">
                    <div className="w-[172px] h-[100px] rounded-2xl overflow-hidden relative bg-grayscale-200 animate-pulse"></div>
                    <div className="w-[832px] flex flex-col justify-between gap-4">
                      <div className="flex justify-between">
                        <span className="w-1/2 h-6 bg-grayscale-200 animate-pulse"></span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="w-[70px] h-4 bg-grayscale-200 animate-pulse"></span>
                          <span className="text-grayscale-600 text-sm">•</span>
                          <span className="w-16 h-4 bg-grayscale-200 animate-pulse"></span>
                        </div>
                      </div>
                      <div>
                        <p className="w-full h-5 mb-2 bg-grayscale-200 animate-pulse"></p>
                        <p className="w-full h-5 bg-grayscale-200 animate-pulse"></p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
