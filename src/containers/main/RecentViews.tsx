"use client";

import InterestList from "./InterestList";
import useUserStore from "@/stores/useUserStore";
import IconExclam from "@/icons/IconExclam";
import RecentViewsList from "./RecentViewsList";

export default function RecentViews({ className }: { className?: string }) {
  const { userInfo } = useUserStore();

  const recentViews = userInfo?.userStockCollection?.recentViews;
  const watchList = userInfo?.userStockCollection?.watchList;

  return (
    <>
      <div className="flex justify-start items-start gap-5">
        {/* 최근 조회 */}
        <div className="flex flex-col gap-6">
          <h4 className="font-bold text-navy-900">최근 조회</h4>
          {recentViews?.length !== 0 ? (
            recentViews?.map((item, index) => {
              return (
                <div className="flex flex-col items-center w-[590px] h-96 rounded-2xl bg-white p-8 gap-[13px]">
                  <ul className="flex flex-col w-[494px] overflow-hidden">
                    <RecentViewsList key={index} item={item} />
                  </ul>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center w-[590px] h-96 rounded-2xl bg-white p-8 gap-[13px]">
              <IconExclam />
              <span className="text-2xl text-navy-900 font-medium">
                최근 조회한 종목이 없습니다.
              </span>
            </div>
          )}
        </div>
        {/* 관심 종목 */}
        <div className="flex flex-col gap-6">
          <h4 className="font-bold text-navy-900">관심 종목</h4>
          <div className="flex flex-col items-center w-[590px] h-96 rounded-2xl bg-white p-8 gap-[13px]">
            {/* list */}
            <ul className="flex flex-col w-[494px] overflow-hidden">
              {watchList?.map((item, index) => {
                return <InterestList key={index} item={item} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
