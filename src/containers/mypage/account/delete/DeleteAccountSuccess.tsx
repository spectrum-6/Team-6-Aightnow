import TextButton from "@/components/Button/TextButton";

export default function DeleteAccountSuccess() {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center absolute flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[598px] h-[400px] rounded-[32px] bg-white border border-black">
        <h3 className="text-navy-900 font-bold mb-6">
          회원탈퇴가 완료되었습니다.
        </h3>
        <p className=".text-xl text-grayscale-900">
          아잇나우를 이용해주셔서 감사합니다.
        </p>
        <p className=".text-xl text-grayscale-900 mb-14">
          더욱 더 노력하고 발전하는 아잇나우가 되겠습니다.
        </p>

        <TextButton>확인</TextButton>
      </div>
    </div>
  );
}
