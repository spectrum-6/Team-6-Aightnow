import { Timestamp } from "firebase/firestore";

export type TUserStockCollection = {
  recentSearch: string[];
  recentViews: string[];
  watchList: TWatchList[];
};

export type TWatchList = {
  symbolCode: string;
  timestamp: Timestamp;
};

// 추후 삭제
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
