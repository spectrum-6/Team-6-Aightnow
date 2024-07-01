import Link from "next/link";
import { IconApple } from "@/icons";

type TTrendingSearchItemProps = {
  title: string;
  value: string;
  rate: string;
};

export default function TrendingSearchItem(props: TTrendingSearchItemProps) {
  const { title, value, rate } = props;

  return (
    <>
      <li className="w-[321px] h-12 py-2">
        <Link href="#" className="w-full h-full block">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-navy-900 font-medium">1</span>
              <p className="ml-4">
                <IconApple width={32} height={32} />
              </p>
              <strong className="ml-2 text-grayscale-600 font-medium">
                {title}
              </strong>
            </div>
            <p className="text-blue-600 text-sm">
              <span>▼{value}</span>
              <span className="ml-2">-{rate}%</span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}
