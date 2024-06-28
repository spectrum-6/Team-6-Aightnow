import { TSearchResultItem } from "./SearchResult";
import Link from "next/link";
import { IconApple } from "@/icons";
import TextButton from "@/components/Button/TextButton";

type TSearchResultItemProps = {
  item: TSearchResultItem;
  isFavoriteStock: boolean;
  toggleFavoriteStock: () => void;
};

export default function SearchResultItem(props: TSearchResultItemProps) {
  const { item, isFavoriteStock, toggleFavoriteStock } = props;

  return (
    <>
      <li className="h-12">
        <Link href="#" className="w-full h-full block">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p>
                <IconApple width={48} height={48} />
              </p>
              <strong className="ml-4 text-grayscale-900">{item.title}</strong>
              <span className="text-grayscale-600 before:content-['∙'] before:mx-1">
                {item.enTitle}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-blue-600">
                <span className="text-grayscale-900 font-medium">
                  ${item.price}
                </span>
                <span className="ml-2 text-sm">▼{item.value}</span>
                <span className="ml-2 text-sm">-{item.rate}%</span>
              </p>
              {isFavoriteStock ? (
                <TextButton
                  variant="primary"
                  additionalClass="w-[120px] h-9 text-sm font-medium"
                  onClick={toggleFavoriteStock}
                >
                  추가
                </TextButton>
              ) : (
                <TextButton
                  variant="grayscale"
                  additionalClass="w-[120px] h-9 text-sm font-medium"
                  onClick={toggleFavoriteStock}
                >
                  삭제하기
                </TextButton>
              )}
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
