import Link from "next/link";
import { TStockType } from "@/types/stockType";
import { useParams } from "next/navigation";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import StockIcon from "@/components/StockIcon/StockIcon";

type TRecentViewItemProps = {
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
};

export default function RecentViewItem(props: TRecentViewItemProps) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
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

  const formatRatio = (ratio: string) =>
    Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

  return (
    <>
      <li className="w-auto h-24 border border-navy-100 rounded-2xl flex-shrink-0">
        <Link href="dd" className="w-full h-full px-4 py-6 block">
          <div className="flex justify-between gap-4">
            <div className="flex gap-6">
              <p>
                <StockIcon symbolCode={symbolCode} />
              </p>
              <p>
                <strong className="block">{t(stockName)}</strong>
                <span className="text-sm">{symbolCode}</span>
              </p>
            </div>
            <p className="text-right">
              <strong className="block font-medium">${closePrice}</strong>
              <span
                className={`${changeClassName(
                  Number(fluctuationsRatio),
                )} text-sm`}
              >
                <span className="ml-2">{formatRatio(fluctuationsRatio)}%</span>
              </span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}
