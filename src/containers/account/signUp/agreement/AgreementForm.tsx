"use client";

import Checkbox from "@/components/Checkbox";
import { useEffect, useState } from "react";
import { policyText, termsText } from "./data";
import TextButton from "@/components/Button/TextButton";

export default function AgreementForm() {
  // checkbox 상태
  const [isCheckedAllAgree, setCheckedAllAgree] = useState(false);
  const [isAgreeTerms, setAgreeTerms] = useState(false);
  const [isAgreePolicy, setAgreePolicy] = useState(false);
  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  const handleAllCheck = () => {
    if (isCheckedAllAgree) {
      setAgreeTerms(false);
      setAgreePolicy(false);
      setCheckedAllAgree(false);
      setButtonEnable(false);
    } else {
      setAgreeTerms(true);
      setAgreePolicy(true);
      setCheckedAllAgree(true);
      setButtonEnable(true);
    }
  };

  useEffect(() => {
    if (isAgreeTerms && isAgreePolicy) {
      setCheckedAllAgree(true);
      setButtonEnable(true);
    } else {
      setCheckedAllAgree(false);
      setButtonEnable(false);
    }
  }, [isAgreeTerms, isAgreePolicy]);

  useEffect(() => {
    setCheckedAllAgree(isAgreeTerms && isAgreePolicy);
  }, []);

  return (
    <>
      <form>
        <div className="flex flex-col gap-4 text-grayscale-900 mb-14">
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

          <div className="flex flex-col gap-2">
            <p className="text-lg">서비스 이용악관 (필수)</p>
            <div className="w-full h-48 p-4 border border-grayscale-300 rounded-lg overflex-x-hidden overflow-y-auto whitespace-pre-wrap">
              {termsText}
            </div>
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

          <div className="flex flex-col gap-2">
            <p className="text-lg">개인정보 처리방침 (필수)</p>
            <div className="w-full h-48 p-4 border border-grayscale-300 rounded-lg overflex-x-hidden overflow-y-auto whitespace-pre-wrap">
              {policyText}
            </div>
            <div className="flex justify-end">
              <p className="text-base mr-1.5">동의합니다.</p>
              <Checkbox
                id="policy"
                name="policy"
                checked={isAgreePolicy}
                onChange={(e) => setAgreePolicy((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        <TextButton
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
        >
          다음
        </TextButton>
      </form>
    </>
  );
}
