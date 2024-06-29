import TrendingSearchItem from "./TrendingSearchItem";

type TTrendingSearch = {
  title: string;
  value: string;
  rate: string;
};

const data: TTrendingSearch[] = [
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    value: "1.75",
    rate: "0.82",
  },
];

export default function TrendingSearch() {
  return (
    <>
      <div className="py-2">
        <h4 className="mb-4 text-navy-900 text-lg font-medium">인기 검색어</h4>
        <div className="p-6 border border-navy-100 rounded-2xl flex gap-6">
          <ul className="flex justify-between flex-wrap">
            {data.map((item, index) => (
              <TrendingSearchItem
                key={index}
                title={item.title}
                value={item.value}
                rate={item.rate}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
