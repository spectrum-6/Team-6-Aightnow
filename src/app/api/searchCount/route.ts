import { firestore } from "@/firebase/firebasedb";
import {
  collection,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// 인기검색어
// searchCount 컬렉션의 모든 데이터를 조회
// count 필드로 정렬하되, 최대 쿼리스트링 limit값 or 5개만 가져옴
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitValue = searchParams.get("limit") || 5;

  const col = collection(firestore, "searchCount");
  const q = query(col, orderBy("count", "desc"), limit(Number(limitValue)));

  const querySnap = await getDocs(q);
  const data = querySnap.docs.map((doc) => doc.data());

  return Response.json(data);
}

// 인기검색어
// searchCount / requst document 명으로 count 수를 +1
export async function POST(request: Request) {
  const { symbolCode } = await request.json();

  const docRef = doc(firestore, "searchCount", symbolCode);
  await updateDoc(docRef, {
    count: increment(1),
  });

  return Response.json({ result: "success" });
}
