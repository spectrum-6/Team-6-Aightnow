import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const reutersCodeList = [
  "AAPL.O",
  "TSLA.O",
  "AMZN.O",
  "MSFT.O",
  "GOOGL.O",
  "U",
  "NVDA.O",
];

// 뉴욕 시간 16시마다 실행되는 스케쥴
export const realtimeApiSchedule = functions.pubsub
  .schedule("every day 16:02")
  .timeZone("America/New_York")
  .onRun(async (context) => {
    try {
      reutersCodeList.map(async (code) => {
        const response = await fetch(
          `https://polling.finance.naver.com/api/realtime/worldstock/stock/${code}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok" + response.statusText);
        }

        const data = await response.json();

        if (!data.datas || !data.datas[0]) {
          throw new Error("Invalid data format received from API");
        }

        const {
          reutersCode,
          stockName,
          symbolCode,
          closePrice,
          compareToPreviousClosePrice,
          fluctuationsRatio,
          stockExchangeType,
        } = data.datas[0];

        // DB 저장
        await db.collection("scheduleStockData").doc(symbolCode).set({
          reutersCode,
          stockName,
          symbolCode,
          closePrice,
          compareToPreviousClosePrice,
          fluctuationsRatio,
          stockExchangeType,
        });

        console.log(
          `schedule collection/${symbolCode} document Successfully written.`,
        );
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  });
