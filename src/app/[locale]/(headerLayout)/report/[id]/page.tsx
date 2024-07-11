import ReportContainer from "@/containers/report/ReportContainer";
import {
  basicApi,
  calcPriceApi,
  integrationApi,
  realtimeApi,
} from "@/app/api/report/stockApi";

export type TCodes = {
  [key: string]: string; // index signature
  aapl: string;
  tsla: string;
  amzn: string;
  msft: string;
  googl: string;
  u: string;
  nvda: string;
};

export const codes: TCodes = {
  aapl: "AAPL.O",
  tsla: "TSLA.O",
  amzn: "AMZN.O",
  msft: "MSFT.O",
  googl: "GOOGL.O",
  u: "U",
  nvda: "NVDA.O",
};

type TParams = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function Page({ params }: TParams) {
  const { id } = params;

  const realtimeData = await realtimeApi(id);
  const integrationData = await integrationApi(id);
  const calcPriceData = await calcPriceApi();
  const basicData = await basicApi(id);

  return (
    <>
      <ReportContainer
        stockName={realtimeData.stockName}
        symbolCode={realtimeData.symbolCode}
        closePrice={realtimeData.closePrice}
        compareToPreviousClosePrice={realtimeData.compareToPreviousClosePrice}
        fluctuationsRatio={realtimeData.fluctuationsRatio}
        corporateOverview={integrationData}
        calcPrice={calcPriceData}
        stockExchangeName={basicData}
        id={id}
        code={codes[id]}
      />
    </>
  );
}
