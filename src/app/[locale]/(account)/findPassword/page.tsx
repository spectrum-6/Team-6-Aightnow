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
      </AccountFormBox>
    </>
  );
}
