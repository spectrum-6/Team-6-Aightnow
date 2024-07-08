import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { IconKr, IconCn, IconFr, IconJp, IconUs } from "@/icons";

type TLanguageButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  lang: "ko" | "en" | "zh" | "ja" | "fr";
  selected: boolean;
};

export default function LanguageButton({
  lang,
  selected,
  ...rest
}: TLanguageButtonProps) {
  const getIcon = () => {
    switch (lang) {
      case "ko":
        return <IconKr />;
      case "zh":
        return <IconCn />;
      case "fr":
        return <IconFr />;
      case "ja":
        return <IconJp />;
      case "en":
        return <IconUs />;
      default:
        return null;
    }
  };

  const getText = () => {
    switch (lang) {
      case "ko":
        return "한국어";
      case "zh":
        return "중국어";
      case "fr":
        return "프랑스어";
      case "ja":
        return "일본어";
      case "en":
        return "영어";
      default:
        return "";
    }
  };

  return (
    <button
      className={`w-[198px] h-40 border rounded-2xl text-lg font-bold  flex flex-col items-center justify-center  ${
        selected
          ? "border-blue-600 text-blue-600"
          : "border-grayscale-300 text-grayscale-300 hover:border-blue-400 hover:text-blue-400"
      }`}
      disabled={selected}
      {...rest}
    >
      {getIcon()}
      <span>{getText()}</span>
    </button>
  );
}
