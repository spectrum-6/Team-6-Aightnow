import RelatedStockItem from "./RelatedStockItem";

type TRelatedStock = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
};

const data: TRelatedStock[] = [
  {
    title: "애플",
    enTitle: "AAPL",
    price: "00.00",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    enTitle: "AAPL",
    price: "00.00",
    value: "1.75",
    rate: "0.82",
  },
  {
    title: "애플",
    enTitle: "AAPL",
    price: "00.00",
    value: "1.75",
    rate: "0.82",
  },
];

export default function RelatedStock() {
  return (
    <>
      <div className="h-[310px] p-8 bg-white rounded-2xl">
        <h3 className="mb-[10px] text-navy-900 text-lg font-bold">
          현재 뉴스와 관련된 주식
        </h3>
        <ul className="text-grayscale-900">
          {data.map((item, index) => (
            <RelatedStockItem
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
