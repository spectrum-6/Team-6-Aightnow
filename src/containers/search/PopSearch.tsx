import { useEffect, useState } from "react";
import PopSrcList from "./PopSrcList";
import { TSearchCountType } from "@/types/stockType";

// 인기검색어 DB 조회
const getTrendingSearchList = async (): Promise<TSearchCountType[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await (await fetch(`${baseUrl}/api/searchCount?limit=10`)).json();
  return res;
};

export default function PopSearch() {
  const [popularSearches, setPopularSearches] = useState<TSearchCountType[]>(
    [],
  );

  useEffect(() => {
    const fetchPopularSearches = async () => {
      const res = await getTrendingSearchList();
      setPopularSearches(res);
    };

    fetchPopularSearches();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <span className="text-navy-900 font-bold text-2xl">인기 검색어</span>
        <span className="text-grayscale-600 font-medium text-sm border-b border-grayscale-600">
          00:00 기준
        </span>
      </div>
      <div className="w-[590px] max-h-64 flex flex-col flex-wrap gap-x-4 p-6 rounded-xl bg-white">
        {popularSearches.length > 0 ? (
          <PopSrcList popularSearches={popularSearches} />
        ) : (
          <>
            {[...Array(7)].map((item, index) => (
              <div key={index} className="flex gap-5 h-10 items-center">
                <span className="text-base font-medium">{index + 1}</span>
                <span className="w-28 h-6 bg-grayscale-200 rounded-2xl animate-pulse"></span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
