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

// http post 요청 시 실행됨
export const realtimeApiPost = functions.https.onRequest(
  async (request, response) => {
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

        await db.collection("httpPost").doc(symbolCode).set({
          reutersCode,
          stockName,
          symbolCode,
          closePrice,
          compareToPreviousClosePrice,
          fluctuationsRatio,
          stockExchangeType,
        });

        console.log("Document successfully written!");
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  },
);

// 오전 6시마다 실행되는 스케쥴러
export const realtimeApiSchedule = functions.pubsub
  //   .schedule("every day 21:52")
  //   .timeZone("Asia/Seoul")
  .schedule("every 1 minutes")
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

        await db.collection("schedule").doc(symbolCode).set({
          reutersCode,
          stockName,
          symbolCode,
          closePrice,
          compareToPreviousClosePrice,
          fluctuationsRatio,
          stockExchangeType,
        });

        console.log("Document successfully written!");
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });
