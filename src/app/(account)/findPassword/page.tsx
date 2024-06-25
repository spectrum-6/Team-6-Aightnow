import TextButton from "@/components/Button/TextButton";
import Popup from "@/components/Popup";
import PopupTitle from "@/components/PopupTitle";
import AccountFormBox from "@/containers/account/AccountFormBox";
import FindPasswordForm from "@/containers/account/findPassword/FindPasswordForm";

export default function FindPassword() {
  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center">
          비밀번호 찾기
        </h3>

        <FindPasswordForm />

        <Popup title="임시 비밀번호가 발급되었습니다.">
          <PopupTitle
            subTitle={`이메일을 확인하여 임시 비밀번호로
재로그인 후 비밀번호를 변경해주세요.`}
          ></PopupTitle>
          <TextButton>오케이</TextButton>
        </Popup>
      </AccountFormBox>
    </>
  );
}
