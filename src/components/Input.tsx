import IconEyeHide from "@/icons/IconEyeHide";
import IconEyeShow from "@/icons/IconEyeShow";
import IconSearch from "@/icons/IconSearch";
import { InputHTMLAttributes, useId } from "react";

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  iconType?: "eyeShow" | "eyeHide" | "search";
  iconPosition?: "left" | "right";
  caption?: string;
  state?: "warning" | "success";
};

const iconComponentType = {
  eyeShow: IconEyeShow,
  eyeHide: IconEyeHide,
  search: IconSearch,
};

export default function Input(props: TInputProps) {
  const { label, iconType, iconPosition, caption, disabled, state, ...rest } =
    props;

  // input Id
  const inputId = useId();

  const IconComponent = iconType ? iconComponentType[iconType] : null;
  const iconPos = iconPosition ? iconPosition : iconType ? "right" : null;

  // input state에 따른 label text color classname
  const labelTextColor = () => {
    if (disabled) {
      return "text-grayscale-300-";
    } else if (state === "warning") {
      return "text-warning-100";
    } else {
      return "text-navy-900";
    }
  };
  // input state에 따른 input border color classname
  const inputBorderColor = () => {
    if (state === "warning") {
      return "border-warning-100";
    } else {
      return "border-grayscale-300";
    }
  };

  // input state에 따른 Caption text color classname
  const captionTextColor = () => {
    switch (state) {
      case "warning":
        return "text-warning-100";
      case "success":
        return "text-success-100";
      default:
        return "text-grayscale-700";
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`text-medium text-base ${labelTextColor()}`}
        >
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative min-w-40">
        <input
          id={inputId}
          className={`w-full py-4 border rounded-lg bg-white placeholder-grayscale-400 text-grayscal-900 outline-0 ${inputBorderColor()} ${
            iconPos === "left"
              ? "pl-11 pr-4"
              : iconPos === "right"
              ? "pl-4 pr-11"
              : "px-4"
          }
          disabled:bg-grayscale-100 focus:border-blue-500
          `}
          disabled={disabled}
          {...rest}
        />

        {/* Icon */}
        {IconComponent && iconPos && (
          <div
            className={`absolute top-2/4 -translate-y-1/2 cursor-pointer ${
              iconPos === "left" ? "left-4" : "right-4"
            }`}
          >
            <IconComponent
              color={!disabled && state === "warning" ? "#FF294F" : ""}
            />
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <span className={`text-xs ${captionTextColor()}`}>{caption}</span>
      )}
    </div>
  );
}
