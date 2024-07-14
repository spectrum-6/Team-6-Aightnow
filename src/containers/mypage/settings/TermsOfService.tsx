import React, { useEffect, useState } from "react";

type TTermsOfServiceProps = {
  serviceInfoContent: string;
  userInfoContent: string;
};

export default function TermsOfService(props: TTermsOfServiceProps) {
  const { serviceInfoContent, userInfoContent } = props;

  const [isOpenServiceInfo, setIsOpenServiceInfo] = useState(false);
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);

  const toggleServiceButton = () => {
    setIsOpenServiceInfo(!isOpenServiceInfo);
  };

  const toggleUserButton = () => {
    setIsOpenUserInfo(!isOpenUserInfo);
  };

  return (
    <div>
      {/* 서비스 이용약관 */}
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-900 pb-4">
            서비스 이용약관
          </h4>
          <span
            className="text-sm font-medium text-blue-600 underline cursor-pointer"
            onClick={toggleServiceButton}
          >
            {isOpenServiceInfo ? "접어서 보기" : "펼쳐서 보기"}
          </span>
        </div>
        <div
          className={`w-[822px] mx-auto rounded-2xl border border-navy-100 mb-[54px] ${
            isOpenServiceInfo ? "h-auto" : "h-[250px] overflow-y-auto"
          }`}
        >
          <p className="p-6 text-navy-900 text-base whitespace-pre-wrap">
            {serviceInfoContent}
          </p>
        </div>
      </div>

      {/* 개인정보 처리방침 */}
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-900 pb-4">
            개인정보 처리방침
          </h4>
          <span
            className="text-sm font-medium text-blue-600 underline cursor-pointer"
            onClick={toggleUserButton}
          >
            {isOpenUserInfo ? "접어서 보기" : "펼쳐서 보기"}
          </span>
        </div>
        <div
          className={`w-[822px] mx-auto rounded-2xl border border-navy-100 mb-6 ${
            isOpenUserInfo ? "h-auto" : "h-[250px] overflow-y-auto"
          }`}
        >
          <p className="p-6 text-navy-900 text-base whitespace-pre-wrap">
            {userInfoContent}
          </p>
        </div>
      </div>
    </div>
  );
}
