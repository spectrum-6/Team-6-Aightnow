import TextButton from "@/components/Button/TextButton";
import Link from "next/link";
import Image from "next/image";

const OAuthType = {
  kakao: { src: "/images/btn_kakao.png", alt: "카카오 연동 가입 아이디" },
  naver: { src: "/images/btn_naver.png", alt: "네이버 연동 가입 아이디" },
  google: { src: "/images/btn_google.png", alt: "구글 연동 가입 아이디" },
};

type TFindIdResultProps = {
  userId: string;
  registDate: string;
  authType?: "kakao" | "naver" | "google";
};

export default function FindIdResult(props: TFindIdResultProps) {
  const { userId, registDate, authType } = props;

  return (
    <>
      <div className="mb-14">
        <p className="text-sm text-black font-medium text-center my-4">
          휴대폰 번호와 일치하는 아이디입니다.
        </p>
        <div className="h-[120px] flex flex-col justify-center items-center gap-4 border border-grayscale-300 rounded-lg text-grayscale-900 ">
          <div className="flex items-center">
            <span className="mr-2">아이디 : </span>
            {authType && (
              <Image
                src={OAuthType[authType].src}
                alt={OAuthType[authType].alt}
                width={20}
                height={20}
                className="mr-1"
              />
            )}

            {userId}
          </div>
          <p>
            <span className="mr-2">가입일 : </span>
            {registDate}
          </p>
        </div>
      </div>
      <Link href={"/login"}>
        <TextButton size="lg">로그인하기</TextButton>
      </Link>
    </>
  );
}
