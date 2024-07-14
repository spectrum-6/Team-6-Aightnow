export type TStockType = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: string; //종가
  compareToPreviousClosePrice: string; //이전 종가와 비교
  fluctuationsRatio: string; //변동률
  stockExchangeType: string;
  // stockPrice: ;
};

export type TSearchCountType = {
  stockName: string;
  symbolCode: string;
  count: number;
};
