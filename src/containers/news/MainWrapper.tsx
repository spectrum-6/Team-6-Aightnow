type TMainWrapperProps = {
  children: React.ReactNode;
};

export default function MainWrapper({ children }: TMainWrapperProps) {
  return (
    <>
      <main className="pt-[81px]">{children}</main>
    </>
  );
}
