import { IconApple } from "@/icons";
import RaderChart from "@/components/Chart/RadarChart";
import TextButton from "@/components/Button/TextButton";

type TFavoriteStockItemProps = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
  total: {
    stockPrice: string;
    investment: string;
    profitability: string;
    growth: string;
    interest: string;
  };
  openDeletePopup: () => void;
};

export default function FavoriteStockItem(props: TFavoriteStockItemProps) {
  const { title, enTitle, price, value, rate, total, openDeletePopup } = props;

  return (
    <>
      <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
        <div>
          <div className="flex gap-2">
            <p>
              <IconApple width={32} height={32} />
            </p>
            <p className="flex items-center gap-2">
              <strong className="block text-grayscale-900 text-2xl font-bold">
                {title}
              </strong>
              <span className="text-grayscale-600 text-lg">{enTitle}</span>
            </p>
          </div>
          <p>
            <span className="text-grayscale-900">${price}</span>
            <span className="ml-2 text-warning-100">▲{value}</span>
            <span className="ml-2 text-warning-100">+{rate}</span>
          </p>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <RaderChart width={136} height={136} />
          <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
            <li className="flex justify-between">
              주가
              <span className="text-blue-600">▲{total.stockPrice}%</span>
            </li>
            <li className="flex justify-between">
              투자지수
              <span className="text-warning-100">▲{total.investment}%</span>
            </li>
            <li className="flex justify-between">
              수익성
              <span className="text-warning-100">▲{total.profitability}%</span>
            </li>
            <li className="flex justify-between">
              성장성
              <span className="text-warning-100">▲{total.growth}%</span>
            </li>
            <li className="flex justify-between">
              관심도
              <span className="text-warning-100">▲{total.interest}%</span>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <TextButton
            variant="grayscale"
            additionalClass="w-40 h-14"
            onClick={openDeletePopup}
          >
            삭제하기
          </TextButton>
          <TextButton variant="primary" additionalClass="w-40 h-14">
            자세히 보기
          </TextButton>
        </div>
      </li>
    </>
  );
}
