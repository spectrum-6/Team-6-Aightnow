import Link from "next/link";
import { IconApple } from "@/icons";

type TRelatedStockItemProps = {
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

export default function RelatedStockItem(props: TRelatedStockItemProps) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = props;

  return (
    <>
      <li className="mt-5">
        {/* report 페이지로 연결 */}
        <Link href="#" className="w-full h-full block">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <p>
                <IconApple />
              </p>
              <p>
                <strong className="block">{stockName}</strong>
                <span className="text-sm">{symbolCode}</span>
              </p>
            </div>
            <p className="text-right">
              <strong className="block text-sm font-medium">
                ${closePrice}
              </strong>
              <span className="text-blue-600 text-xs">
                <span>{compareToPreviousClosePrice}</span>
                <span className="ml-2">{fluctuationsRatio}%</span>
              </span>
            </p>
          </div>
          <div></div>
        </Link>
      </li>
    </>
  );
}
