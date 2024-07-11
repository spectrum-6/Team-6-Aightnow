import { firestore } from "@/firebase/firebasedb";
import { collection, getDocs } from "firebase/firestore";

// stocks 컬렉션의 모든 doc을 조회하여 배열로 반환
export async function GET(request: Request) {
  const querySnap = await getDocs(collection(firestore, "stocks"));
  const data = querySnap.docs.map((doc) => doc.data());

  return Response.json(data);
}
