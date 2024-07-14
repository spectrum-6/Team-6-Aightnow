import Link from "next/link";
import { IconApple } from "@/icons";

type TRelatedStockItemProps = {
  title: string;
  enTitle: string;
  price: string;
  value: string;
  rate: string;
};

export default function RelatedStockItem(props: TRelatedStockItemProps) {
  const { title, enTitle, price, value, rate } = props;

  return (
    <>
      <li className="mt-5">
        <Link href="#" className="w-full h-full block">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <p>
                <IconApple />
              </p>
              <p>
                <strong className="block">{title}</strong>
                <span className="text-sm">{enTitle}</span>
              </p>
            </div>
            <p className="text-right">
              <strong className="block text-sm font-medium">${price}</strong>
              <span className="text-blue-600 text-xs">
                <span>▼{value}</span>
                <span className="ml-2">-{rate}%</span>
              </span>
            </p>
          </div>
          <div></div>
        </Link>
      </li>
    </>
  );
}
