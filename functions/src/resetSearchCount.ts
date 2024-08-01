import * as functions from "firebase-functions";
import { db } from "./firebaseInit";
import { Timestamp } from "firebase-admin/firestore";

// 매일 00:00 마다 Search Count 컬렉션(인기검색어) 의 count 필드를 0으로 초기화
export const resetCount = functions
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("every day 00:00")
  .timeZone("Asia/Seoul")
  .onRun(async (context) => {
    const searchCountRef = db.collection("searchCount");

    try {
      const snapshot = await searchCountRef.get();
      const batch = db.batch();

      snapshot.forEach((doc) => {
        if (doc.id !== "lastReset") {
          const docRef = searchCountRef.doc(doc.id);
          batch.update(docRef, { count: 0 });
        }
      });

      await batch.commit();

      console.log("인기검색어 : All count fields have been reset to 0");

      // 마지막 초기화 시간을 저장
      await searchCountRef
        .doc("lastReset")
        .set({ lastReset: Timestamp.fromDate(new Date()) });
      console.log("lastReset fields update");
    } catch (error) {
      console.error("Error resetting count fields: ", error);
    }
  });
