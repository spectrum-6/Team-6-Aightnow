"use client";

import { useEffect, useState } from "react";
import { TStockType } from "@/types/stockType";
import { useRecentViewStore } from "@/stores/recentSearchStore";
import { useStockStore } from "@/stores/stockStore";
import useUserStore from "@/stores/userStore";
import RecentViewItem from "./RecentViewItem";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const patchRecentViews = async (userUID: string, recentViews: string[]) => {
  try {
    await fetch(`${baseUrl}/api/userStock/${userUID}/recentViews`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recentViews: recentViews }),
    });
  } catch (error) {
    console.log("error : ", error);
  }
};

export default function RecentViews() {
  const [data, setData] = useState<TStockType[]>([]);

  const stockList = useStockStore((state) => state.stockList);
  const recentViewsList = useRecentViewStore((state) => state.recentViews);
  const setRecentViews = useRecentViewStore((state) => state.setRecentViews);

  const userUID = useUserStore((state) => state.user?.userUID) || "";
  // 전체 삭제 버튼 클릭
  const clickDeleteAll = async () => {
    // zustand store 초기화
    setRecentViews([]);
    // state 초기화
    setData([]);

    // patch api call
    await patchRecentViews(userUID, []);
  };

  useEffect(() => {
    if (recentViewsList.length > 0) {
      const filtered = stockList.filter((item) =>
        recentViewsList.includes(item.symbolCode),
      );
      setData(filtered);
    }
  }, [recentViewsList]);

  return (
    <>
      {data.length > 0 && (
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-navy-900 text-lg font-medium">
              최근 검색한 종목
            </h4>
            <button
              className="text-grayscale-600 text-sm font-medium underline underline-offset-4"
              onClick={clickDeleteAll}
            >
              전체삭제
            </button>
          </div>
          <ul className="flex gap-5 overflow-auto scrollbar-hide">
            {data.map((item, index) => (
              <RecentViewItem
                key={index}
                stockName={item.stockName}
                symbolCode={item.symbolCode}
                closePrice={item.closePrice}
                compareToPreviousClosePrice={item.compareToPreviousClosePrice}
                fluctuationsRatio={item.fluctuationsRatio}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
