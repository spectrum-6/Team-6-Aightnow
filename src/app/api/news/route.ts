// src/firebase/firestoreQueries.ts
import { firestore } from "@/firebase/firebasedb";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Storage 설정
const storage = getStorage();

export type NewsData = {
  id: string;
  title: string;
  date: string;
  content: string;
  company: string;
  image: string;
  stock: string[];
  stockName: string;
  viewCount: number;
};

const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const getRandomImage = async (): Promise<string> => {
  const listRef = ref(storage, "news_image"); // 스토리지 폴더 경로 설정
  const res = await listAll(listRef);
  const randomIndex = Math.floor(Math.random() * res.items.length);
  const url = await getDownloadURL(res.items[randomIndex]);
  return url;
};

export const fetchPopularNews = async (): Promise<NewsData[]> => {
  const threeDaysAgo = Timestamp.fromDate(
    new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  );
  const newsRef = collection(firestore, "news");
  const q = query(
    newsRef,
    where("date", ">=", threeDaysAgo),
    orderBy("viewCount", "desc"),
    limit(3),
  );

  const querySnapshot = await getDocs(q);
  const popularNews = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        title: data.title,
        date: formatDate(data.date), // 날짜 형식 변환
        content: Array.isArray(data.content)
          ? data.content.join(" ")
          : data.content, // 배열을 문자열로 변환
        company: data.company,
        image: await getRandomImage(), // 랜덤 이미지 선택
        stock: data.stock,
        stockName: data.stockName,
        viewCount: data.viewCount,
      };
    }),
  );
  return popularNews;
};
