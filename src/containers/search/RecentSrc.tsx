import RcSrcList from "./RcSrcList";

export default function RecentSrc() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-navy-900 font-bold text-2xl">최근 검색어</span>
        <span className="text-grayscale-600 font-medium border-b border-gray-600">
          전체삭제
        </span>
      </div>
      <div className="flex flex-col bg-white p-6 rounded-xl">
        <RcSrcList />
        <RcSrcList />
        <RcSrcList />
        <RcSrcList />
        <RcSrcList />
      </div>
    </div>
  );
}
