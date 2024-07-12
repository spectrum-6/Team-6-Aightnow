// "use client";

// import Input from "@/components/Input";
// import News from "@/containers/search/searchAf/News";
// import Stock from "@/containers/search/searchAf/Stock";
// import { ChangeEvent, useState } from "react";

// export default function SearchAf() {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <>
//       <main className="flex flex-col gap-8 items-center justify-center">
//         {/* 검색 */}
//         <div className="w-[590px]">
//           <Input
//             inputValue={inputValue}
//             setInputValue={handleInputChange}
//             iconType="search"
//             iconPosition="left"
//             placeholder="종목을 검색해주세요"
//           />
//         </div>
//         {/* 주식 */}
//         <Stock />
//         {/* 뉴스 */}
//         <News />
//       </main>
//     </>
//   );
// }

"use client";

import Input from "@/components/Input";
import News from "@/containers/search/searchAf/News";
import Stock from "@/containers/search/searchAf/Stock";
import { useRouter, useSearchParams } from "next/navigation"; // useSearchParams import
import { ChangeEvent, useEffect, useState } from "react";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb"; // Firebase 파일 import
import useUserStore from "@/stores/useUserStore"; // 유저 스토어 import
import { useRecentViewStore } from "@/stores/recentSearchStore"; // 최근 조회 종목 스토어 import

export default function SearchAf() {
  const router = useRouter(); // useRouter 훅 사용
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState<string>(query);
  const { user } = useUserStore(); // 유저 정보 가져오기
  const { recentViews, setRecentViews } = useRecentViewStore(); // 최근 조회 종목 스토어 가져오기

  console.log(user);
  useEffect(() => {
    if (query && user) {
      // 입력된 값을 'users' 컬렉션의 'userStockCollection' 맵의 'recentSearch' 배열에 저장
      const userDoc = doc(firestore, "users", user.uid);
      updateDoc(userDoc, {
        "userStockCollection.recentSearch": arrayUnion(query),
      });
    }
  }, [query, user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력된 값을 문자열로 설정
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      const newQuery = inputValue; // 검색어로 사용
      router.push(`/search/results?query=${newQuery}`);
    }
  };

  const handleItemClick = async (itemCode: string) => {
    if (user) {
      // 'searchCount' 컬렉션에 해당 종목 코드의 카운트를 +1
      const countDoc = doc(firestore, "searchCount", itemCode);
      await updateDoc(countDoc, {
        count: increment(1),
      });

      // 'users' 컬렉션의 'userStockCollection' 맵의 'recentView' 배열에 해당 종목 코드를 추가/업데이트
      const userDoc = doc(firestore, "users", user.uid);
      await updateDoc(userDoc, {
        "userStockCollection.recentView": arrayUnion(itemCode),
      });

      // 최근 조회 종목 업데이트
      const newRecentViews = [
        itemCode,
        ...recentViews.filter((code) => code !== itemCode),
      ].slice(0, 10);
      setRecentViews(newRecentViews);
    }

    // 리포트 페이지로 이동
    router.push(`/report/${itemCode}`);
  };

  return (
    <main className="flex flex-col gap-8 items-center justify-center">
      {/* 검색 */}
      <div className="w-[590px]">
        <Input
          inputValue={inputValue}
          setInputValue={handleInputChange}
          iconType="search"
          iconPosition="left"
          placeholder="종목을 검색해주세요"
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>
      {/* 주식 */}
      <p>주식이지롱</p>
      {/* <Stock query={query} onItemClick={handleItemClick} /> */}
      {/* 뉴스 */}
      <p>뉴스지롱</p>
      {/* <News query={query} onItemClick={handleItemClick} /> */}
    </main>
  );
}
