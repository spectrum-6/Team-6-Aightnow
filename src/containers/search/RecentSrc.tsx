import useUserStore from "@/stores/useUserStore";
import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import RcSrcList from "./RcSrcList";
import { useRouter } from "next/navigation";
import { TRecentSearch } from "@/types/UserInfo";

type TRecentSrcProps = {
  updateRecentSearch: (newRecentSearch: TRecentSearch[]) => Promise<void>;
};

export default function RecentSrc(props: TRecentSrcProps) {
  const { updateRecentSearch } = props;

  const { userInfo } = useUserStore(); // 유저 정보 가져오기
  const recentSearches = userInfo?.userStockCollection?.recentSearch;

  const router = useRouter();

  useEffect(() => {}, []);

  // 개별 검색어 삭제
  const handleDelete = async (searchTerm: string, searchDate: Timestamp) => {
    if (!recentSearches) return;
    const newRecentSearch = recentSearches.filter(
      (item) => item.term !== searchTerm && item.date !== searchDate,
    );

    updateRecentSearch(newRecentSearch);
  };

  // 전체 삭제
  const handleDeleteAll = async () => {
    updateRecentSearch([]);
  };

  // 검색 기록 항목 클릭 시 페이지 이동
  const handleSearchClick = (term: string) => {
    router.push(`/search/searchAf?query=${term}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-navy-900 font-bold text-2xl">최근 검색어</span>
        <span
          className="text-grayscale-600 font-medium border-b border-gray-600 cursor-pointer hover:text-warning-100 hover:border-warning-100"
          onClick={handleDeleteAll}
        >
          전체삭제
        </span>
      </div>
      <div className="flex flex-col bg-white p-6 rounded-xl w-[590px]">
        {recentSearches && recentSearches.length > 0 ? (
          recentSearches
            .slice(0, 10)
            .map((search, index) => (
              <RcSrcList
                key={search.term}
                search={search}
                onDelete={handleDelete}
                onSearchClick={handleSearchClick}
              />
            ))
        ) : (
          <div className="text-grayscale-600">최근 검색어가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
