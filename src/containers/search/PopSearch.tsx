import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb";
import PopSrcList from "./PopSrcList";

type TPopularSearch = {
  term: string;
  count: number;
};

export default function PopSearch() {
  const [popularSearches, setPopularSearches] = useState<TPopularSearch[]>([]);

  const checkAndResetSearchCounts = async () => {
    const resetDocRef = doc(firestore, "searchCount", "lastReset");
    const resetDoc = await getDoc(resetDocRef);

    let lastResetTime = resetDoc.exists()
      ? resetDoc.data().lastReset.toDate()
      : null;
    const now = new Date();

    if (
      !lastResetTime ||
      now.getDate() !== lastResetTime.getDate() ||
      now.getMonth() !== lastResetTime.getMonth() ||
      now.getFullYear() !== lastResetTime.getFullYear()
    ) {
      // 00:00 기준 초기화 조건을 확인하여 초기화 수행
      const searchCountRef = collection(firestore, "searchCount");
      const snapshot = await getDocs(searchCountRef);
      const batch = writeBatch(firestore);

      snapshot.forEach((doc) => {
        if (doc.id !== "lastReset") {
          batch.update(doc.ref, { count: 0 });
        }
      });

      await batch.commit();

      await setDoc(resetDocRef, { lastReset: new Date() });

      console.log("Search counts reset at 00:00 KST");
    }
  };

  useEffect(() => {
    const fetchPopularSearches = async () => {
      await checkAndResetSearchCounts();

      const q = query(
        collection(firestore, "searchCount"),
        orderBy("count", "desc"),
        limit(10),
      );
      const querySnapshot = await getDocs(q);
      const searches = querySnapshot.docs.map((doc) => ({
        term: doc.id,
        count: doc.data().count,
      }));
      setPopularSearches(searches);
    };

    fetchPopularSearches();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <span className="text-navy-900 font-bold text-2xl">인기 검색어</span>
        <span className="text-grayscale-600 font-medium text-sm border-b border-grayscale-600">
          00:00 기준
        </span>
      </div>
      <div className="flex p-6 gap-4 rounded-xl bg-white">
        <PopSrcList
          popularSearches={popularSearches.slice(0, 5)}
          startIndex={1}
        />
        <PopSrcList
          popularSearches={popularSearches.slice(5, 10)}
          startIndex={6}
        />
      </div>
    </div>
  );
}
