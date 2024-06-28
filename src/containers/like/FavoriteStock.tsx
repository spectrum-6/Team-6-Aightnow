import FavoriteStockItem from "./FavoriteStockItem";

export type TFavoriteStockItem = {
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

const data: TFavoriteStockItem[] = [
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

type TFavoriteStockListProps = {
  openDeletePopup: () => void;
};

export default function FavoriteStockList(props: TFavoriteStockListProps) {
  const { openDeletePopup } = props;

  return (
    <>
      <ul className="flex gap-[19px] flex-wrap">
        {data.map((item, index) => (
          <FavoriteStockItem
            key={index}
            item={item}
            openDeletePopup={openDeletePopup}
          />
        ))}
      </ul>
    </>
  );
}
