import { firestore } from "@/firebase/firebasedb";
import { doc, updateDoc } from "firebase/firestore";

// 최근검색어 update
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { recentSearch }: { recentSearch: string[] } = await request.json();

    const docRef = doc(firestore, "userStock", params.id);
    await updateDoc(docRef, {
      recentSearch: recentSearch,
    });

    return new Response("Item removed successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating document: ", error);
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
