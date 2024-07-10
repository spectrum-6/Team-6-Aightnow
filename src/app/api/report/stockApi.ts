import { codes } from "@/app/[locale]/(headerLayout)/report/[id]/page";

// Real-time(실시간) 기반 데이터
export async function realtimeApi(code: string) {
  try {
    const response = await fetch(
      `https://polling.finance.naver.com/api/realtime/worldstock/stock/${codes[code]}`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.datas[0];
  } catch (error) {
    console.error("error:", error);
  }
}

// 분석평점 / 목표주가 / 산업비교정보
export async function integrationApi(code: string) {
  try {
    const response = await fetch(
      `https://api.stock.naver.com/stock/${codes[code]}/integration`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.corporateOverview;
  } catch (error) {
    console.error("error:", error);
  }
}

// 기업 정보 및 종목 정보 (차트 이미지 포함)
export async function basicApi(code: string) {
  try {
    const response = await fetch(
      `https://api.stock.naver.com/stock/${codes[code]}/basic`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.stockExchangeName;
  } catch (error) {
    console.error("error:", error);
  }
}

// 환율
export async function calcPriceApi() {
  try {
    const response = await fetch(
      `https://m.stock.naver.com/front-api/marketIndex/productDetail?category=exchange&reutersCode=FX_USDKRW`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.result.calcPrice;
  } catch (error) {
    console.error("error:", error);
  }
}
