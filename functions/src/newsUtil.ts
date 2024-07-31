export type NewsItem = {
  id: string;
  title: string;
  link: string;
  content: string;
  date: Date;
  company: string;
  image: string;
  stockName: string;
  viewCount: number;
  fullContent?: string; // fullContent 속성 추가
  relatedStocks?: string[]; // relatedStocks 속성 추가
};

export const stockUrls = [
  {
    name: "TSLA",
    apiUrl: (page: number) =>
      `https://api.stock.naver.com/news/worldStock/TSLA.O?pageSize=20&page=${page}`,
  },
  {
    name: "AAPL",
    apiUrl: (page: number) =>
      `https://api.stock.naver.com/news/worldStock/AAPL.O?pageSize=20&page=${page}`,
  },
  {
    name: "AMZN",
    apiUrl: (page: number) =>
      `https://api.stock.naver.com/news/worldStock/AMZN.O?pageSize=20&page=${page}`,
  },
  {
    name: "GOOGL",
    apiUrl: (page: number) =>
      `https://api.stock.naver.com/news/worldStock/GOOGL.O?pageSize=20&page=${page}`,
  },
  {
    name: "MSFT",
    apiUrl: (page: number) =>
      `https://api.stock.naver.com/news/worldStock/MSFT.O?pageSize=20&page=${page}`,
  },
  {
    name: "NVDA",
    apiUrl: (page: number) =>
      `https://api.stock.naver.com/news/worldStock/NVDA.O?pageSize=20&page=${page}`,
  },
  {
    name: "U",
    apiUrl: (page: number) =>
      `https://api.stock.naver.com/news/worldStock/U?pageSize=20&page=${page}`,
  },
];

// 문자열을 Date 객체로 변환하는 함수
export const stringToDate = (dateString: string): Date => {
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6)) - 1; // 월은 0부터 시작
  const day = parseInt(dateString.substring(6, 8));
  const hours = parseInt(dateString.substring(8, 10));
  const minutes = parseInt(dateString.substring(10, 12));
  const seconds = parseInt(dateString.substring(12, 14));
  return new Date(year, month, day, hours, minutes, seconds);
};
