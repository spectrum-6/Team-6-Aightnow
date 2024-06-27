import { Badge } from "@/components/Badge";
import { IconAi } from "@/icons";

export default function UserAIReport() {
  return (
    <>
      <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-6">
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-4">
          <p className="flex-grow-0 flex-shrink-0 text-3xl font-bold text-left text-[#18254c]">
            스팩님의 AI 리포트
          </p>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1 px-2 py-1 rounded bg-[#18254c]">
            <Badge variant="black" icon={<IconAi />} />
          </div>
        </div>
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-5">
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[387px] h-[304px] gap-4 p-8 rounded-2xl bg-white" />
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[387px] h-[304px] gap-4 p-8 rounded-2xl bg-white" />
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[387px] h-[304px] gap-4 p-8 rounded-2xl bg-white" />
        </div>
      </div>
    </>
  );
}
