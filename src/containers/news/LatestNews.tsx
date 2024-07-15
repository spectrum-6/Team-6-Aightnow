"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import LatestNewsItem from "./LatestNewsItem";
import { fetchLatestNews, TNewsData } from "@/app/api/news/route";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export default function LatestNews() {
  const [data, setData] = useState<TNewsData[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const loader = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    setLoading(true);
    const { news, lastVisible: newLastVisible } = await fetchLatestNews(
      lastVisible,
    );
    setData((prev) => [...prev, ...news]);
    setLastVisible(newLastVisible);
    setLoading(false);
  };

  // useEffect(() => {
  //   const getLatestNews = async () => {
  //     const news = await fetchLatestNews();
  //     setData(news);
  //   };

  // getLatestNews();

  useEffect(() => {
    loadMore();
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastNewsElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  return (
    <>
      <section className="w-[1200px] pt-12 pb-20 mx-auto">
        <h2 className="mb-6 text-navy-900 text-3xl font-bold">최신 뉴스</h2>
        <ul className="p-12 bg-white text-grayscale-900 rounded-2xl">
          {data.map((item, index) => {
            if (data.length === index + 1) {
              return (
                <LatestNewsItem
                  key={index}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  company={item.company}
                  content={item.content}
                  image={item.image}
                  ref={lastNewsElementRef} // 마지막 요소에 ref 추가
                />
              );
            } else {
              return (
                <LatestNewsItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  company={item.company}
                  content={item.content}
                  image={item.image}
                />
              );
            }
          })}
        </ul>
        <div ref={loader}></div>
        {loading}
      </section>
    </>
  );
}
