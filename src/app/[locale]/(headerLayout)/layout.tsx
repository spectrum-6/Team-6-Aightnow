import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-[#F1F3F8] w-full h-screen pt-[81px] overflow-hidden">
        <div className="w-full h-full overflow-auto p-20">{children}</div>
      </div>
    </>
  );
}
