import IconEyeHide from "@/icons/IconEyeHide";
import IconEyeShow from "@/icons/IconEyeShow";
import IconSearch from "@/icons/IconSearch";
import { ChangeEvent, InputHTMLAttributes, useId, useState } from "react";

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  caption?: string;
  iconType?: "eyeShow" | "eyeHide" | "search";
  iconPosition?: "left" | "right";
  state?: "warning" | "success" | null;
  inputValue: string;
  setInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  iconClickHandler?: () => void; //icon 버튼 클릭 시 실행 함수 전달
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
    iconType,
    iconPosition,
    disabled,
    state,
    inputValue,
    setInputValue,
    iconClickHandler,
    ...rest
  } = props;

  // input Id
  const inputId = useId();

  // focus 상태 - input border color, caption text color 에 영향을 미침
  const [isFocused, setFocused] = useState(false);

  // icon 종류와 위치
  const IconComponent = iconType ? iconComponentType[iconType] : null;
  // iconPosition이 제공되면 그 값을 사용하고, 그렇지 않으면 iconType이 있을 경우 기본값을 "right"
  const iconPos = iconPosition ? iconPosition : iconType ? "right" : null;
  // 간격을 3으로 변경 (0.75rem)
  const iconPositionClass = iconPos ? `${iconPos}-3` : "";

  // caption text color
  const captionTextColor = () => {
    if (disabled) {
      return "text-grayscale-300";
    }
    if (isFocused) {
      return "text-blue-300";
    }
    if (state === "warning") {
      return "text-warning-100";
    }
    if (state === "success") {
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
      <div className="relative min-w-40">
        <input
          id={inputId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full py-4 border rounded-lg bg-white placeholder-grayscale-400 outline-0 ${
            state === "warning"
              ? "border-warning-100 text-warning-100"
              : "border-grayscale-300 text-grayscal-900"
          } ${
            //아이콘 위치에 따라 입력 필드의 패딩을 동적으로 조정
            iconPos === "left"
              ? "pl-11 pr-4"
              : iconPos === "right"
              ? "pl-4 pr-11"
              : "px-4"
          } ${iconPosition === "left" ? "pl-10 pr-4" : "pl-4 pr-10"}
          disabled:bg-grayscale-100 disabled:border-grayscale-300 disabled:placeholder-grayscale-300 
          focus:border-blue-500
          `}
          disabled={disabled}
          value={inputValue}
          onChange={setInputValue}
          {...rest}
        />

        {/* Icon */}
        {IconComponent && iconPos && (
          <button
            type="button"
            onClick={iconClickHandler}
            //계산된 iconPositionClass를 사용하여 아이콘의 위치를 설정
            className={`absolute top-2/4 -translate-y-1/2 ${iconPositionClass} ${
              iconPos ? iconPos + "-4" : "-90"
            } ${disabled ? "cursor-default" : "cursor-pointer"}`}
          >
            <IconComponent
              color={!disabled && state === "warning" ? "#FF294F" : ""}
            />
          </button>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <span className={`text-xs ${captionTextColor()}`}>{caption}</span>
      )}
    </div>
  );
}
