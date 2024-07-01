import AccountFormBox from "@/containers/account/AccountFormBox";
import AgreementForm from "@/containers/account/signUp/agreement/AgreementForm";

export default function Agreement() {
  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-6">
          약관동의
        </h3>

        <AgreementForm />
      </AccountFormBox>
    </>
  );
}
