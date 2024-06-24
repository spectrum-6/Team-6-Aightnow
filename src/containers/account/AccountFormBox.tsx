export default function AccountFormBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <main className="w-[590px] rounded-[32px] bg-white px-[102px] py-20 shadow-login">
        {children}
      </main>
    </div>
  );
}
