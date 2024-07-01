import SrcStockList from "./SrcStockList";

export default function Stock() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className="text-navy-900 font-bold text-2xl">주식</span>
          <span className="text-grayscale-600 font-medium border-b border-gray-600">
            (12)
          </span>
        </div>
        <div className="flex flex-col bg-white p-6 rounded-xl h-[314px] gap-[18px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-4">
              <div className=" flex flex-col gap-2 w-[263px] h-[208px">
                {/* 아이템 */}
                <SrcStockList />
                <SrcStockList />
                <SrcStockList />
              </div>
              <div className="flex flex-col gap-2 w-[263px] h-[208px]">
                <SrcStockList />
                <SrcStockList />
                <SrcStockList />
              </div>
            </div>
          </div>
          <div className="flex pt-4 px-[10px] w-[542px] h-10 justify-center items-center  border-t border-grayscale-300">
            <span>더보기</span>
          </div>
        </div>
      </div>
    </>
  );
}
