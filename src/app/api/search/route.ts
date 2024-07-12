// // import { firestore } from "@/firebase/firebasedb";
// // import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// // export const fetchSuggestions = async (input: string) => {
// //   if (input.length === 0) return [];
// //   const q = query(
// //     collection(firestore, "searchStock"),
// //     where("korean", ">=", input),
// //     where("korean", "<=", input + "\uf8ff"),
// //   );
// //   const querySnapshot = await getDocs(q);
// //   return querySnapshot.docs.map((doc) => doc.data().korean);
// // };

// // export const saveSearchToFirestore = async (search: string) => {
// //   try {
// //     const searchRef = collection(firestore, "recentSearches");
// //     await addDoc(searchRef, {
// //       search,
// //       timestamp: new Date().toISOString(),
// //     });
// //   } catch (error) {
// //     console.error("Error saving search:", error);
// //   }
// // };

// // export const fetchRecentSearchesFromFirestore = async () => {
// //   try {
// //     const searchRef = collection(firestore, "recentSearches");
// //     const querySnapshot = await getDocs(searchRef);
// //     const searches = querySnapshot.docs.map((doc) => doc.data().search);
// //     return searches.slice(0, 10);
// //   } catch (error) {
// //     console.error("Error fetching recent searches:", error);
// //     return [];
// //   }
// // };

// // firebase/firebaseQueries.ts
// import { firestore } from "@/firebase/firebasedb";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// /**
//  * 사용자가 입력한 텍스트에 맞는 자동 완성 제안을 반환하는 함수
//  * @param input 사용자 입력 텍스트
//  * @returns 매칭된 자동 완성 제안 배열
//  */
// export const fetchSuggestions = async (input: string) => {
//   if (input.length === 0) return [];

//   const q = query(
//     collection(firestore, "searchStock"),
//     where("korean", ">=", input),
//     where("korean", "<=", input + "\uf8ff"),
//   );
//   const querySnapshot = await getDocs(q);

//   // 매칭된 결과를 배열로 반환
//   return querySnapshot.docs.flatMap((doc) =>
//     doc.data().korean.filter((item: string) => item.startsWith(input)),
//   );
// };

// /**
//  * 최근 검색어를 Firestore에 저장하는 함수
//  * @param search 검색어
//  */
// export const saveSearchToFirestore = async (search: string) => {
//   try {
//     const searchRef = collection(firestore, "recentSearches");
//     await addDoc(searchRef, {
//       search,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("검색어 저장 중 오류가 발생했습니다:", error);
//   }
// };

// /**
//  * Firestore에서 최근 검색어를 가져오는 함수
//  * @returns 최근 검색어 배열 (최대 10개)
//  */
// export const fetchRecentSearchesFromFirestore = async () => {
//   try {
//     const searchRef = collection(firestore, "recentSearches");
//     const querySnapshot = await getDocs(searchRef);
//     const searches = querySnapshot.docs.map((doc) => doc.data().search);
//     return searches.slice(0, 10);
//   } catch (error) {
//     console.error("최근 검색어를 가져오는 중 오류가 발생했습니다:", error);
//     return [];
//   }
// };
