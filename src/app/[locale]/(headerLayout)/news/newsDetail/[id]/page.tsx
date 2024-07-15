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

type NewsData = {
  title: string;
  company: string;
  date: string;
  viewCount: number;
  content: string[];
  image: string;
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
  const [data, setData] = useState<NewsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(firestore, "news", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedData = docSnap.data() as DocumentData;
          const formattedData: NewsData = {
            title: fetchedData.title,
            company: fetchedData.company,
            date: formatDate(fetchedData.date), // 날짜 형식 변환
            viewCount: fetchedData.viewCount,
            content: fetchedData.content,
            image: fetchedData.image,
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
            <RelatedStock />
            <RelatedArticle />
          </aside>
        </section>
      )}
    </>
  );
}
