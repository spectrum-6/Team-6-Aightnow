const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function stockPriceUpdateApi(stockPriceData: any, id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/stocks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockPriceData, id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "failed");
    }

    const stockInfo = await response.json();
    return stockInfo;
  } catch (error: any) {
    console.error("error: ", error);
    throw error;
  }
}
