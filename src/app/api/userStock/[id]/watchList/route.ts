import { TWatchList } from "@/types/userStockType";
import { firestore } from "@/firebase/firebasedb";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

// 관심종목 update
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { watchList }: { watchList: TWatchList[] } = await request.json();

    // timestamp를 firestore timestamp 객체로 변환
    watchList.map((item) => {
      const firebaseTimestamp = new Timestamp(
        item.timestamp.seconds,
        item.timestamp.nanoseconds,
      );
      item.timestamp = firebaseTimestamp;
    });

    const docRef = doc(firestore, "userStock", params.id);
    await updateDoc(docRef, {
      watchList: watchList,
    });

    return new Response("Item removed successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating document: ", error);
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}