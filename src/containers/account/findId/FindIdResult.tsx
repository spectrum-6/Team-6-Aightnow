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
  authType: "kakao" | "naver" | "google" | null;
  email?: string; // 이메일 필드 추가
};

export default function FindIdResult(props: TFindIdResultProps) {
  const { userId, registDate, authType, email } = props;

  // 가입일 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="mb-14">
        <p className="text-sm text-black font-medium text-center my-4">
          {authType
            ? "소셜 로그인으로 가입된 계정입니다."
            : "일반 로그인으로 가입된 계정입니다."}
        </p>
        <div className="h-[120px] flex flex-col justify-center items-center gap-4 border border-grayscale-300 rounded-lg text-grayscale-900 ">
          <div className="flex items-center">
            <span className="mr-2">{authType ? "이메일 : " : "아이디 : "}</span>
            {authType && (
              <Image
                src={OAuthType[authType].src}
                alt={OAuthType[authType].alt}
                width={20}
                height={20}
                className="mr-1"
              />
            )}
            {authType ? email : userId}
          </div>
          <p>
            <span className="mr-2">가입일 : </span>
            {formatDate(registDate)}
          </p>
        </div>
      </div>
      <Link href={"/login"}>
        <TextButton size="lg">로그인하기</TextButton>
      </Link>
    </>
  );
}
