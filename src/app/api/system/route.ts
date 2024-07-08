import fireStore from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

// termsOfUse Doc 조회
export async function GET(request: Request) {
  const docSnap = await getDoc(doc(fireStore, "system", "termsOfUse"));

  if (docSnap.exists()) {
    return Response.json(docSnap.data());
  } else {
    console.log("No such document!");
    return null;
  }
}
