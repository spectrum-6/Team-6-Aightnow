import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="w-full py-2 bg-white flex justify-center items-center">
        <nav className="w-[1200px] flex items-center">
          <h1 className="mr-5">
            <Image
              src="/images/logo_dark.svg"
              alt="아잇나우 로고"
              width="183"
              height="64"
            />
          </h1>
          <ul className="flex items-center font-medium text-navy-900">
            <li className="w-40 py-2 text-lg text-center">발견</li>
            <li className="w-40 py-2 text-lg text-center">뉴스</li>
            <li className="w-40 py-2 text-lg text-center">관심종목</li>
            <li className="w-40 py-2 text-lg text-center">마이페이지</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
