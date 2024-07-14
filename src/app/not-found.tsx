import TextButton from "@/components/Button/TextButton";
import Header from "@/components/Header";
import IconNotFound from "@/icons/IconNotFound";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="bg-[#F1F3F8] w-full h-screen pt-20 overflow-hidden">
        <div className="w-full h-full overflow-auto p-20 flex justify-center items-center">
          <main className="rounded-[32px] bg-white px-[102px] p-20 flex flex-col justify-center items-center text-center text-navy-900">
            <IconNotFound />
            <h4 className="font-bold mt-6 mb-4">
              요청하신 페이지를 찾을 수 없습니다.
            </h4>
            <p className="text-lg font-medium mb-9">
              페이지의 주소가 잘못 입력되었거나
              <br />
              주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
            </p>
            <Link href={"/"}>
              <TextButton>메인으로</TextButton>
            </Link>
          </main>
        </div>
      </div>
    </>
  );
}
