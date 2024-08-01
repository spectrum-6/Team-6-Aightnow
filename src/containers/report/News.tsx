"use client";

import { useEffect, useState } from "react";
import { fetchPopularNews } from "@/services/news/news";
import MainNews from "./MainNews";
import OtherNewsList from "./OtherNewsList";

export default function News() {
  const [popularNews, setPopularNews] = useState<any>();

  useEffect(() => {
    const popularNewsData = async () => {
      const data = await fetchPopularNews();
      setPopularNews(data);
    };

    popularNewsData();
  }, []);

  const mainNewsData = popularNews && popularNews[0];
  const otherNewsData = popularNews && popularNews.slice(1);

  return (
    <>
      <div className="flex flex-row gap-5">
        {/* 첫 번째 뉴스 항목 */}
        {popularNews && popularNews?.length > 0 ? (
          <MainNews
            id={mainNewsData?.id}
            title={mainNewsData?.title}
            content={mainNewsData?.content}
            date={mainNewsData?.date}
            company={mainNewsData?.company}
            image={mainNewsData?.image}
          />
        ) : (
          // Skeleton
          <>
            <div className="flex flex-col w-[590px] gap-5">
              <ul className="p-0 m-0 list-none">
                <li className="relative w-[590px] h-[420px] rounded-2xl overflow-hidden bg-grayscale-200 animate-pulse">
                  <div className="absolute bottom-0 w-full p-6">
                    <div className="w-3/4 h-8 bg-grayscale-300 rounded mb-[14px]"></div>
                    <div className="w-full h-4 bg-grayscale-300 rounded mb-2"></div>
                    <div className="w-full h-4 bg-grayscale-300 rounded mb-[14px]"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-4 bg-grayscale-300 rounded"></div>
                      <div className="text-grayscale-300 text-sm font-medium">
                        •
                      </div>
                      <div className="w-24 h-4 bg-grayscale-300 rounded"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
        {/* 나머지 뉴스 항목 */}
        <div className="flex flex-col w-[590px]">
          <ul className="p-0 m-0 list-none">
            {popularNews && popularNews?.length > 0
              ? otherNewsData?.map((item: any, index: number) => (
                  <OtherNewsList
                    key={index}
                    id={item.id}
                    title={item.title}
                    date={item.date}
                    company={item.company}
                    image={item.image}
                  />
                ))
              : // Skeleton
                Array.from({ length: 2 }).map((_, index) => (
                  <li
                    key={index}
                    className="w-[590px] h-[200px] mb-5 rounded-2xl bg-grayscale-200 overflow-hidden relative animate-pulse"
                  >
                    <div className="w-full p-6 absolute bottom-0">
                      <div className="w-3/4 h-7 mb-[14px] bg-grayscale-300 rounded"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-4 bg-grayscale-300 rounded"></div>
                        <div className="text-grayscale-300 text-sm font-medium">
                          •
                        </div>
                        <div className="w-24 h-4 bg-grayscale-300 rounded"></div>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
}
