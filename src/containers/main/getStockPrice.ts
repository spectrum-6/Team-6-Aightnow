"use server";

import { realtimeApi } from "@/services/report/stockApi";
import { getStockPriceApi } from "@/services/report/stockPriceApi";

export async function getStockPrice() {
  const stockPriceInfo = await getStockPriceApi();
  return stockPriceInfo;
}

export async function getRealtimeInfo(id: string) {
  const {
    reutersCode,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    stockExchangeType,
  }: any = await realtimeApi(id);

  return {
    reutersCode,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    stockExchangeType,
  };
}
