import PopSrcList from "./PopSrcList";

export default function PopSearch() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <span className="text-navy-900 font-bold text-2xl">인기 검색어</span>
        <span className="text-grayscale-600 font-medium text-sm border-b border-grayscale-600">
          00:00 기준
        </span>
      </div>
      <div className="flex p-6 gap-4 rounded-xl bg-white">
        <PopSrcList />
        <PopSrcList />
      </div>
    </div>
  );
}
