import TextButton from "@/components/Button/TextButton";
import Popup from "@/components/Popup/Popup";
import PopupTitle from "@/components/Popup/PopupTitle";
import Link from "next/link";

export default function FindPasswordSuccess() {
  return (
    <>
      <Popup title="임시 비밀번호가 발급되었습니다.">
        <PopupTitle
          subTitle={`이메일을 확인하여 임시 비밀번호로\n재로그인 후 비밀번호를 변경해주세요.`}
        ></PopupTitle>
        <Link href={"/login"}>
          <TextButton>로그인</TextButton>
        </Link>
      </Popup>
    </>
  );
}
