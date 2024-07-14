import { firestore } from "@/firebase/firebasedb";
import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

// 계정 삭제
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const withdrawalUserInfo = await request.json();

    // user 컬렉션에서 삭제
    const userDocRef = doc(firestore, "users", params.id);
    await deleteDoc(userDocRef);

    // 탈퇴 정보 저장
    const withdrawalUserDocRef = doc(firestore, "withdrawalUser", params.id);
    await setDoc(withdrawalUserDocRef, {
      ...withdrawalUserInfo,
      deleteAt: Timestamp.fromDate(new Date()),
    });

    return new Response(JSON.stringify({ status: 200 }));
  } catch (error) {
    return new Response(JSON.stringify({ status: 500 }));
  }
}
