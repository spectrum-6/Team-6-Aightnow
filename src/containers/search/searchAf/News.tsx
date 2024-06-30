import NewsList from "./NewsList";

export default function News() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="text-navy-900 font-bold text-2xl">뉴스</span>
        <span className="text-grayscale-600 font-medium border-b border-gray-600">
          (12)
        </span>
      </div>
      <div className="flex flex-col bg-white p-6 rounded-xl  h-[576px] gap-[18px]">
        {/* 리스트 */}
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        <NewsList />
        {/* 더보기 */}
        <div className="flex pt-4 px-[10px] w-[542px] h-10 justify-center items-center  border-t border-grayscale-300">
          <span>더보기</span>
        </div>
      </div>
    </div>
  );
}
