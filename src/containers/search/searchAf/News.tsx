"use client";
import { useState, useEffect } from "react";
import NewsList from "./NewsList";

type NewsProps = {
  stockCode: string | null;
};

const getNewsData = async (stockCode: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return await (
    await fetch(`${baseUrl}/api/news/searchNews?stockCode=${stockCode}`)
  ).json();
};

export default function News({ stockCode }: NewsProps) {
  const [newsData, setNewsData] = useState<any[]>([]);

  const [isCollapseOpen, setCollapseOpen] = useState(false);

  useEffect(() => {
    const fetchNewsData = async () => {
      if (stockCode) {
        const news = await getNewsData(stockCode);
        setNewsData(news);
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
      <div
        className={`flex flex-col bg-white p-6 rounded-xl ${
          isCollapseOpen ? "h-auto" : "max-h-[576px]"
        }`}
      >
        {/* 뉴스 리스트 */}
        <div className="flex flex-col gap-[18px] overflow-y-hidden max-h-[calc(100% - 64px)]">
          {newsData.map((news, index) => (
            <NewsList key={index} news={news} />
          ))}
        </div>
        {/* 더보기 */}
        <div
          className="flex pt-4 px-[10px] w-[542px] h-10 justify-center items-center border-t border-grayscale-300 mt-6"
          onClick={() => setCollapseOpen((prev) => !prev)}
        >
          <span>{isCollapseOpen ? "접기" : "더보기"}</span>
        </div>
      </div>
    </div>
  );
}
