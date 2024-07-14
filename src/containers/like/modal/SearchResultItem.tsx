import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import TextButton from "@/components/Button/TextButton";
import useUserStore from "@/stores/useUserStore";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import StockIcon from "@/components/StockIcon/StockIcon";
import { UserInfo } from "@/types/UserInfo";
import { updateUserInfo } from "@/firebase/firestore";

type TSearchResultItemProps = {
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  inWatchList?: boolean;
  watchList?: string[];
};

export default function SearchResultItem(props: TSearchResultItemProps) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    inWatchList,
    watchList,
  } = props;

  // i18n
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");

  // 관심종목 여부
  const [isFavoriteStock, setFavoriteStock] = useState(inWatchList);

  const { userInfo, setUserInfo } = useUserStore();

  const updateWatchList = async (updateList: string[]) => {
    if (userInfo && userInfo.uid && userInfo.userStockCollection) {
      const updatedUserInfo: Partial<UserInfo> = {
        ...userInfo,
        userStockCollection: {
          ...userInfo.userStockCollection,
          watchList: updateList,
        },
      };

      // DB 업데이트
      await updateUserInfo(userInfo?.uid, updatedUserInfo);
      // 세션 정보 업데이트
      setUserInfo(updatedUserInfo);
      // 상태 업데이트
      setFavoriteStock((prev) => !prev);
    }
  };

  // 버튼 클릭
  const toggleFavoriteStock = async () => {
    if (watchList) {
      // 관심종목인 경우 삭제
      if (isFavoriteStock) {
        const newList = watchList?.filter(
          (item) => t(item).toLowerCase() !== t(stockName).toLowerCase(),
        );

        if (newList && newList.length <= 0) {
          alert("관심종목은 최소 1개 이상 설정되어야 합니다.");
        } else {
          updateWatchList(newList);
        }
      }
      // 관심종목이 아닌 경우 추가
      else {
        const newList = [stockName, ...watchList];
        updateWatchList(newList);
      }
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