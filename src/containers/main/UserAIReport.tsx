"use client";

import { Badge } from "@/components/Badge";
import { IconAi } from "@/icons";
import Card from "./Card";
import useUserStore from "@/stores/useUserStore";

export default function UserAIReport() {
  const { userInfo } = useUserStore();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <h4 className="font-bold text-navy-900 leading-9">
          {userInfo?.nickname}님의 AI 리포트
        </h4>
        <Badge variant="navy" icon={<IconAi />} />
      </div>
      <div className="flex gap-5">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
