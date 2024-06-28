import { TRecentSearchItem } from "./RecentSearch";
import Link from "next/link";
import { IconApple } from "@/icons";

type TRecentSearchItemProps = {
  item: TRecentSearchItem;
};

export default function RecentSearchItem(props: TRecentSearchItemProps) {
  const { item } = props;

  return (
    <>
      <li className="w-[255px] h-24 border border-navy-100 rounded-2xl flex-shrink-0">
        <Link href="#" className="w-full h-full px-4 py-6 block">
          <div className="flex justify-between">
            <div className="flex gap-6">
              <p>
                <IconApple />
              </p>
              <p>
                <strong className="block">{item.title}</strong>
                <span className="text-sm">{item.enTitle}</span>
              </p>
            </div>
            <p className="text-right">
              <strong className="block font-medium">${item.price}</strong>
              <span className="text-blue-600 text-sm">
                <span>▼{item.value}</span>
                <span className="ml-2">-{item.rate}%</span>
              </span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}
