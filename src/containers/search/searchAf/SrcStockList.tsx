import IconApple from "@/icons/IconApple";
import IconAmazon from "@/icons/IconAmazon";
import IconGoogle from "@/icons/IconGoogle";
import IconMs from "@/icons/IconMs";
import IconNvidia from "@/icons/IconNvidia";
import IconTesla from "@/icons/IconTsla"; // 여기서 IconTesla 임포트
import IconUnity from "@/icons/IconUnity";
import { useParams } from "next/navigation";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";

type TSrcStockListProps = {
  stockName: string;
  stockCode: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
};

const mapStockCodeToIcon = (symbolCode: string) => {
  const mapping: { [key: string]: JSX.Element } = {
    AAPL: <IconApple width={48} height={48} />,
    AMZN: <IconAmazon width={48} height={48} />,
    GOOGL: <IconGoogle width={48} height={48} />,
    MSFT: <IconMs width={48} height={48} />,
    NVDA: <IconNvidia width={48} height={48} />,
    TSLA: <IconTesla width={48} height={48} />,
    U: <IconUnity width={48} height={48} />,
  };
  const icon = mapping[symbolCode];
  console.log(`Rendering icon for ${symbolCode}:`, icon);
  return icon;
};

const changeClassName = (price: number) =>
  price > 0 ? "text-red-500" : price < 0 ? "text-blue-500" : "text-gray-500";

const formatComparePrice = (comparePrice: string) =>
  Number(comparePrice) > 0
    ? `▲${comparePrice}`
    : Number(comparePrice) < 0
    ? `▼${comparePrice.replace("-", "")}`
    : `${comparePrice}`;

const formatRatio = (ratio: string) =>
  Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

export default function SrcStockList({
  stockName,
  stockCode,
  symbolCode,
  closePrice,
  compareToPreviousClosePrice,
  fluctuationsRatio,
}: TSrcStockListProps) {

  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;

  return (
    <Link href={`/${locale}/report/${symbolCode}`}>
    <li className="flex justify-between items-center h-16">
      <div className="flex gap-4">
        {mapStockCodeToIcon(symbolCode)}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold grayscale-900">{stockName}</span>
          <span className="text-sm font-regular grayscale-900">{stockCode}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm grayscale-900 font-medium self-end">${closePrice}</span>
        <div className="flex gap-2">
          <span className={`text-xs ${changeClassName(Number(compareToPreviousClosePrice))}`}>
            {formatComparePrice(compareToPreviousClosePrice)}
          </span>
          <span className={`text-xs ${changeClassName(Number(fluctuationsRatio))}`}>
            {formatRatio(fluctuationsRatio)}%
          </span>
        </div>
      </div>
    </li>
      </Link>
  );
}
