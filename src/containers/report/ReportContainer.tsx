import StockHeader from "./StockHeader";
import StockPrice from "./StockPrice";
import StockChart from "./StockChart";
import AIStockList from "./AIStockList";
import AiAnalyst from "./AIAnalyst";
import News from "./News";

type TReportContainer = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  stockExchangeType: string;
  corporateOverview: string;
  calcPrice: string;
  stockPriceInfo: any;
};

export default function ReportContainer(props: TReportContainer) {
  // ...rest
  const {
    reutersCode,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    corporateOverview,
    calcPrice,
    stockExchangeType,
    stockPriceInfo,
  } = props;

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[1200px]">
          {/* top-box */}
          <div className="">
            {/* 헤더 섹션 */}
            <StockHeader
              reutersCode={reutersCode}
              stockName={stockName}
              symbolCode={symbolCode}
            />
            <div>
              <div className="flex flex-row w-[1200px] h-[256px] gap-[20px] mb-6">
                <StockPrice
                  symbolCode={symbolCode}
                  closePrice={closePrice}
                  compareToPreviousClosePrice={compareToPreviousClosePrice}
                  fluctuationsRatio={fluctuationsRatio}
                  corporateOverview={corporateOverview}
                  calcPrice={calcPrice}
                />
                <StockChart
                  reutersCode={reutersCode}
                  stockExchangeType={stockExchangeType}
                  stockPriceInfo={stockPriceInfo}
                />
              </div>
              <div className="flex flex-row w-[1200px] h-[297px] gap-[20px] mb-10">
                <AIStockList />
                <AiAnalyst
                  reutersCode={reutersCode}
                  stockName={stockName}
                  symbolCode={symbolCode}
                  closePrice={closePrice}
                  compareToPreviousClosePrice={compareToPreviousClosePrice}
                  fluctuationsRatio={fluctuationsRatio}
                />
              </div>
            </div>
          </div>
          {/* bottom-box */}
          <div>
            <h4 className="text-navy-900 font-bold mb-6">오늘 인기있는 뉴스</h4>
            <News />
          </div>
        </div>
      </div>
    </>
  );
}
