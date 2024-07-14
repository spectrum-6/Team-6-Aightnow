import { IconApple } from "@/icons";

export default function InterestCard() {
  return (
    <div className="flex border border-primary-100 rounded-lg w-[355px] h-[100px] justify-center items-center ">
      <div className="flex gap-8">
        <div className="flex flex-col">
          <span className="text-sm text-grayscale-400">2024.06.04</span>
          <span className="text-xl text-grayscale-900 font-bold">
            中제외 배터리 시장, 중국업...
          </span>
        </div>
        <IconApple width={48} height={48} />
      </div>
    </div>
  );
}
