import * as functions from "firebase-functions";

export const simpleSchedule = functions.pubsub
  .schedule("every 1 minutes")
  .timeZone("Asia/Seoul")
  .onRun(async (context) => {
    console.log("====================================");
    console.log("Simple scheduled function triggered.");
    console.log("====================================");
  });
