// src/containers/news/PopularNews.tsx
"use client";
import { useEffect, useState } from "react";
import MainNews from "@/containers/news/MainNews";
import PopularNewsItem from "@/containers/news/PopularNewsItem";
import { fetchPopularNews, TNewsData } from "@/app/api/news/route";

export default function PopularNews() {
  const [data, setData] = useState<TNewsData[]>([]);

  useEffect(() => {
    const getPopularNews = async () => {
      const news = await fetchPopularNews();
      setData(news);
    };

    getPopularNews();
  }, []);

  const placeholderData: TNewsData = {
    id: "placeholder",
    title: "",
    date: "",
    content: "",
    company: "",
    image: "",
    stock: [],
    stockName: "",
    viewCount: 0,
  };

  const mainNewsData = data[0] || placeholderData;
  const otherNewsData =
    data.slice(1).length > 0
      ? data.slice(1)
      : [placeholderData, placeholderData];

  return (
    <section className="w-[1200px] mx-auto">
      <h2 className="mb-6 text-navy-900 text-3xl font-bold">
        오늘 인기있는 뉴스
      </h2>
      <div className="flex gap-5">
        <MainNews
          key={0}
          id={mainNewsData.id}
          title={mainNewsData.title}
          date={mainNewsData.date}
          content={mainNewsData.content}
          company={mainNewsData.company}
          image={mainNewsData.image}
        />
        <div className="w-[590px] h-[420px] flex flex-col gap-5">
          {otherNewsData.map((item, index) => (
            <PopularNewsItem
              key={index}
              id={item.id}
              title={item.title}
              date={item.date}
              company={item.company}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
