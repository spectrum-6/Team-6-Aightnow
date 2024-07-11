import { firestore } from "@/firebase/firebasedb";
import { doc, updateDoc } from "firebase/firestore";

// 최근 조회 종목 update
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { recentViews }: { recentViews: string[] } = await request.json();

    const docRef = doc(firestore, "userStock", params.id);
    await updateDoc(docRef, {
      recentViews: recentViews,
    });

    return new Response("Item removed successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating document: ", error);
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
