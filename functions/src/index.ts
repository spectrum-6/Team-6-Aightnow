import * as functions from "firebase-functions";
import { fetchNewsData, fetchNewsDataSchedule } from "./newsApi";
import { realtimeApiSchedule } from "./realTimeApi";

// 기존 함수
export const getStockDataRealtimeAPI = realtimeApiSchedule;
export const getNewsDataAPI = fetchNewsDataSchedule;

// 테스트 함수 추가
export const testNewsFunction = functions.https.onRequest(async (req, res) => {
  console.log("Test news function triggered");
  try {
    await fetchNewsData(); // 별도의 함수 호출
    res.send("Test news function executed successfully!");
  } catch (error) {
    console.error("Error in testNewsFunction: ", error);
    res.status(500).send("Error executing test news function");
  }
});
