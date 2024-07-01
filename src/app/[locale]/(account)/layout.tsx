import AccountHeader from "@/components/AccountHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white">
        <h1 className="max-w-[1200px] mx-auto py-[10px]">
          <AccountHeader />
        </h1>
      </div>
      <div className="bg-[#F1F3F8] w-full h-screen pt-[81px] overflow-hidden">
        <div className="w-full h-full overflow-auto p-20">{children}</div>
      </div>
    </>
  );
}
