import RecentSearchItem from "./RecentSearchItem";

type TRecentSearch = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
};

const data: TRecentSearch[] = [
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
  },
];

export default function RecentSearch() {
  return (
    <>
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-navy-900 text-lg font-medium">
            최근 검색한 종목
          </h4>
          <button className="text-grayscale-600 text-sm font-medium underline">
            전체삭제
          </button>
        </div>
        <ul className="flex gap-5 overflow-auto scrollbar-hide">
          {data.map((item, index) => (
            <RecentSearchItem
              key={index}
              title={item.title}
              enTitle={item.enTitle}
              price={item.price}
              value={item.value}
              rate={item.rate}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
