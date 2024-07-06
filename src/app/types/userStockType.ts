import { Timestamp } from "firebase/firestore";

export type TWatchList = {
  symbolCode: string;
  timestamp: Timestamp;
};

type temp = {
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  total: {
    stockPrice: string;
    investment: string;
    profitability: string;
    growth: string;
    interest: string;
  };
  openDeletePopup: () => void;
};
