export default function RecentViews({ className }: { className?: string }) {
  return (
    <>
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-5">
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-6">
          <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-[590px] relative">
            <p className="flex-grow-0 flex-shrink-0 text-3xl font-bold text-left text-[#18254c]">
              최근 조회
            </p>
            <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 relative">
              <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[590px] h-96 px-12 py-8 rounded-2xl bg-white" />
        </div>
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-6">
          <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-[590px] relative">
            <p className="flex-grow-0 flex-shrink-0 text-3xl font-bold text-left text-[#18254c]">
              관심 종목
            </p>
            <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 relative">
              <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative overflow-hidden" />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 px-12 py-8 rounded-2xl bg-white">
            <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[494px] h-80 gap-4" />
          </div>
        </div>
      </div>
    </>
  );
}
