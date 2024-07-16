"use server";

import { getStockInfoApi } from "@/services/report/stockPriceApi";

export async function getStockInfo(id: string) {
  const stockPriceInfo = await getStockInfoApi(id);
  return stockPriceInfo;
}
