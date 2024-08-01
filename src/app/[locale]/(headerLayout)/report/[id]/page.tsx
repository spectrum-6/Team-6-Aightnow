import ClientComponent from "@/containers/report/ClientComponent";
import ReportContainer from "@/containers/report/ReportContainer";
import promptGenerator from "@/libs/prompts/promptGenerator";
import {
  realtimeApi,
  integrationApi,
  calcPriceApi,
} from "@/services/report/stockApi";
import {
  stockPriceApi,
  patchStockPriceApi,
} from "@/services/report/stockPriceApi";

type TParams = {
  params: {
    locale: string;
    id: string;
  };
};

// 인기검색어 DB count +1
const IncrementSearchCount = async (symbolCode: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/searchCount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symbolCode }),
    cache: "no-store",
  });

  return await res.json();
};

export default async function Page({ params }: TParams) {
  const { id } = params;

  const {
    reutersCode,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    stockExchangeType,
  }: any = await realtimeApi(id);

  const corporateOverview = await integrationApi(id);

  const calcPrice = await calcPriceApi();

  const stockPriceData = await stockPriceApi({
    code: reutersCode,
    stockExchangeType,
  });

  const stockPriceResult = await patchStockPriceApi(
    stockPriceData,
    id.toUpperCase(),
  );

  const promptResult = await promptGenerator(id, symbolCode);
  console.log("🍋", promptResult);

  // 인기검색어 DB Count+1
  const searchCount = await IncrementSearchCount(id);

  return (
    <>
      {/* recent view 추가를 위한 client component : return 객체 없음 */}
      <ClientComponent symbolCode={id} />
      <ReportContainer
        reutersCode={reutersCode}
        stockName={stockName}
        symbolCode={symbolCode}
        closePrice={closePrice}
        compareToPreviousClosePrice={compareToPreviousClosePrice}
        fluctuationsRatio={fluctuationsRatio}
        stockExchangeType={stockExchangeType}
        corporateOverview={corporateOverview}
        calcPrice={calcPrice}
        promptResult={promptResult}
      />
    </>
  );
}
