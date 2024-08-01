"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb";
import NewsList from "./NewsList";

type NewsProps = {
  stockCode: string | null;
};

export default function News({ stockCode }: NewsProps) {
  const [newsData, setNewsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      if (stockCode) {
        const q = query(
          collection(firestore, "scheduleNewsData"),
          where("stockName", "array-contains", stockCode)
        );
        const querySnapshot = await getDocs(q);
        const news = querySnapshot.docs.map((doc) => doc.data());
        setNewsData(news);
        console.log("11111",  setNewsData)
        console.log("", news)
      }
    };

    fetchNewsData();
  }, [stockCode]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="text-navy-900 font-bold text-2xl">뉴스</span>
        <span className="text-grayscale-600 font-medium border-b border-gray-600">
        ({newsData.length})
        </span>
      </div>
      <div className="flex flex-col bg-white p-6 rounded-xl  h-[576px] gap-[18px]">
         {/* 뉴스 리스트 */}
         {newsData.map((news, index) => (
          <NewsList key={index} news={news} />
        ))}
        {/* 더보기 */}
        <div className="flex pt-4 px-[10px] w-[542px] h-10 justify-center items-center  border-t border-grayscale-300">
          <span>더보기</span>
        </div>
      </div>
    </div>
  );
}
