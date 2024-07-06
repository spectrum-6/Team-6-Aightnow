import fireStore from "@/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

// testStocks 컬렉션의 모든 doc을 조회하여 배열로 반환
export async function GET(request: Request) {
  const querySnap = await getDocs(collection(fireStore, "stocks"));
  const data = querySnap.docs.map((doc) => doc.data());

  return Response.json(data);
}
