import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const docSnap = await getDoc(doc(firestore, "userStock", params.id));

  if (docSnap.exists()) {
    return Response.json(docSnap.data());
  } else {
    console.log("No such document!");
    return null;
  }
}