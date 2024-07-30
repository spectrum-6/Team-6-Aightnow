// src/app/[locale]/(headerLayout)/news/newsDetail/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  DocumentData,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import RelatedStock from "@/containers/news/newsDetail/RelatedStock";
import RelatedArticle from "@/containers/news/newsDetail/RelatedArticle";
import Article from "@/containers/news/newsDetail/Article";
import { firestore } from "@/firebase/firebasedb";
import {
  fetchRelatedArticles,
  fetchRelatedStocks,
  TStockData,
  TNewsData as TRelatedNewsData,
} from "@/services/news/news";

type TNewsData = {
  title: string;
  company: string;
  date: string;
  viewCount: number;
  content: string;
  image: string;
  stock: string[];
};

// 날짜 변환
const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function NewsDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<TNewsData | null>(null);
  const [relatedStocks, setRelatedStocks] = useState<TStockData[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<TRelatedNewsData[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(firestore, "scheduleNewsData", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedData = docSnap.data() as DocumentData;
          const formattedData: TNewsData = {
            title: fetchedData.title,
            company: fetchedData.company,
            date: formatDate(fetchedData.date), // 날짜 형식 변환
            viewCount: fetchedData.viewCount,
            content: fetchedData.content,
            image: fetchedData.image,
            stock: fetchedData.stockName,
          };
          setData(formattedData);

          // 조회수 증가
          await updateDoc(docRef, {
            viewCount: fetchedData.viewCount + 1,
          });

          // 상태 업데이트
          setData((prevData) =>
            prevData
              ? { ...prevData, viewCount: prevData.viewCount + 1 }
              : prevData,
          );

          // 관련 주식 데이터 가져오기
          const stocks = await fetchRelatedStocks(fetchedData.stock);
          console.log("stock 데이터:", stocks);
          setRelatedStocks(stocks);

          // 관련 기사 데이터 가져오기
          const articles = await fetchRelatedArticles(fetchedData.stockName);
          setRelatedArticles(articles);
        } else {
          console.log("문서가 없어요🤨");
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {data && (
        <section className="w-[1200px] pb-[72px] mx-auto flex gap-5">
          <h2 className="hidden absolute w-0 h-0 leading-[0] indent-[-9999px]">
            뉴스
          </h2>
          <Article data={data} />
          <aside className="w-[384px]">
            <RelatedStock stocks={relatedStocks} />
            <RelatedArticle articles={relatedArticles} />
          </aside>
        </section>
      )}
    </>
  );
}
