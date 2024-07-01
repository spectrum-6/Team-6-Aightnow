import FavoriteStockItem from "./FavoriteStockItem";

type TFavoriteStock = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
  total: {
    stockPrice: string;
    investment: string;
    profitability: string;
    growth: string;
    interest: string;
  };
};

const data: TFavoriteStock[] = [
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
    total: {
      stockPrice: "0.0",
      investment: "0.0",
      profitability: "0.0",
      growth: "0.0",
      interest: "0.0",
    },
  },
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
    total: {
      stockPrice: "0.0",
      investment: "0.0",
      profitability: "0.0",
      growth: "0.0",
      interest: "0.0",
    },
  },
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
    total: {
      stockPrice: "0.0",
      investment: "0.0",
      profitability: "0.0",
      growth: "0.0",
      interest: "0.0",
    },
  },
];

type TFFavoriteStockProps = {
  openDeletePopup: () => void;
};

export default function FavoriteStock(props: TFFavoriteStockProps) {
  const { openDeletePopup } = props;

  return (
    <>
      <ul className="flex gap-[19px] flex-wrap">
        {data.map((item, index) => (
          <FavoriteStockItem
            key={index}
            title={item.title}
            enTitle={item.enTitle}
            price={item.price}
            value={item.value}
            rate={item.rate}
            total={item.total}
            openDeletePopup={openDeletePopup}
          />
        ))}
      </ul>
    </>
  );
}
