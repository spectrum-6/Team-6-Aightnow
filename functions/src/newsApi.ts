import * as functions from "firebase-functions";
import { Timestamp } from "firebase-admin/firestore";
import { NewsItem, stockUrls, stringToDate } from "./newsUtil";
import { db } from "./firebaseInit";

const runtimeOpts = {
  timeoutSeconds: 540,
};

// 별도의 함수로 분리
export const fetchNewsData = async () => {
  console.log("Scheduled function triggered");
  const data = await getNewsData();
  console.log("Fetched News Data: ", data);

  try {
    for (const newsItem of data) {
      await db
        .collection("scheduleNewsData")
        .doc(newsItem.id)
        .set({
          ...newsItem,
          date: Timestamp.fromDate(newsItem.date),
          fullContent: newsItem.fullContent, // fullContent 저장
          relatedStocks: newsItem.relatedStocks, // relatedStocks 저장
        });
      console.log(`Saved NewsItem: ${newsItem.id}`);
    }
  } catch (error) {
    console.error("Error saving data: ", error);
  }
};

// schedule function - 데이터 DB 저장
export const fetchNewsDataSchedule = functions
  .runWith(runtimeOpts)
  .pubsub.schedule("every day 00:00")
  .timeZone("Asia/Seoul")
  .onRun(async (context) => {
    // 뉴스 데이터 fetch
    await fetchNewsData();
  });

const MAX_PAGES = 2;

// 뉴스 데이터 크롤링
export const getNewsData = async (): Promise<NewsItem[]> => {
  const allNewsItems: NewsItem[] = [];

  for (const { name, apiUrl } of stockUrls) {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const url = apiUrl(page);
      console.log(`Fetching news from ${url}`);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`뉴스를 가져오지 못했습니다: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`API 응답 데이터 (페이지 ${page})`);

        if (!Array.isArray(data) || data.length === 0) {
          console.warn(
            `응답에 뉴스 데이터가 없습니다: ${JSON.stringify(data)}`,
          );
          break;
        }

        const newsItems = await Promise.all(
          data.map(async (item: any) => {
            const fullContentUrl = `https://api.stock.naver.com/news/worldNews/stock/fnGuide/${item.aid}?reutersCode=${name}`;
            const { fullContent, relatedStocks } =
              await fetchFullContentAndStocks(fullContentUrl);

            return {
              id: item.aid,
              title: item.tit,
              // link: `https://api.stock.naver.com/news/worldNews/stock/fnGuide/${item.aid}?reutersCode=${name}`,
              link: fullContentUrl,
              content: item.subcontent,
              date: stringToDate(item.dt), // 문자열을 Date 객체로 변환
              company: item.ohnm,
              image: item.thumbUrl || "",
              stockName: name,
              viewCount: 0,
              fullContent: fullContent, // 본문 내용 추가
              relatedStocks: relatedStocks, // 관련 주식 추가
            };
          }),
        );

        allNewsItems.push(...newsItems);
      } catch (error) {
        console.error(
          `뉴스 데이터를 가져오는 중 오류 발생 (페이지 ${page}):`,
          error,
        );
        break;
      }
    }
  }

  return allNewsItems;
};

// API를 사용하여 전체 내용과 관련 주식 정보 가져오기
const fetchFullContentAndStocks = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }
    const data = await response.json();
    
    const fullContent = data.article.content ? data.article.content : "";
    const relatedStocks = data.article.relatedItems ? data.article.relatedItems.map((item: any) => item.itemName) : [];
    
    console.log("Related Stocks:", relatedStocks); // 콘솔에 relatedStocks 로그

    return { fullContent, relatedStocks };
  } catch (error) {
    console.error(`Error fetching full content and related stocks:`, error);
    return { fullContent: [], relatedStocks: [] };
  }
};