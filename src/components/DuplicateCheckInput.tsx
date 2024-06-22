import IconEyeHide from "@/icons/IconEyeHide";
import IconEyeShow from "@/icons/IconEyeShow";
import IconSearch from "@/icons/IconSearch";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useId,
  useState,
} from "react";

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  caption?: string;
  state?: "warning" | "success" | null;
  inputValue: string;
  setInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonClickHandler?: () => void; // 버튼 클릭 시 실행 함수 전달
};

const iconComponentType = {
  eyeShow: IconEyeShow,
  eyeHide: IconEyeHide,
  search: IconSearch,
};

export default function Input(props: TInputProps) {
  const {
    label,
    caption,
    disabled,
    state,
    inputValue,
    setInputValue,
    buttonClickHandler,
    ...rest
  } = props;

  // input Id
  const inputId = useId();

  // focus 상태 - input border color, caption text color 에 영향을 미침
  const [isFocused, setFocused] = useState(false);

  // button state
  const [buttonClassName, setButtonClassName] = useState("");

  useEffect(() => {
    if (disabled || inputValue === "") {
      setButtonClassName("bg-grayscale-200 text-grayscale-300 cursor-default");
    } else if (state) {
      setButtonClassName("bg-warning-100 text-white");
    } else {
      setButtonClassName("bg-[#020408] text-white");
    }
  }, [inputValue, state]);

  // caption text color
  const captionTextColor = () => {
    if (disabled) {
      return "text-grayscale-300";
    } else if (isFocused) {
      return "text-blue-300";
    } else if (state === "warning") {
      return "text-warning-100";
    } else if (state === "success") {
      return "text-success-100";
    } else {
      return "text-grayscale-700";
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {/* 라벨의 text color는 disabled, warning, default 상태가 있음 */}
      {label && (
        <label
          htmlFor={inputId}
          className={`text-medium text-base ${
            disabled
              ? "text-grayscale-300"
              : state === "warning"
              ? "text-warning-100"
              : "text-grayscale-900"
          }`}
        >
          {label}
        </label>
      )}

      {/* Input */}
      <div className="relative min-w-56 ">
        <input
          id={inputId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full py-4 border rounded-lg bg-white placeholder-grayscale-400 outline-0 pl-4 pr-36 ${
            state === "warning"
              ? "border-warning-100 text-warning-100"
              : "border-grayscale-300 text-grayscal-900"
          }
          disabled:bg-grayscale-100 disabled:border-grayscale-300 disabled:placeholder-grayscale-300 
          focus:border-blue-500
          `}
          value={inputValue}
          onChange={setInputValue}
          disabled={disabled}
          {...rest}
        />

        {/* Button */}
        <button
          type="button"
          className={`absolute top-2/4 -translate-y-1/2 right-4 w-[120px] h-9 rounded-lg text-sm
            ${buttonClassName} `}
        >
          중복확인
        </button>
      </div>

      {/* Caption */}
      {caption && (
        <span className={`text-xs ${captionTextColor()}`}>{caption}</span>
      )}
    </div>
  );
}
