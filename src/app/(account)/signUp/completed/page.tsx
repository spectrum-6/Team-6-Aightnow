import TextButton from "@/components/Button/TextButton";
import AccountFormBox from "@/containers/account/AccountFormBox";
import Link from "next/link";

export default function page() {
  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-6">
          가입이 완료되었습니다.
        </h3>
        <p className="text-grayscale-900 text-xl text-center mb-14">
          회원가입이 완료되었습니다.
          <br />
          로그인 후 이용해주세요!
        </p>

        <Link href={"/login"}>
          <TextButton size="lg">로그인 하기</TextButton>
        </Link>
      </AccountFormBox>
    </>
  );
}
