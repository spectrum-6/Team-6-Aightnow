// "use client";

import InterestNews from "./InterestNews";
import MainNews from "./MainNews";
import RecentNews from "./RecentNews";

export default function StockNews() {
  return (
    <>
      <div className="flex flex-col justify-start gap-6 w-[1200px]">
        <h4 className="font-bold text-navy-900">스팩님을 위한 주식뉴스</h4>
        <div className="flex gap-5 p-12 rounded-2xl bg-white">
          <div className="flex flex-col gap-12">
            {/* 관심 종목 뉴스 */}
            <InterestNews />
            {/* 주요 뉴스 */}
            <MainNews />
            {/* 최신 뉴스 */}
            <RecentNews />
          </div>
        </div>
      </div>
    </>
  );
}
