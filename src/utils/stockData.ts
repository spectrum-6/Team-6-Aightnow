import {
  calcPriceApi,
  integrationApi,
  realtimeApi,
} from "@/services/report/stockApi";
import { stockPriceApi } from "@/services/report/stockPriceApi";

// 캐시를 위한 인터페이스 정의
interface CacheItem {
  data: any;
  timestamp: number;
}

// 간단한 인메모리 캐시 구현
const cache: { [key: string]: CacheItem } = {};

// 캐시 유효 시간 (5분)
const CACHE_TTL = 5 * 60 * 1000;

// 캐시된 데이터를 가져오거나 새로 fetch하는 함수
async function getCachedData(key: string, fetchFunction: () => Promise<any>) {
  const now = Date.now();
  if (cache[key] && now - cache[key].timestamp < CACHE_TTL) {
    return cache[key].data;
  }

  const data = await fetchFunction();
  cache[key] = { data, timestamp: now };
  return data;
}

// 종합적인 주식 데이터를 가져오는 함수
export async function getStockData(symbol: string) {
  try {
    // 실시간 주식 데이터 가져오기
    const realtimeData = await getCachedData(`realtime_${symbol}`, () =>
      realtimeApi(symbol),
    );

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
      integrationData,
      exchangeRate,
      priceChartData,
    };
  } catch (error) {
    console.error("주식 데이터 fetch 중 오류 발생:", error);
    throw error;
  }
}
