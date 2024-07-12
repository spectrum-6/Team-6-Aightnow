import { IconClose, IconTime } from "@/icons";

type TRecentSearch = {
  term: string;
  date: string;
};

type TRcSrcListProps = {
  search: TRecentSearch;
  onDelete: (term: string) => void;
  onSearchClick: (term: string) => void;
};

export default function RcSrcList({
  search,
  onDelete,
  onSearchClick,
}: TRcSrcListProps) {
  return (
    <div
      className="flex w-[542px] h-[40px] justify-between items-center"
      onClick={() => onSearchClick(search.term)}
    >
      <div className="flex gap-2 items-center">
        <IconTime />
        <span className="font-medium text-grayscale-600 text-base cursor-pointer">
          {search.term}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-regular text-sm text-grayscale-400">
          {search.date}
        </span>
        <span className="cursor-pointer" onClick={() => onDelete(search.term)}>
          <IconClose />
        </span>
      </div>
    </div>
  );
}

// <span className="font-regular text-sm text-grayscale-400">06.14</span>
// RcSrcList.tsx 컴포넌트에 있는 부분인데 06.14라는 부분에 실제 날짜 데이터를 작성할꺼야. 검색하는 시간 한국시간 기준으로
