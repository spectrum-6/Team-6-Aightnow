"use client";

import { useState, useEffect, useCallback } from "react";
import TextButton from "@/components/Button/TextButton";
import Popup from "@/components/Popup/Popup";
import PopupTitle from "@/components/Popup/PopupTitle";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function VerifySuccess() {
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  const checkEmailVerification = useCallback(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      auth.currentUser.reload().then(() => {
        setIsEmailVerified(auth.currentUser!.emailVerified);
        if (auth.currentUser!.emailVerified) {
          router.push("/ko/signUp/register");
        } else {
          setCheckCount((prevCount) => prevCount + 1);
        }
      });
    }
  }, [router]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
        if (user.emailVerified) {
          router.push("/ko/signUp/register");
        }
      }
    });

    // 5초마다 이메일 인증 상태 확인
    const intervalId = setInterval(() => {
      checkEmailVerification();
    }, 5000);

    // 최대 12번(1분) 확인 후 중단
    if (checkCount >= 12) {
      clearInterval(intervalId);
    }

    return () => {
      unsubscribe();
      clearInterval(intervalId);
    };
  }, [checkCount, checkEmailVerification, router]);

  const handleButtonClick = () => {
    if (isEmailVerified) {
      router.push("/ko/signUp/register");
    } else {
      setShowWarning(true);
      // 버튼 클릭 시 즉시 한 번 더 확인......
      checkEmailVerification();
    }
  };

  return (
    <>
      <Popup title="인증 링크를 전송했습니다.">
        <PopupTitle
          subTitle={`작성한 이메일주소로 인증메일을 전송했습니다.\n메일 확인 후 회원가입을 계속 진행해주세요.`}
        />
        <TextButton onClick={handleButtonClick}>확인</TextButton>
        {showWarning && (
          <p className="text-red-500 mt-2">
            아직 이메일 인증이 완료되지 않았습니다. 이메일을 확인하고 인증
            링크를 클릭해주세요.
          </p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          이메일 인증이 완료되면 자동으로 다음 단계로 이동합니다.
        </p>
      </Popup>
    </>
  );
}
