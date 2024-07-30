/**
 * 1. Firestore에서 최근 검색어 가져오기
 * 2. 최근 검색어를 화면에 표시
 * 3. 개별 삭제 및 전체 삭제 기능 구현
 */

import { firestore } from "@/firebase/firebasedb";
import useUserStore from "@/stores/useUserStore";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import RcSrcList from "./RcSrcList";
import { useRouter } from "next/navigation";

type TRecentSearch = {
  term: string;
  date: string;
};

export default function RecentSrc() {
  const { user } = useUserStore(); // 유저 정보 가져오기
  const [recentSearches, setRecentSearches] = useState<TRecentSearch[]>([]);
  const router = useRouter();

  useEffect(() => {
    // firestore에서 최근 검색어 불러오기
    const fetchRecentSearches = async () => {
      if (user) {
        const userDoc = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const recentSearches = data.userStockCollection?.recentSearch || [];
          setRecentSearches(recentSearches.reverse());
        }
      }
    };

    fetchRecentSearches();
  }, [user]);

  const handleDelete = async (searchTerm: string, searchDate: string) => {
    // 개별 검색어 삭제
    if (user) {
      const userDoc = doc(firestore, "users", user.uid);
      const itemToRemove = { term: searchTerm, date: searchDate };
      await updateDoc(userDoc, {
        "userStockCollection.recentSearch": arrayRemove(itemToRemove),
      });
      console.log(searchTerm, searchDate);
      setRecentSearches((prev) =>
        prev.filter(
          (term) => term.term !== searchTerm || term.date !== searchDate,
        ),
      );
    }
  };

  const handleDeleteAll = async () => {
    // 전체 검색어 삭제
    if (user) {
      const userDoc = doc(firestore, "users", user.uid);
      await updateDoc(userDoc, {
        "userStockCollection.recentSearch": [],
      });
      setRecentSearches([]);
    }
  };

  const handleSearchClick = (term: string) => {
    // 검색 기록 항목 클릭 시 페이지 이동
    router.push(`/search/searchAf`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-navy-900 font-bold text-2xl">최근 검색어</span>
        <span
          className="text-grayscale-600 font-medium border-b border-gray-600 cursor-pointer hover:text-warning-100"
          onClick={handleDeleteAll}
        >
          전체삭제
        </span>
      </div>
      <div className="flex flex-col bg-white p-6 rounded-xl w-[590px]">
        {recentSearches.length > 0 ? (
          recentSearches
            .slice(0, 10)
            .map((search) => (
              <RcSrcList
                key={search.term}
                search={search}
                onDelete={() => handleDelete(search.term, search.date)}
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
