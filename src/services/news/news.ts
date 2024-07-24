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
  startAfter,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Storage 설정
const storage = getStorage();

export type TNewsData = {
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

export type TStockData = {
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
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

export const fetchPopularNews = async (): Promise<TNewsData[]> => {
  const threeDaysAgo = Timestamp.fromDate(
    new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  );
  const newsRef = collection(firestore, "new3");
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
          : data.content, // content 처리 수정
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

// 관심종목 뉴스를 가져오기
export const fetchFavoriteStockNews = async (
  interests: string[],
): Promise<TNewsData[]> => {
  const newsRef = collection(firestore, "new3");
  const q = query(
    newsRef,
    where("stockName", "in", interests),
    orderBy("date", "desc"),
    limit(5),
  );

  const querySnapshot = await getDocs(q);
  const favoriteStockNews = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        title: data.title,
        date: data.date.toDate().toISOString(),
        content: Array.isArray(data.content)
          ? data.content.join(" ")
          : data.content,
        company: data.company,
        image: await getRandomImage(),
        stock: data.stock,
        stockName: data.stockName,
        viewCount: data.viewCount,
      };
    }),
  );
  return favoriteStockNews;
};

export const fetchLatestNews = async (
  lastVisible: any = null,
): Promise<{ news: TNewsData[]; lastVisible: any }> => {
  const newsRef = collection(firestore, "new3");
  let q = query(newsRef, orderBy("date", "desc"), limit(5));

  if (lastVisible) {
    q = query(
      newsRef,
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(5),
    );
  }

  const querySnapshot = await getDocs(q);
  const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  const latestNews = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        title: data.title,
        date: data.date.toDate().toISOString(),
        content: Array.isArray(data.content)
          ? data.content.join(" ")
          : data.content,
        company: data.company,
        image: await getRandomImage(),
        stock: data.stock,
        stockName: data.stockName,
        viewCount: data.viewCount,
      };
    }),
  );
  return { news: latestNews, lastVisible: lastVisibleDoc };
};

// 뉴스 디테일 페이지의 관심 종목 가져오기
export const fetchRelatedStocks = async (
  stockIds: string[],
): Promise<TStockData[]> => {
  const relatedStocks: TStockData[] = [];

  for (const stockId of stockIds) {
    const stockDocRef = doc(firestore, "stocks", stockId);
    const stockDocSnap = await getDoc(stockDocRef);
    if (stockDocSnap.exists()) {
      const data = stockDocSnap.data() as DocumentData;
      relatedStocks.push({
        stockName: data.stockName,
        symbolCode: data.symbolCode,
        closePrice: data.closePrice,
        compareToPreviousClosePrice: data.compareToPreviousClosePrice,
        fluctuationsRatio: data.fluctuationsRatio,
      });
    } else {
      console.log(`문서가 없습니다: ${stockId}`);
    }
  }
  console.log("stock 데이터:", relatedStocks);

  return relatedStocks;
};

// 뉴스 디테일 페이지의 관련 기사 가져오기
export const fetchRelatedArticles = async (
  stockName: string,
): Promise<TNewsData[]> => {
  const newsRef = collection(firestore, "news");
  const q = query(newsRef, where("stock", "array-contains", stockName));
  const querySnapshot = await getDocs(q);

  const relatedArticles = querySnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      title: data.title,
      date: data.date.toDate().toISOString(),
      company: data.company,
      content: Array.isArray(data.content)
        ? data.content.join(" ")
        : data.content,
      image: data.image,
      stock: data.stock,
      stockName: data.stockName,
      viewCount: data.viewCount,
    };
  });

  console.log("Related articles data:", relatedArticles);

  return relatedArticles;
};
