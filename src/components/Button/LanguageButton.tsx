import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { IconKr, IconCn, IconFr, IconJp, IconUs } from "@/icons";

type TLanguageButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    lang: "kr" | "cn" | "fr" | "jp" | "us";
};

export default function LanguageButton({ lang, ...rest }: TLanguageButtonProps) {
    const getIcon = () => {
        switch (lang) {
            case "kr":
                return <IconKr />;
            case "cn":
                return <IconCn />;
            case "fr":
                return <IconFr />;
            case "jp":
                return <IconJp />;
            case "us":
                return <IconUs />;
            default:
                return null;
        }
    };

    const getText = () => {
        switch (lang) {
            case "kr":
                return "한국어";
            case "cn":
                return "중국어";
            case "fr":
                return "프랑스어";
            case "jp":
                return "일본어";
            case "us":
                return "영어";
            default:
                return "";
        }
    };

    return (
        <button
            className={
                "w-[198px] h-40 border border-grayscale-300 rounded-2xl text-lg font-bold text-grayscale-300 flex flex-col items-center justify-center hover:border-blue-600 hover:text-blue-600"
            }
            {...rest}>
            {getIcon()}
            <span>{getText()}</span>
        </button>
    );
}
