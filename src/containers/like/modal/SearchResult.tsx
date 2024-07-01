import SearchResultItem from "./SearchResultItem";

type TSearchResult = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
};

const data: TSearchResult[] = [
  {
    title: "애플",
    enTitle: "AAPL",
    price: "10.00",
    value: "1.75",
    rate: "0.82",
  },
];

type TSearchResultProps = {
  isFavoriteStock: boolean;
  toggleFavoriteStock: () => void;
};

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
              title={item.title}
              enTitle={item.enTitle}
              price={item.price}
              value={item.value}
              rate={item.rate}
              isFavoriteStock={isFavoriteStock}
              toggleFavoriteStock={toggleFavoriteStock}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
