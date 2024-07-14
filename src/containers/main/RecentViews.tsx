import IconExclam from "@/icons/IconExclam";
import InterestList from "./InterestList";

export default function RecentViews({ className }: { className?: string }) {
  return (
    <>
      <div className="flex justify-start items-start gap-5">
        {/* 최근조회 */}
        <div className="flex flex-col gap-6">
          <h4 className="font-bold text-navy-900">최근 조회</h4>
          <div className="flex flex-col items-center justify-center w-[590px] h-96 rounded-2xl bg-white p-8 gap-[13px]">
            <IconExclam />
            <span className="text-2xl text-navy-900 font-medium">
              최근 조회한 종목이 없습니다.
            </span>
          </div>
        </div>
        {/* 관심종목 */}
        <div className="flex flex-col gap-6">
          <h4 className="font-bold text-navy-900">관심 종목</h4>
          <div className="flex flex-col items-center w-[590px] h-96 rounded-2xl bg-white p-8 gap-[13px]">
            {/* list */}
            <ul className="flex flex-col w-[494px]">
              <InterestList />
              <InterestList />
              <InterestList />
              <InterestList />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
