import AccountFormBox from "@/containers/account/AccountFormBox";
import LoginForm from "@/containers/account/login/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-10">
          로그인
        </h3>
        <LoginForm />
        <div className="flex justify-between items-center py-4 text-sm">
          <p>아직 회원이 아니신가요?</p>
          <Link
            href={"/signin"}
            className="text-blue-600 font-medium underline underline-offset-4"
          >
            아잇나우 회원가입
          </Link>
        </div>
        <div className="flex items-center">
          <span className="h-px bg-grayscale-400 grow rounded"></span>
          <span className="px-4 py-2.5 text-gray-600">또는</span>
          <span className="h-px bg-grayscale-400 grow rounded"></span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Image
            src={"/images/btn_kakao.png"}
            alt="소셜로그인 카카오 버튼"
            width="72"
            height="72"
          />
          <Image
            src={"/images/btn_naver.png"}
            alt="소셜로그인 네이버 버튼"
            width="72"
            height="72"
          />
          <Image
            src={"/images/btn_google.png"}
            alt="소셜로그인 구글 버튼"
            width="72"
            height="72"
          />
        </div>
      </AccountFormBox>
    </>
  );
}
