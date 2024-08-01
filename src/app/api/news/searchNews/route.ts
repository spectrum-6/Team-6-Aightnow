import { firestore } from "@/firebase/firebasedb";
import { collection, getDocs, or, query, where } from "firebase/firestore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stockCode = searchParams.get("stockCode");

  console.log(stockCode, "-------------------");

  const q = query(
    collection(firestore, "scheduleNewsData"),
    or(
      where("stockName", "==", stockCode),
      //   where("relatedStocks", "array-contains", stockCode),
    ),
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  // timestamp 객체를 date string으로 변환
  data.map((news) => (news.date = news.date.toDate()));

  return Response.json(data);
}
