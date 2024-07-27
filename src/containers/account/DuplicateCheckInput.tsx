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

export default function DuplicateCheckInput(props: TInputProps) {
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

  const inputId = useId();
  const [isFocused, setFocused] = useState(false);
  const [buttonClassName, setButtonClassName] = useState("");

  useEffect(() => {
    if (disabled || inputValue === "") {
      setButtonClassName("bg-grayscale-200 text-grayscale-300 cursor-default");
    } else if (state) {
      setButtonClassName(`bg-${state}-100 text-white`);
    } else {
      setButtonClassName("bg-[#020408] text-white");
    }
  }, [inputValue, state, disabled]);

  const captionTextColor = () => {
    if (disabled) {
      return "text-grayscale-300";
    } else if (isFocused) {
      return "text-blue-300";
    } else if (state) {
      return `text-${state}-100`;
    } else {
      return "text-grayscale-700";
    }
  };

  // const handleDuplicateCheck = async () => {
  //   if (!inputValue) return;
  //   try {
  //     const usersRef = collection(firestore, "users");
  //     const q = query(usersRef, where("id", "==", inputValue));
  //     const querySnapshot = await getDocs(q);

  //     setIsDuplicate(!querySnapshot.empty);
  //     if (buttonClickHandler) {
  //       buttonClickHandler();
  //     }
  //   } catch (error) {
  //     console.error("Failed to check for duplicate ID:", error);
  //   }
  // };

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`text-medium text-base ${
            disabled
              ? "text-grayscale-300"
              : state === "warning"
              ? "text-warning-100"
              : "text-navy-900 font-medium text-base"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative min-w-56">
        <input
          id={inputId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full py-4 border-grayscale-300 border rounded-lg bg-white placeholder-grayscale-400 outline-0 pl-4 pr-36 ${
            state === "warning"
              ? "border-warning-100 text-warning-100"
              : "border-grayscale-300 text-grayscale-900"
          }
          disabled:bg-grayscale-100 disabled:border-grayscale-300 disabled:placeholder-grayscale-300 
          focus:border-blue-500`}
          value={inputValue}
          onChange={setInputValue}
          disabled={disabled}
          {...rest}
        />
        <button
          type="button"
          // onClick={handleDuplicateCheck}
          onClick={buttonClickHandler}
          className={`absolute top-2/4 -translate-y-1/2 right-4 w-[120px] h-9 rounded-lg text-sm ${buttonClassName}`}
        >
          중복확인
        </button>
      </div>
      {caption && (
        <span className={`text-xs ${captionTextColor()}`}>{caption}</span>
      )}
    </div>
  );
}
