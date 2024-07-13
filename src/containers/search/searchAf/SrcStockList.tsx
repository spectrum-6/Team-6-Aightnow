import { IconApple } from "@/icons";

type TSrcStockListProps = {
  stockName: string;
};

export default function SrcStockList({ stockName }: TSrcStockListProps) {
  return (
    <li className="flex justify-between items-center h-16">
      <div className="flex gap-4">
        <IconApple width={48} height={48} />
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold grayscale-900">{stockName}</span>
          <span className="flex text-sm font-regular grayscale-900">AAPL</span>
        </div>
      </div>
      <div className="flex flex-col justify-center ">
        <span className="text-sm grayscale-900 font-medium self-end ">
          $00.00
        </span>
        <div className="flex gap-2">
          <span className=" text-blue-600 text-xs">▼1.75</span>
          <span className=" text-blue-600 text-xs">-0.82%</span>
        </div>
      </div>
    </li>
  );
}
