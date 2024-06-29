import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <>
      <Header />
      <div className="bg-[#F1F3F8] w-full h-screen pt-20 overflow-hidden">
        <div className="w-full h-full overflow-auto p-20 flex justify-center items-center">
          <main className="rounded-[32px] bg-white px-[102px] p-20 flex flex-col justify-center items-center text-center text-navy-900">
            <LoadingSpinner className="animate-spin-slow" />
          </main>
        </div>
      </div>
    </>
  );
}
