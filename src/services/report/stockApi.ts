"use server";

type TCodes = {
  [key: string]: string; // index signature
};

const codes: TCodes = {
  aapl: "AAPL.O",
  tsla: "TSLA.O",
  amzn: "AMZN.O",
  msft: "MSFT.O",
  googl: "GOOGL.O",
  u: "U",
  nvda: "NVDA.O",
};

// 실시간 기반 데이터
export async function realtimeApi(code: string) {
  try {
    const response = await fetch(
      `https://polling.finance.naver.com/api/realtime/worldstock/stock/${codes[code]}`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const {
      reutersCode,
      stockName,
      symbolCode,
      closePrice,
      compareToPreviousClosePrice,
      fluctuationsRatio,
      stockExchangeType,
    } = data.datas[0];

    return {
      reutersCode,
      stockName,
      symbolCode,
      closePrice,
      compareToPreviousClosePrice,
      fluctuationsRatio,
      stockExchangeType: stockExchangeType.name,
    };
  } catch (error) {
    console.error("error:", error);
  }
}

// 기업 정보 및 종목 정보
export async function basicApi(code: string): Promise<any> {
  try {
    const response = await fetch(
      `https://api.stock.naver.com/stock/${codes[code]}/basic`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    const stockData = {
      closePrice: data.closePrice,
      compareToPreviousClosePrice: data.compareToPreviousClosePrice,
      fluctuationsRatio: data.fluctuationsRatio,
      basePrice: data.stockItemTotalInfos[0].value,
      accumulatedTradingVolume: data.stockItemTotalInfos[4].value,
      stockItemTotalInfos: data.stockItemTotalInfos,
    };

    const strStockData = JSON.stringify(stockData);

    return strStockData;
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

// 종목 최신 뉴스 리스트
export async function stockLatestNewsListApi(code: string) {
  try {
    const response = await fetch(
      `https://api.stock.naver.com/news/worldStock/${codes[code]}?pageSize=10&page=1`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    const aidData = data.map((item: any) => item.aid);

    return aidData;
  } catch (error) {
    console.error("error:", error);
  }
}

// 종목 최신 뉴스 내용
export async function stockLatestNewsContentApi(
  code: string,
  aids: string[],
): Promise<any> {
  try {
    const fetchPromises = aids.map(async (aid) => {
      const response = await fetch(
        `https://api.stock.naver.com/news/worldNews/stock/fnGuide/${aid}?reutersCode=${codes[code]}`,
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    });

    const news = await Promise.all(fetchPromises);

    const result = news.map((item) => {
      let date = item.article.dt;

      // HTML 문자열
      let htmlString = item.article.content;

      // HTML 태그를 제거하고 텍스트만 추출
      let textContent = htmlString
        .replace(/<\/?[^>]+>/g, "") // HTML 태그 제거
        .replace(/\n+/g, " ") // 줄바꿈을 공백으로 변경
        .replace(/&amp;/g, "&")
        .trim(); // 앞뒤 공백 제거

      return { [date]: textContent };
    });

    const strResult = JSON.stringify(result);

    return strResult;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
}
