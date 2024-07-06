import Link from "next/link";
import { IconApple } from "@/icons";
import { TStockType } from "@/types/stockType";

export default function RecentViewItem(props: TStockType) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = props;

  const getStyleOfPrice = () => {
    if (parseFloat(fluctuationsRatio) > 0) {
      return (
        <p className="text-right">
          <strong className="block font-medium">${closePrice}</strong>
          <span className="text-warning-100 text-sm">
            <span className="ml-2">+{fluctuationsRatio}%</span>
          </span>
        </p>
      );
    } else if (parseFloat(fluctuationsRatio) < 0) {
      return (
        <p className="text-right">
          <strong className="block font-medium">${closePrice}</strong>
          <span className="text-blue-600 text-sm">
            <span className="ml-2">{fluctuationsRatio}%</span>
          </span>
        </p>
      );
    } else if (parseFloat(fluctuationsRatio) === 0) {
      return (
        <p className="text-right">
          <strong className="block font-medium">${closePrice}</strong>
          <span className="text-grayscale-500 text-sm">
            <span className="ml-2">{fluctuationsRatio}%</span>
          </span>
        </p>
      );
    }
  };

  return (
    <>
      <li className="w-[255px] h-24 border border-navy-100 rounded-2xl flex-shrink-0">
        <Link href="dd" className="w-full h-full px-4 py-6 block">
          <div className="flex justify-between">
            <div className="flex gap-6">
              <p>
                <IconApple />
              </p>
              <p>
                <strong className="block">{stockName}</strong>
                <span className="text-sm">{symbolCode}</span>
              </p>
            </div>
            {getStyleOfPrice()}
          </div>
        </Link>
      </li>
    </>
  );
}
