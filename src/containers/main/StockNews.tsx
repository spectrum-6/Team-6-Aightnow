import InterestCard from "./InterestCard";
import MainNews from "./MainNews";
import RecentNewsList from "./RecentNewsList";

export default function StockNews() {
  return (
    <>
      <div className="flex flex-col justify-start gap-6 w-[1200px]">
        <h4 className="font-bold text-navy-900">스팩님을 위한 주식뉴스</h4>
        <div className="flex gap-5 p-12 rounded-2xl bg-white">
          <div className="flex flex-col gap-12">
            {/* 관심종목 */}
            <div className="flex flex-col gap-4">
              <span className="text-2xl text-navy-900 font-medium">
                관심 종목
              </span>
              <div className="flex gap-5">
                {/* 관심종목 card */}
                <InterestCard />
                <InterestCard />
                <InterestCard />
              </div>
            </div>
            {/* 주요뉴스 */}
            <div className="flex flex-col gap-4 w-[1105px]">
              <span className="text-2xl text-navy-900 font-medium">
                주요 뉴스
              </span>
              <MainNews />
            </div>
            {/* 최신뉴스 */}
            <div className="flex flex-col gap-4 w-[1105px]">
              <span className="text-2xl text-navy-900 font-medium">
                최신 뉴스
              </span>
              <div className="flex flex-col border border-primary-100 rounded-lg px-[40.5px]">
                <RecentNewsList />
                <RecentNewsList />
                <RecentNewsList isLast />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
