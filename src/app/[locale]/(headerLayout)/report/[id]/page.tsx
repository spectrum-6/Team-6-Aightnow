import ReportContainer from "@/containers/report/ReportContainer";

type TCodes = {
  [key: string]: string; // index signature
  aapl: string;
  tsla: string;
  amzn: string;
  msft: string;
  googl: string;
  u: string;
  nvda: string;
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

const fetchData = async (code: string) => {
  console.log(codes[code]);
  try {
    const responses = await Promise.all([
      fetch(
        `https://polling.finance.naver.com/api/realtime/worldstock/stock/${codes[code]}`,
      ),
      fetch(`https://api.stock.naver.com/stock/${codes[code]}/integration`),
    ]);

    const [realtimeData, integrationData] = await Promise.all(
      responses.map((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }),
    );

    return { realtimeData, integrationData };
  } catch (error) {
    console.error("error: ", error);
  }
};

type TParams = {
  params: {
    locale: string;
    id: string;
  };
};
export default async function Page({ params }: TParams) {
  const { id } = params;

  const reportData = await fetchData(id);

  return (
    <>
      <ReportContainer reportData={reportData} id={id} />
    </>
  );
}
