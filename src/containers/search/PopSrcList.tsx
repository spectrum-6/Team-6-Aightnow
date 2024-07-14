type TPopularSearch = {
  term: string;
  count: number;
};

type TPopSrcListProps = {
  popularSearches: TPopularSearch[];
  startIndex: number; // 시작 인덱스
};

export default function PopSrcList({
  popularSearches,
  startIndex,
}: TPopSrcListProps) {
  return (
    <ul className=" w-[263px]">
      {popularSearches.map((search, index) => (
        <li key={index} className="flex gap-5 h-10 items-center">
          <span className="text-base font-medium">{startIndex + index}</span>
          <span className="text-base font-medium text-gray-600">
            {search.term}
          </span>
        </li>
      ))}
    </ul>
  );
}
