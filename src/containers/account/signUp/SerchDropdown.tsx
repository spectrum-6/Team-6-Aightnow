import { useEffect, useRef, useState } from "react";

const tempData = [
  "apple",
  "amazon",
  "adobe",
  "AMD",
  "google",
  "Goldman",
  "MS",
  "Meta",
  "Micron",
  "Mcdonalds",
];

export default function SerchDropdown({
  onTagsChange,
}: {
  onTagsChange: (tags: string[]) => void;
}) {
  // input 관련
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setFocused] = useState(false);
  // 검색 시 데이터
  const [filteredData, setFilteredData] = useState<string[]>([]); // 필터링된 데이터 상태 추가

  // 관심종목 tag
  const [tags, setTags] = useState<string[]>([]); // 태그 목록 상태 추가

  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 영역 클릭 시 드롭다운 닫음
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // input 입력에 대한 이벤트
  const handleInputChange = (value: string) => {
    setInputValue(value); // 입력값 업데이트

    // 입력값에 따라 데이터 필터링
    const filtered = tempData.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(filtered);
    setFocused(true); // 드롭다운 열기
  };

  // 태그 추가
  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      onTagsChange([...tags, tag]); // 태그가 변경될 때 부모 컴포넌트로 전달
    }
    setInputValue(""); // 입력값 초기화
    setFocused(false); // 드롭다운 닫기
  };

  // tag 클릭 시 해당 태그 제거
  const handleTagClick = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    onTagsChange(updatedTags); // 태그가 변경될 때 부모 컴포넌트로 전달
  };

  return (
    <div ref={dropdownRef} className="relative min-w-40 flex flex-col gap-1">
      <span className="text-base font-medium text-navy-900">관심 종목</span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="#관심 종목을 추가해 주세요."
        className="w-full py-4 border rounded-lg bg-white placeholder-grayscale-400 outline-0 pl-4 pr-11 text-grayscale-900 border-grayscale-300
        disabled:bg-grayscale-100 disabled:border-grayscale-300 disabled:placeholder-grayscale-300 text-left focus:border-blue-500"
      />

      <div className="flex flex-wrap justify-start mt-3 gap-2">
        {tags.map((tag, index) => (
          <button
            type="button"
            key={index}
            className="py-1 px-3 bg-navy-800 text-white text-sm rounded-md"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {isFocused && filteredData.length > 0 && (
        <ul className="absolute top-16 w-full flex flex-col border border-grayscale-300 bg-white rounded-lg text-grayscale-900 text-base overflow-hidden">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="p-4 cursor-pointer text-left hover:bg-blue-50/50"
              onClick={() => {
                handleAddTag(item); // 태그 추가
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
