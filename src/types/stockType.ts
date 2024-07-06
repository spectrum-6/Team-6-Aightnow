import { Firestore } from "firebase/firestore";

export type TStockType = {
  stockName: string;
  symbolCode: string;
  closePrice: string; //종가
  compareToPreviousClosePrice: string; //이전 종가와 비교
  fluctuationsRatio: string; //변동률
};
