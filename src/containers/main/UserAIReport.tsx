import { Badge } from "@/components/Badge";
import { IconAi } from "@/icons";
import Card from "./Card";

export default function UserAIReport() {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-4">
        <h4 className="font-bold text-navy-900 leading-9">
          스펙님의 AI 리포트
        </h4>
        <Badge variant="navy" icon={<IconAi />} />
      </div>
      <div className="flex gap-6">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
