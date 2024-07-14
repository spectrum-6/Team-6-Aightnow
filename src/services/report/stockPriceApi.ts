const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type TStockPriceApiProps = {
  code: string;
  stockExchangeType: string;
};

// 주가 차트 데이터
export async function stockPriceApi(props: TStockPriceApiProps) {
  const { code, stockExchangeType } = props;

  const period = [
    "day",
    "month&range=3",
    "month&range=12",
    "year&range=3",
    "year&range=10",
  ];

  try {
    const fetchDatas = period.map(async (periodType) => {
      const response = await fetch(
        `https://api.stock.naver.com/chart/foreign/item/${code}?periodType=${periodType}&stockExchangeType=${stockExchangeType}`,
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    });

    const data = await Promise.all(fetchDatas);

    const stockPrice = data.map((item, index) => {
      return { periodType: period[index], priceInfo: item.priceInfos };
    });

    return stockPrice;
  } catch (error) {
    console.error("error: ", error);
  }
}

// db에 stockPrice 데이터 업데이트
export async function patchStockPriceApi(stockPriceData: any, id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/stocks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockPriceData, id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "failed");
    }

    const stockInfo = await response.json();
    return stockInfo;
  } catch (error: unknown) {
    console.error("error: ", error);
    throw error;
  }
}

// db에서 stockPrice 데이터 가져오기
export async function getStockPriceApi() {
  try {
    const response = await fetch(`${BASE_URL}/api/stocks`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "failed");
    }

    const stockInfo = await response.json();
    return stockInfo;
  } catch (error: unknown) {
    console.error("error: ", error);
    throw error;
  }
}

// db에서 stocks 컬렉션의 특정 doc 데이터 가져오기
export async function getStockInfoApi(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/stocks/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "failed");
    }

    const stockInfo = await response.json();
    return stockInfo;
  } catch (error: unknown) {
    console.error("error: ", error);
    throw error;
  }
}
