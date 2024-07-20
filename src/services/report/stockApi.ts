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
export async function basicApi(code: string) {
  try {
    const response = await fetch(
      `https://api.stock.naver.com/stock/${codes[code]}/basic`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
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
export async function stockLatestNewsContentApi(code: string, aids: string[]) {
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

    const result = news.map((item, index) => {
      return { [`news${index}`]: item.article.content };
    });

    return result;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
}
