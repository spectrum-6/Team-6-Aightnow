import IconDown from "@/icons/IconDown";
import { useEffect, useRef, useState } from "react";

type TDropdownProps = {
  list: string[];
  placeholder: string;
};

export default function Dropdown(props: TDropdownProps) {
  const { list, placeholder } = props;
  const [inputValue, setInputValue] = useState(placeholder);
  const [isFocused, setFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div ref={dropdownRef} className="relative min-w-40">
        <button
          type="button"
          onClick={() => setFocused(!isFocused)}
          className="w-full py-4 border rounded-lg bg-white placeholder-grayscale-400 outline-0 pl-4 pr-11 text-grayscale-900
          disabled:bg-grayscale-100 disabled:border-grayscale-300 disabled:placeholder-grayscale-300 text-left"
        >
          {inputValue}
          <span
            className={`absolute top-2/4 -translate-y-1/2 right-4 transition-transform ${
              isFocused ? "rotate-180" : ""
            }`}
          >
            <IconDown />
          </span>
        </button>

        {isFocused && (
          <ul className="absolute top-16 w-full flex flex-col border border-grayscale-300 bg-white rounded-lg text-grayscale-900 text-base overflow-hidden">
            {list &&
              list.map((item, index) => (
                <li
                  key={index}
                  className="p-4 cursor-pointer text-left hover:bg-blue-50/50"
                  onClick={() => {
                    setInputValue(item);
                    setFocused(false); // Close dropdown on item click
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
