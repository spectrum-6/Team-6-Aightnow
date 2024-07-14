type TStockPriceApiProps = {
  code: string;
  stockExchangeType: string;
};

export default async function stockPriceApi(props: TStockPriceApiProps) {
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
