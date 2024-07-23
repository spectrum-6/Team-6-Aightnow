import {
  calcPriceApi,
  integrationApi,
  realtimeApi,
} from "@/services/report/stockApi";
import { stockPriceApi } from "@/services/report/stockPriceApi";

interface CacheItem {
  data: any;
  timestamp: number;
}

const cache: { [key: string]: CacheItem } = {};
const CACHE_TTL = 5 * 60 * 1000;

async function getCachedData(key: string, fetchFunction: () => Promise<any>) {
  const now = Date.now();
  if (cache[key] && now - cache[key].timestamp < CACHE_TTL) {
    return cache[key].data;
  }

  const data = await fetchFunction();
  cache[key] = { data, timestamp: now };
  return data;
}

export async function getStockData(symbol: string) {
  try {
    // 실시간 주식 데이터 가져오기
    const realtimeData = await getCachedData(`realtime_${symbol}`, () =>
      realtimeApi(symbol),
    );

    if (
      !realtimeData ||
      !realtimeData.symbolCode ||
      !realtimeData.stockExchangeType
    ) {
      throw new Error(`실시간 데이터 가져오기 실패: ${symbol}`);
    }

    // 통합 데이터 가져오기
    const integrationData = await getCachedData(`integration_${symbol}`, () =>
      integrationApi(symbol),
    );

    // 환율 정보 가져오기
    const exchangeRate = await getCachedData("exchange_rate", calcPriceApi);

    // 주가 차트 데이터 가져오기
    const priceChartData = await getCachedData(`price_chart_${symbol}`, () =>
      stockPriceApi({
        code: realtimeData.symbolCode,
        stockExchangeType: realtimeData.stockExchangeType,
      }),
    );

    // 모든 데이터를 하나의 객체로 통합
    return {
      ...realtimeData,
      integrationData: integrationData || null,
      exchangeRate: exchangeRate || null,
      priceChartData: priceChartData || null,
    };
  } catch (error) {
    console.error("주식 데이터 fetch 중 오류 발생:", error);
    // 에러 객체에 추가 정보를 포함시킵니다
    if (error instanceof Error) {
      (error as any).symbol = symbol;
    }
    throw error;
  }
}
