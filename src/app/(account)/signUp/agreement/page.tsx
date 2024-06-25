"use client";

import Checkbox from "@/components/Checkbox";
import AccountFormBox from "@/containers/account/AccountFormBox";
import { useEffect, useState } from "react";

export default function Agreement() {
  const [isCheckedAllAgree, setCheckedAllAgree] = useState(false);
  const [isAgreeTerms, setAgreeTerms] = useState(false);
  const [isAgreePolicy, setAgreePolicy] = useState(false);

  const handleAllCheck = () => {
    if (isCheckedAllAgree) {
      setAgreeTerms(false);
      setAgreePolicy(false);
      setCheckedAllAgree(false);
    } else {
      setAgreeTerms(true);
      setAgreePolicy(true);
      setCheckedAllAgree(true);
    }
  };

  useEffect(() => {
    if (isAgreeTerms && isAgreePolicy) {
      setCheckedAllAgree(true);
    } else {
      setCheckedAllAgree(false);
    }
  }, [isAgreeTerms, isAgreePolicy]);

  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-6">
          약관동의
        </h3>
        <form className="flex flex-col gap-4 text-grayscale-900">
          <div className="flex justify-between">
            <p className="text-lg">
              이용악관, 개인정보 처리방침에 모두 동의합니다.
            </p>
            <Checkbox
              id="allAgree"
              name="allAgree"
              checked={isCheckedAllAgree}
              onChange={handleAllCheck}
            />
          </div>

          <div className="w-full h-px bg-grayscale-300"></div>

          <div className="flex flex-col">
            <p className="text-lg">서비스 이용악관 (필수)</p>
            <div className="flex justify-end">
              <p className="text-base mr-1.5">동의합니다.</p>
              <Checkbox
                id="terms"
                name="terms"
                checked={isAgreeTerms}
                onChange={(e) => setAgreeTerms((prev) => !prev)}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <p>개인정보 처리방침</p>
            <Checkbox
              id="policy"
              name="policy"
              checked={isAgreePolicy}
              onChange={(e) => setAgreePolicy((prev) => !prev)}
            />
          </div>
        </form>
      </AccountFormBox>
    </>
  );
}
