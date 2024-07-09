import IconEyeHide from "@/icons/IconEyeHide";
import IconEyeShow from "@/icons/IconEyeShow";
import IconSearch from "@/icons/IconSearch";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useId,
  useState,
  useEffect,
} from "react";

// TInputProps 타입 정의에 controlId 추가
type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  caption?: string;
  iconType?: "eyeShow" | "eyeHide" | "search";
  iconPosition?: "left" | "right";
  state?: "warning" | "success" | null;
  inputValue: string;
  setInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  iconClickHandler?: () => void;
  controlId?: string; // 추가된 부분
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
    controlId, // 추가된 부분
    ...rest
  } = props;

  const inputId = useId();
  const [isFocused, setFocused] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const IconComponent = iconType ? iconComponentType[iconType] : null;
  const iconPos = iconPosition ? iconPosition : iconType ? "right" : null;
  const iconPositionClass = iconPos ? `${iconPos}-3` : "";

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
            iconPos === "left"
              ? "pl-11 pr-4"
              : iconPos === "right"
              ? "pl-4 pr-11"
              : "px-4"
          } ${iconPosition === "left" ? "pl-10 pr-4" : "pl-4 pr-10"}
          disabled:bg-grayscale-100 disabled:border-grayscale-300 disabled:placeholder-grayscale-300 
          focus:border-blue-500`}
          disabled={disabled}
          value={inputValue}
          onChange={setInputValue}
          {...(isClient && controlId ? { "control-id": controlId } : {})} // 조건부로 control-id 추가
          {...rest}
        />

        {IconComponent && iconPos && (
          <button
            type="button"
            onClick={iconClickHandler}
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

      {caption && (
        <span className={`text-xs ${captionTextColor()}`}>{caption}</span>
      )}
    </div>
  );
}
