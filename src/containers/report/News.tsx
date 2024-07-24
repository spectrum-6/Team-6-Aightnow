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
          <></>
        )}
        {/* 나머지 뉴스 항목 */}
        {popularNews && popularNews?.length > 0 ? (
          <div className="flex flex-col w-[590px]">
            <ul className="p-0 m-0 list-none">
              {otherNewsData?.map((item: any, index: number) => (
                <OtherNewsList
                  key={index}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  company={item.company}
                  image={item.image}
                />
              ))}
            </ul>
          </div>
        ) : (
          // Skeleton
          <></>
        )}
      </div>
    </>
  );
}
