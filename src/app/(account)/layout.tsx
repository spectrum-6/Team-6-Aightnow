import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white">
        <h1 className="max-w-[1200px] mx-auto py-[10px]">
          <Image
            src="/images/logo_dark.svg"
            alt="logo"
            width="183"
            height="64"
          />
        </h1>
      </div>
      <div className="bg-[#F1F3F8] w-full h-screen pt-20">{children}</div>
    </>
  );
}
