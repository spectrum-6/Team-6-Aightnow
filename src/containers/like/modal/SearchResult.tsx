import SearchResultItem from "./SearchResultItem";

type TSearchResultProps = {
  isFavoriteStock: boolean;
  toggleFavoriteStock: () => void;
};

export type TSearchResultItem = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
};

const data: TSearchResultItem[] = [
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
  },
];

export default function SearchResult(props: TSearchResultProps) {
  const { isFavoriteStock, toggleFavoriteStock } = props;

  return (
    <>
      <div>
        <h4 className="mb-4 text-navy-900 text-lg font-medium">검색 결과</h4>
        <ul className="flex flex-col gap-2">
          {data.map((item, index) => (
            <SearchResultItem
              key={index}
              item={item}
              isFavoriteStock={isFavoriteStock}
              toggleFavoriteStock={toggleFavoriteStock}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
