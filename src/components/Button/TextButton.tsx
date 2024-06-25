import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import {
    IconAi,
    IconArrow,
    IconCalender,
    IconClose,
    IconDown,
    IconEdit,
    IconEyeHide,
    IconEyeShow,
    IconPlus,
    IconRefresh,
    IconSearch,
    IconTime,
    IconTranslate,
} from "@/icons";

type TTextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: string;
    variant?: "primary" | "disable" | "grayscale" | "warning" | "success" | "outline" | "secondary";
    size?: "lg" | "md" | "sm" | "full";
    icon?:
        | "ai"
        | "arrow"
        | "calender"
        | "close"
        | "down"
        | "edit"
        | "eyeHide"
        | "eyeShow"
        | "plus"
        | "refresh"
        | "search"
        | "time"
        | "translate";
    additionalClass?: string;
};

export default function TextButton(props: TTextButtonProps) {
    const { children, variant, size, icon, additionalClass, ...rest } = props;

    const getIcon = () => {
        switch (icon) {
            case "ai":
                return <IconAi />;
            case "arrow":
                return <IconArrow />;
            case "calender":
                return <IconCalender />;
            case "close":
                return <IconClose />;
            case "down":
                return <IconDown />;
            case "edit":
                return <IconEdit />;
            case "eyeHide":
                return <IconEyeHide />;
            case "eyeShow":
                return <IconEyeShow />;
            case "plus":
                return <IconPlus />;
            case "refresh":
                return <IconRefresh />;
            case "search":
                return <IconSearch />;
            case "time":
                return <IconTime />;
            case "translate":
                return <IconTranslate />;
            default:
                return null;
        }
    };

    const buttonVariants = cva(`rounded-lg flex items-center justify-center gap-1`, {
        variants: {
            variant: {
                default: "bg-navy-900 text-white hover:bg-navy-800",
                primary: "bg-navy-900 text-white hover:bg-navy-800",
                disable: "bg-grayscale-200 text-grayscale-300",
                grayscale: "bg-grayscale-200 text-grayscale-600",
                warning: "bg-warning-100 text-white hover:bg-[#FF5271]",
                success: "bg-success-100 text-white hover:bg-[#33E078]",
                outline: "border border-navy-900 text-navy-900 hover:border-navy-800 hover:text-navy-800",
                secondary: "bg-blue-500 text-white hover:bg-blue-300",
            },
            size: {
                default: "w-[386px] h-14",
                lg: "w-[386px] h-16 text-lg",
                md: "w-[386px] h-14",
                sm: "w-[386px] h-9 text-sm",
                full: "w-full h-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    });

    return (
        <button className={cn(buttonVariants({ variant, size }), additionalClass)} {...rest}>
            {icon && getIcon()}
            <span>{children}</span>
        </button>
    );
}
