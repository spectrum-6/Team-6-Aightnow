import { firestore } from "@/firebase/firebasedb";
import { collection, getDocs, query, where } from "firebase/firestore";

// id 및 nickname 중복 체크
export async function POST(request: Request) {
  const { type, value } = await request.json();

  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where(type, "==", value));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => doc.data());

    // data length를 return
    return new Response(JSON.stringify({ data: data.length, status: 200 }));
  } catch (error) {
    return new Response(JSON.stringify({ status: 500 }));
  }
}
