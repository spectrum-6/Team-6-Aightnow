import Link from "next/link";
import StockIcon from "@/components/StockIcon/StockIcon";
import { useParams } from "next/navigation";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";

type TRelatedStockItemProps = {
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

// 가격 변동에 따른 클래스 이름 반환 함수
const changeClassName = (price: number) =>
  price > 0
    ? "text-warning-100"
    : price < 0
    ? "text-blue-600"
    : "text-grayscale-500";

// 비교 가격 포맷팅 함수
const formatComparePrice = (comparePrice: string) =>
  Number(comparePrice) > 0
    ? `▲${comparePrice}`
    : Number(comparePrice) < 0
    ? `▼${comparePrice.replace("-", "")}`
    : `${comparePrice}`;

// 비율 포맷팅 함수
const formatRatio = (ratio: string) =>
  Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

export default function RelatedStockItem(props: TRelatedStockItemProps) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = props;

  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;

  return (
    <>
      <li className="mt-5">
        {/* report 페이지로 연결 */}
        <Link href={`/${locale}/report/${symbolCode}`} className="w-full h-full block">
        {/* 연결이 안된다융... */}
          <div className="flex justify-between">
            <div className="flex gap-4">
              <p>
                <StockIcon symbolCode={symbolCode} width={48} height={48} />
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
              <span
                className={`flex gap-2 text-sm ${changeClassName(
                  compareToPreviousClosePrice,
                )}`}
              >
                <span>
                  {formatComparePrice(compareToPreviousClosePrice.toString())}
                </span>
                <span>{formatRatio(fluctuationsRatio.toString())}%</span>
              </span>
            </p>
          </div>
          <div></div>
        </Link>
      </li>
    </>
  );
}
