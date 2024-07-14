import Link from "next/link";
import { TStockType } from "@/types/stockType";
import { useParams } from "next/navigation";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import StockIcon from "@/components/StockIcon/StockIcon";

export default function RecentViewItem(props: TStockType) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = props;

  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");

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
                <StockIcon symbolCode={symbolCode} />
              </p>
              <p>
                <strong className="block">{t(stockName)}</strong>
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
