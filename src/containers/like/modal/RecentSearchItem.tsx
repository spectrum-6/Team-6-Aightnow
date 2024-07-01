import Link from "next/link";
import { IconApple } from "@/icons";

type TRecentSearchItemProps = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
};

export default function RecentSearchItem(props: TRecentSearchItemProps) {
  const { title, enTitle, price, value, rate } = props;

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
                <strong className="block">{title}</strong>
                <span className="text-sm">{enTitle}</span>
              </p>
            </div>
            <p className="text-right">
              <strong className="block font-medium">${price}</strong>
              <span className="text-blue-600 text-sm">
                <span>▼{value}</span>
                <span className="ml-2">-{rate}%</span>
              </span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}
