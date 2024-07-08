import {
  IconAmazon,
  IconApple,
  IconGoogle,
  IconMs,
  IconNvidia,
  IconTsla,
  IconUnity,
} from "@/icons";

type TIconComponentType = {
  [key: string]: (props: TIconProps) => JSX.Element;
};

type TIconProps = {
  width?: number;
  height?: number;
};

type TStockIconProps = TIconProps & {
  symbolCode: string;
};

// symbolCode로 Icon Component 찾기
const iconComponentType: TIconComponentType = {
  APPL: IconApple,
  AMZN: IconAmazon,
  GOOGL: IconGoogle,
  MSFT: IconMs,
  NVDA: IconNvidia,
  TSLA: IconTsla,
  U: IconUnity,
};

export default function StockIcon(props: TStockIconProps) {
  const { symbolCode, width, height } = props;
  const IconComponent = iconComponentType[symbolCode] || null;

  return IconComponent && <IconComponent width={width} height={height} />;
}
