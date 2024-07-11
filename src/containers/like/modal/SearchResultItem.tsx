import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import TextButton from "@/components/Button/TextButton";
import { TStockType } from "@/types/stockType";
import { TWatchList } from "@/types/userStockType";
import { useWatchListStore } from "@/stores/watchListStore";
import useUserStore from "@/stores/useUserStore";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import StockIcon from "@/components/StockIcon/StockIcon";

type TSearchResultItemProps = TStockType & {
  inWatchList?: boolean;
};

// 관심종목 추가/삭제 PATCH API
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const patchUserWatchList = async (userUID: string, watchList: TWatchList[]) => {
  try {
    await fetch(`${baseUrl}/api/userStock/${userUID}/watchList`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watchList: watchList }), // 데이터를 JSON 문자열로 변환하여 전송
    });
  } catch (error) {
    console.log("error : ", error);
  }
};

export default function SearchResultItem(props: TSearchResultItemProps) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    inWatchList,
  } = props;
  // i18n
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");

  const [isFavoriteStock, setFavoriteStock] = useState(inWatchList);
  // session storage 에서 user UID 값을 조회
  const userUID = useUserStore((state) => state.userInfo?.uid) || "";
  // 관심 주식 리스트 조회
  const { watchList, setWatchList } = useWatchListStore();

  // 버튼 클릭
  const toggleFavoriteStock = async () => {
    if (isFavoriteStock) {
      // 삭제 로직
      const newList = watchList.filter(
        (item) => item.symbolCode !== symbolCode,
      );

      if (newList.length <= 0) {
        alert("관심종목은 최소 1개 이상 설정되어야 합니다.");
      } else {
        setWatchList([...newList]);
        await patchUserWatchList(userUID, [...newList]);
        setFavoriteStock((prev) => !prev);
      }
    } else {
      // 추가 로직
      const newList = [
        { symbolCode: symbolCode, timestamp: Timestamp.fromDate(new Date()) },
        ...watchList,
      ];

      setWatchList([...newList]);
      await patchUserWatchList(userUID, [...newList]);
      setFavoriteStock((prev) => !prev);
    }
  };

  //---
  const getStyleOfPrice = () => {
    if (parseFloat(fluctuationsRatio) > 0) {
      return (
        <p className="text-warning-100 text-sm">
          <span className="ml-2">▲ {compareToPreviousClosePrice}</span>
          <span className="ml-2">{fluctuationsRatio}%</span>
        </p>
      );
    } else if (parseFloat(fluctuationsRatio) < 0) {
      return (
        <p className="text-blue-600 text-sm">
          <span className="ml-2">
            ▼ {parseFloat(compareToPreviousClosePrice) * -1}
          </span>
          <span className="ml-2">{fluctuationsRatio}%</span>
        </p>
      );
    } else if (parseFloat(fluctuationsRatio) === 0) {
      return (
        <p className="text-grayscale-500 text-sm">
          <span className="ml-2">{compareToPreviousClosePrice}</span>
          <span className="ml-2">{fluctuationsRatio}%</span>
        </p>
      );
    }
  };

  return (
    <>
      <li className="py-2">
        <Link href="#" className="w-full h-12 block">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p>
                <StockIcon symbolCode={symbolCode} width={48} height={48} />
              </p>
              <strong className="ml-4 text-grayscale-900">
                {t(stockName)}
              </strong>
              <span className="text-grayscale-600 before:content-['∙'] before:mx-1">
                {symbolCode}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-between w-[150px]">
                <span className="text-grayscale-900 font-medium">
                  ${closePrice}
                </span>
                {getStyleOfPrice()}
              </div>
              <TextButton
                variant={isFavoriteStock ? "grayscale" : "primary"}
                additionalClass="w-[120px] h-9 text-sm font-medium"
                onClick={toggleFavoriteStock}
              >
                {isFavoriteStock ? "삭제하기" : "추가"}
              </TextButton>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
