import RadarChart from "@/components/Chart/RadarChart";

export default function CardSkeleton() {
  return (
    <>
      <li className="w-[392px] h-auto p-8 pb-4 rounded-2xl bg-white">
        <div className="animate-pulse">
          <div className="h-16 mb-2">
            <div className="flex gap-2 mb-1">
              <div className="w-8 h-8 bg-grayscale-200 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-48 h-7 bg-grayscale-200 rounded-3xl"></div>
              </div>
            </div>
          </div>

          <div className="flex">
            <RadarChart width={155} height={155} />
            <div className="w-[168px] h-[168px] px-6 py-4 bg-grayscale-200 rounded-3xl"></div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-40 h-14 bg-grayscale-200 rounded-lg"></div>
            <div className="w-40 h-14 bg-grayscale-200 rounded-lg"></div>
          </div>
        </div>
      </li>
    </>
  );
}
