"use client";

import { useEffect, useState } from "react";
import { TStockType } from "@/types/stockType";
import { useRecentViewStore } from "@/stores/recentSearchStore";
import { useStockStore } from "@/stores/stockStore";
import useUserStore from "@/stores/useUserStore";
import RecentViewList from "./RecentViewList";

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

  const userUID = useUserStore((state) => state.userInfo?.uid) || "";
  const { stockList } = useStockStore();
  const { recentViews, setRecentViews } = useRecentViewStore();

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
    if (recentViews && recentViews.length > 0) {
      const filtered = stockList.filter((item) =>
        recentViews.includes(item.symbolCode),
      );
      setData(filtered);
    }
  }, [recentViews]);

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
          <RecentViewList data={data} />
        </div>
      )}
    </>
  );
}
