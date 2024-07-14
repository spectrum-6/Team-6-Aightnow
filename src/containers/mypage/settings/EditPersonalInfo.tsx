import { UserInfo } from "@/types/UserInfo";
import Link from "next/link";

export default function EditPersonalInfo({ userInfo }: { userInfo: UserInfo }) {
  const isSocialProvider = userInfo.socialProvider ? true : false;

  return (
    <div>
      <form>
        {/* 메인 콘텐츠 */}
        <main className="w-full rounded-2xl flex flex-col space-y-8">
          <section className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-[#18254C]">
                프로필 설정
              </h3>
              <p className="text-[16px] font-normal  text-[#121212]">
                서비스 사용시 보여지는 프로필을 생성 및 변경합니다. 프로필을
                설정해보세요.
              </p>
            </div>
            <div className="flex lg:items-center lg:ml-4">
              <Link
                scroll={false}
                href="/settings/account/edit/editProfile"
                className="flex items-center justify-center w-[160px] h-[36px] bg-black text-white text-sm py-2 px-[10px] rounded-lg"
              >
                프로필 수정
              </Link>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row mb-4 lg:gap-[122px]">
            <h4 className="text-[16px] font-medium text-black self-start">
              프로필
            </h4>
            <div className="flex items-center">
              <img
                src="https://i.ibb.co/3BtYXVs/Vector.png"
                alt="프로필"
                className="w-14 h-14 rounded-full mr-4"
              />
              <span className="text-[16px] text-black font-medium">
                {userInfo.nickname}
              </span>
            </div>
          </div>

          <section className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-[#18254C]">
                계정 설정
              </h3>
              <p className="text-[16px] font-normal  text-[#121212]">
                서비스 이용시 사용되는 계정을 생성 및 변경합니다. 계정을
                연동하여 다양한 서비스를 이용해보세요.
              </p>
            </div>
            <div className="flex lg:items-center lg:ml-4">
              {/* 소셜연동 가입 사용자가 아닐 경우에만 계정 정보 수정 버튼 노출 */}
              {!isSocialProvider && (
                <Link
                  scroll={false}
                  href="/settings/account/edit/verifyPassword"
                  className="flex items-center justify-center w-[160px] h-[36px] bg-black text-white text-sm py-2 px-[10px] rounded-lg"
                >
                  계정정보 수정
                </Link>
              )}
            </div>
          </section>

          <div className="mb-4">
            <div className="flex mb-2 items-center">
              <p className="w-[144px] text-[18px] font-medium text-[#121212]">
                아이디
              </p>
              <span className="text-[16px] font-medium text-[#575757]">
                {userInfo.id}
              </span>
            </div>
            <div className="flex mb-2 items-center">
              <p className="w-[144px] text-[18px] font-medium text-[#121212]">
                이름
              </p>
              <span className="text-[16px] font-medium text-[#575757]">
                {userInfo.username}
              </span>
            </div>
            <div className="flex mb-2 items-center">
              <p className="w-[144px] text-[18px] font-medium text-[#121212]">
                생년월일
              </p>
              <span className="text-[16px] font-medium text-[#575757]">
                {userInfo.birthDate}
              </span>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}
