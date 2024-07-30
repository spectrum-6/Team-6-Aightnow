"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import LatestNewsItem from "./LatestNewsItem";
import { fetchLatestNews, TNewsData } from "@/services/news/news";
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
    // setData((prev) => [...prev, ...news]);
    setData((prev) => {
      // 중복된 항목 제거
      const uniqueNews = [...prev, ...news].filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
      );
      return uniqueNews;
    });
    setLastVisible(newLastVisible);
    setLoading(false);
  };

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

  // 데이터를 날짜와 시간 순으로 정렬
  const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <section className="w-[1200px] pt-12 pb-20 mx-auto">
        <h2 className="mb-6 text-navy-900 text-3xl font-bold">최신 뉴스</h2>
        <ul className="p-12 bg-white text-grayscale-900 rounded-2xl">
          {sortedData.map((item, index) => {
            if (sortedData.length === index + 1) {
              return (
                <LatestNewsItem
                  key={`${item.id}-${index}`} // 고유한 key로 id와 index 결합
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
                  key={`${item.id}-${index}`} // 고유한 key로 id와 index 결합
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
