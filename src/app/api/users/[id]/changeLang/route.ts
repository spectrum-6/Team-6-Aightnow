import fireStore from "@/firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

// 마이페이지 번역 언어 설정 업데이트
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { transLang }: { transLang: string } = await request.json();

    const docRef = doc(fireStore, "users", params.id);
    await updateDoc(docRef, {
      transLang: transLang,
    });

    return new Response("Item removed successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating document: ", error);
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
