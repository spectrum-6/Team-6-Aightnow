"use client";

import { useEffect, useState } from "react";
import EditPersonalInfo from "./EditPersonalInfo";
import LanguageSettings from "./LanguageSettings";
import TermsOfService from "./TermsOfService";
import useUserStore from "@/stores/useUserStore";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 서비스 이용약관 DB 조회
type TServiceInfoContent = {
  termsText: string;
  policyText: string;
};
const getServiceInfoContent = async (): Promise<TServiceInfoContent> => {
  const res = await (await fetch(`${baseUrl}/api/system`)).json();
  return res;
};

export default function Main() {
  // Session에 저장된 User 정보
  const { userInfo } = useUserStore();

  // Side bar
  const [selectedSection, setSelectedSection] = useState("personalinfo");

  // 서비스 이용약관 텍스트
  const [serviceInfoContent, setServiceInfoContent] = useState("");
  const [userInfoContent, setUserInfoContent] = useState("");

  // 서비스 이용약관 DB 조회
  const getContent = async () => {
    const content = await getServiceInfoContent();

    setServiceInfoContent(content.termsText);
    setUserInfoContent(content.policyText);
  };

  useEffect(() => {
    getContent();
  }, []);

  const renderContent = () => {
    if (!userInfo) {
      return null;
    }

    switch (selectedSection) {
      case "personalinfo":
        return <EditPersonalInfo userInfo={userInfo} />;
      case "languagesettings":
        return <LanguageSettings userInfo={userInfo} />;
      case "termsofservice":
        return (
          <TermsOfService
            serviceInfoContent={serviceInfoContent}
            userInfoContent={userInfoContent}
          />
        );
      default:
        return <EditPersonalInfo userInfo={userInfo} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-[#F1F3F8]">
      <div>
        <h4 className="font-bold mb-5 self-start">마이페이지</h4>
        <div className="flex flex-col lg:flex-row lg:space-x-4 w-full min-h-[720px] mb-[62px]">
          {/* 사이드바 */}
          <aside className="w-full lg:w-[285px] bg-white rounded-2xl mb-4 lg:mb-0 flex-shrink-0 min-h-[720px]">
            <ul>
              <li className="mb-2 mt-6">
                <button
                  onClick={() => setSelectedSection("personalinfo")}
                  className={`w-full text-xl text-navy-900 px-[24px] py-[16px] text-left ${
                    selectedSection === "personalinfo"
                      ? "font-bold border-l-8 border-navy-900"
                      : "font-medium border-l-8 border-white"
                  }`}
                >
                  개인정보 수정
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSelectedSection("languagesettings")}
                  className={`w-full text-xl text-navy-900 px-[24px] py-[16px] text-left ${
                    selectedSection === "languagesettings"
                      ? "font-bold border-l-8 border-navy-900"
                      : "font-medium border-l-8 border-white"
                  }`}
                >
                  언어 설정
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("termsofservice")}
                  className={`w-full text-xl text-navy-900 px-[24px] py-[16px] text-left ${
                    selectedSection === "termsofservice"
                      ? "font-bold border-l-8 border-navy-900"
                      : "font-medium border-l-8 border-white"
                  }`}
                >
                  서비스 이용약관
                </button>
              </li>
            </ul>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-grow w-full lg:w-[888px] bg-white rounded-2xl p-8 flex flex-col space-y-8 min-h-[720px]">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
