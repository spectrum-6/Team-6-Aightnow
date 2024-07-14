"use client";

import TextButton from "@/components/Button/TextButton";
import Popup from "@/components/Popup/Popup";
import PopupTitle from "@/components/Popup/PopupTitle";
import { useRouter } from "next/navigation";
export default function VerifySuccess() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/ko/signUp/register");
  };

  return (
    <>
      <Popup title="인증 링크를 전송했습니다.">
        <PopupTitle
          subTitle={`작성한 이메일주소로 인증메일을 전송했습니다.\n메일 확인 후 회원가입을 계속 진행해주세요.`}
        />
        <TextButton onClick={handleButtonClick}>확인</TextButton>
      </Popup>
    </>
  );
}
