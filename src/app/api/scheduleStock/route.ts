import { firestore } from "@/firebase/firebasedb";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

// scheduleStock 컬렉션의 모든 doc을 조회하여 배열로 반환
export async function GET(request: Request) {
  const querySnap = await getDocs(collection(firestore, "scheduleStockData"));
  const data = querySnap.docs.map((doc) => doc.data());

  return Response.json(data);
}

// scheduleStock 컬렉션의 해당 doc의 stockPrice 필드에 데이터 저장
export async function PATCH(request: Request) {
  try {
    const { stockPriceData, id } = await request.json();

    if (!stockPriceData || !id) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const docRef = doc(firestore, "scheduleStockData", id);
    await updateDoc(docRef, { stockPrice: stockPriceData });

    return new Response(
      JSON.stringify({ message: "Stock price updated successfully" }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Error: ${error.message}` }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
