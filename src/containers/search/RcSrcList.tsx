import { IconClose, IconTime } from "@/icons";
import { TRecentSearch } from "@/types/UserInfo";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import { Timestamp } from "firebase/firestore";
import { useParams } from "next/navigation";

type TRcSrcListProps = {
  search: TRecentSearch;
  onDelete: (term: string, date: Timestamp) => void;
  onSearchClick: (term: string) => void;
};

export default function RcSrcList({
  search,
  onDelete,
  onSearchClick,
}: TRcSrcListProps) {
  // 날짜를 mm.dd 형식으로 변환하는 함수
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();

    const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
    const localeOpt = locale === "ko" ? "ko-KR" : "en-US";

    const formattedDate = date.toLocaleDateString(localeOpt, {
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className="flex w-[542px] h-[40px] justify-between items-center">
      <div className="flex gap-2 items-center">
        <IconTime />
        <span
          className="font-medium text-grayscale-600 text-base cursor-pointer hover:text-blue-900"
          onClick={() => onSearchClick(search.term)}
        >
          {search.term}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-regular text-sm text-grayscale-400">
          {formatDate(search.date)}
        </span>
        <span
          className="cursor-pointer"
          onClick={() => onDelete(search.term, search.date)}
        >
          <IconClose />
        </span>
      </div>
    </div>
  );
}
