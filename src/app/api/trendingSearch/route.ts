import fireStore from "@/firebase/firestore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

// 인기검색어
// searchCount 컬렉션의 모든 데이터를 조회
// count 필드로 정렬하되, count가 0이면 제외
export async function GET(request: Request) {
  const col = collection(fireStore, "searchCount");
  const q = query(col, where("count", ">", 0), orderBy("count", "desc"));

  const querySnap = await getDocs(q);
  const data = querySnap.docs.map((doc) => doc.data());

  return Response.json(data);
}
