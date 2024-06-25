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
    IconFab,
} from "@/icons";

type TSvgColor = {
    primary: string;
    disable: string;
    grayscale: string;
    warning: string;
    success: string;
    outline: string;
};

const svgColor: TSvgColor = {
    primary: "#FFFFFF",
    disable: "#C5C5C5",
    grayscale: "#575757",
    warning: "#ffffff",
    success: "#ffffff",
    outline: "#18254C",
};

type TIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "disable" | "grayscale" | "warning" | "success" | "outline";
    size?: "lg" | "md" | "sm" | "full" | "fab";
    icon:
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
        | "translate"
        | "fab";
    additionalClass?: string;
};

export default function IconButton(props: TIconButtonProps) {
    const { variant, size, icon, additionalClass, ...rest } = props;

    const getIcon = () => {
        const iconProps = variant ? svgColor[variant] : "#9F9F9F";

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
                return <IconRefresh color={iconProps} />;
            case "search":
                return <IconSearch />;
            case "time":
                return <IconTime />;
            case "translate":
                return <IconTranslate />;
            case "fab":
                return <IconFab />;
            default:
                return null;
        }
    };

    const buttonVariants = cva(`rounded-full flex items-center justify-center`, {
        variants: {
            variant: {
                default: "bg-navy-900",
                primary: "bg-navy-900",
                disable: "bg-grayscale-200",
                grayscale: "bg-grayscale-200",
                warning: "bg-warning-100",
                success: "bg-success-100",
                outline: "border border-navy-900",
            },
            size: {
                default: "w-14 h-14",
                lg: "w-16 h-16",
                md: "w-14 h-14",
                sm: "w-9 h-9",
                full: "w-full h-full",
                fab: "w-20 h-20 drop-shadow-fab",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    });

    return (
        <button className={cn(buttonVariants({ variant, size }), additionalClass)} {...rest}>
            {getIcon()}
        </button>
    );
}
