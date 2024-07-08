import fireStore from "@/firebase/firestore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

// 인기검색어
// searchCount 컬렉션의 모든 데이터를 조회
// count 필드로 정렬하되, 최대 5개만 가져옴
export async function GET(request: Request) {
  const col = collection(fireStore, "searchCount");
  const q = query(
    col,
    // where("count", ">", 0),
    orderBy("count", "desc"),
    limit(5),
  );

  const querySnap = await getDocs(q);
  const data = querySnap.docs.map((doc) => doc.data());

  return Response.json(data);
}
