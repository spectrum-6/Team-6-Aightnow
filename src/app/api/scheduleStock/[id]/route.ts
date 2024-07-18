// import { firestore } from "@/firebase/firebasedb";
import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc } from "firebase/firestore";

// scheduleStock 컬렉션의 특정 doc을 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const docRef = doc(firestore, "scheduleStock", params.id); // api/scheduleStock/AAPL
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return Response.json(docSnap.data());
  } else {
    console.log("No such document!");
    return null;
  }
}
