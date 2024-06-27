///
"use client";

import { useState } from "react";
import EditPersonalInfo from "./EditPersonalInfo";
import LanguageSettings from "./LanguageSettings";
import TermsOfService from "./TermsOfService";

export default function Main() {
  const [selectedSection, setSelectedSection] = useState("personalinfo");

  const renderContent = () => {
    switch (selectedSection) {
      case "personalinfo":
        return <EditPersonalInfo />;
      case "languagesettings":
        return <LanguageSettings />;
      case "termsofservice":
        return <TermsOfService />;
      default:
        return <EditPersonalInfo />;
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#F1F3F8] fixed top-0 left-0 right-0 bottom-0">
      <div>
        <h4 className="font-bold mb-5 self-start">마이페이지</h4>
        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4">
          {/* 사이드바 */}
          <aside className="w-full lg:w-[285px] h-auto lg:h-[720px] bg-white rounded-2xl mb-4 lg:mb-0">
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
          <main className="w-[888px] p-8 bg-white rounded-2xl flex flex-col space-y-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
