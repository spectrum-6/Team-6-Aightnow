"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import { reauthenticateUser } from "@/firebase/fireauth";

export default function VerifyPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isConfirmError, setConfirmError] = useState(false);
  const [isButtonEnable, setButtonEnable] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  useEffect(() => {
    setButtonEnable(password.trim() !== "");
    if (password.trim() !== "") {
      setConfirmError(false);
    }
  }, [password]);

  const handleVerification = async () => {
    const res = await reauthenticateUser(password);

    if (res?.result) {
      router.replace("/settings/account/edit/editaccount");
    } else {
      setConfirmError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          router.back();
        }
      }}
    >
      <div className="bg-white rounded-[32px] w-[590px] h-[444px] p-6 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">
          비밀번호 인증
        </h3>

        <div className="w-[386px] mb-14 flex flex-col items-center">
          <Input
            type="password"
            name="password"
            inputValue={password}
            setInputValue={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
            label="현재 비밀번호 입력"
            caption={
              isConfirmError
                ? "비밀번호가 일치하지 않습니다. 확인 후 다시 입력해 주세요."
                : ""
            }
            state={isConfirmError ? "warning" : null}
          />
        </div>

        <TextButton
          type="button"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
          onClick={handleVerification}
        >
          확인하기
        </TextButton>
      </div>
    </div>
  );
}

// 여기서 수정하기 버튼 누르면 정보수정으로 이동
