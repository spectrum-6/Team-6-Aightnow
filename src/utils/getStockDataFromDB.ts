// DB에 저장된 모든 stock 리스트 조회
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllStockData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/scheduleStock`);

    return await response.json();
  } catch (e) {
    console.log("error : ", e);
  }
};

// symbolCode 로 DB에 저장된 stock 데이터 조회
export const getStockDataWithSymbolCode = async (symbolCode: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/scheduleStock/${symbolCode}`);

    return await response.json();
  } catch (e) {
    console.log("error : ", e);
  }
};
