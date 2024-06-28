import { IconApple } from "@/icons";

export default function InterestList() {
  return (
    <li className="flex justify-between items-center h-20">
      <div className="flex gap-4">
        <IconApple width={64} height={64} />
        <div className="flex flex-col justify-center">
          <span className="text-xl font-bold grayscale-900">애플</span>
          <span className="flex text-sm font-regular grayscale-900">AAPL</span>
        </div>
      </div>
      <div className="flex flex-col justify-center ">
        <span className="text-lg grayscale-900 font-meduim self-end ">
          $00.00
        </span>
        <div className="flex gap-2">
          <span className="font-regular text-blue-600">▼1.75</span>
          <span className="font-regular text-blue-600">-0.82%</span>
        </div>
      </div>
    </li>
  );
}
