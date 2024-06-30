export default function NewsList() {
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-4 items-center">
          <div className="flex w-[120px] h-[64px] bg-yellow-200 rounded-lg"></div>
          {/* 글 */}
          <div className="flex flex-col w-[406px] gap-[14px]">
            <span className="text-grayscale-900 text-base font-medium">
              일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"
            </span>
            <div className="flex gap-2 text-gray-600 text-xs">
              <span>n시간전</span>
              <span>•</span>
              <span>문화일보</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
