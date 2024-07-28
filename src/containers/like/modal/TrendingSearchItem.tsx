import Link from "next/link";
import { useParams } from "next/navigation";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import StockIcon from "@/components/StockIcon/StockIcon";

type TTrendingSearchItemProps = {
  stockName: string;
  symbolCode: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  index: number;
};

export default function TrendingSearchItem(props: TTrendingSearchItemProps) {
  const {
    stockName,
    symbolCode,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    index,
  } = props;

  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");

  //---
  const changeClassName = (price: number) =>
    price > 0
      ? "text-warning-100"
      : price < 0
      ? "text-blue-600"
      : "text-grayscale-500";

  const formatComparePrice = (comparePrice: string) =>
    Number(comparePrice) > 0
      ? `▲${comparePrice}`
      : Number(comparePrice) < 0
      ? `▼${comparePrice.replace("-", "")}`
      : `${comparePrice}`;

  const formatRatio = (ratio: string) =>
    Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

  return (
    <>
      <li className="h-12 py-2">
        <Link
          href={`/${locale}/report/${symbolCode.toLowerCase()}`}
          className="w-full h-full block"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-navy-900 font-medium">{index + 1}</span>
              <p className="ml-4">
                <StockIcon symbolCode={symbolCode} width={32} height={32} />
              </p>
              <strong className="ml-2 text-grayscale-600 font-medium">
                {t(stockName)}
              </strong>
            </div>
            <p className={changeClassName(Number(compareToPreviousClosePrice))}>
              <span>{formatComparePrice(compareToPreviousClosePrice)}</span>
              <span className="ml-4">{formatRatio(fluctuationsRatio)}%</span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}
