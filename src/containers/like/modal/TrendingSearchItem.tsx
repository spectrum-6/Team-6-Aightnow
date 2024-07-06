import Link from "next/link";
import { IconApple } from "@/icons";
import { useParams } from "next/navigation";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";

type TTrendingSearchItemProps = {
  stockName: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  index: number;
};

export default function TrendingSearchItem(props: TTrendingSearchItemProps) {
  const { stockName, compareToPreviousClosePrice, fluctuationsRatio, index } =
    props;

  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");

  const getStyleOfPrice = () => {
    if (parseFloat(fluctuationsRatio) > 0) {
      return (
        <p className="text-warning-100">
          <span>▲ {compareToPreviousClosePrice}</span>
          <span className="ml-4">{fluctuationsRatio}%</span>
        </p>
      );
    } else if (parseFloat(fluctuationsRatio) < 0) {
      return (
        <p className="text-blue-600">
          <span>▼ {parseFloat(compareToPreviousClosePrice) * -1}</span>
          <span className="ml-4">{fluctuationsRatio}%</span>
        </p>
      );
    } else if (parseFloat(fluctuationsRatio) === 0) {
      return (
        <p className="text-grayscale-500">
          <span>{compareToPreviousClosePrice}</span>
          <span className="ml-4">{fluctuationsRatio}%</span>
        </p>
      );
    }
  };

  return (
    <>
      <li className="h-12 py-2">
        <Link href="#" className="w-full h-full block">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-navy-900 font-medium">{index + 1}</span>
              <p className="ml-4">
                <IconApple width={32} height={32} />
              </p>
              <strong className="ml-2 text-grayscale-600 font-medium">
                {t(stockName)}
              </strong>
            </div>
            {getStyleOfPrice()}
          </div>
        </Link>
      </li>
    </>
  );
}
