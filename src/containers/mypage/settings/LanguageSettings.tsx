import LanguageButton from "@/components/Button/LanguageButton";

export default function LanguageSettings() {
  return (
    <div>
      <h4 className="text-xl font-bold self-start text-gray-900 pb-2">
        언어 설정
      </h4>
      <p className="text-base font-normal pb-5">
        이 설정에서 번역할 언어를 선택하시면 뉴스 및 리포트에서 설정하신 언어로
        번역한 정보를 확인할 수 있습니다.
      </p>
      <div className="flex flex-wrap gap-[10px]">
        <LanguageButton lang="kr" />
        <LanguageButton lang="us" />
        <LanguageButton lang="cn" />
        <LanguageButton lang="jp" />
        <LanguageButton lang="fr" />
      </div>
    </div>
  );
}
