"use client";

import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function FindPasswordForm() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setButtonEnable(
      userName.trim() !== "" && userId.trim() !== "" && userEmail.trim() !== "",
    );
  }, [userName, userId, userEmail]);

  const handleFindPassword = async () => {
    try {
      const usersRef = collection(firestore, "users");
      const q = query(
        usersRef,
        where("username", "==", userName),
        where("id", "==", userId),
        where("email", "==", userEmail),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.socialProvider) {
          setError(true);
          setErrorMessage(
            "소셜 로그인 사용자는 비밀번호 재설정이 불가능합니다.",
          );
          return;
        }

        const auth = getAuth();
        await sendPasswordResetEmail(auth, userEmail);
        console.log("비밀번호 재설정 이메일이 발송되었습니다.");
        router.push("/findPassword/success");
      } else {
        setError(true);
        setErrorMessage("등록되지 않은 회원이거나 잘못된 회원정보입니다.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 중 오류가 발생했습니다.", error);
      setError(true);
      setErrorMessage("비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <form className="mt-10">
        <div className="flex flex-col gap-4 mb-14">
          <Input
            type="text"
            name="name"
            inputValue={userName}
            setInputValue={(e) => setUserName(e.target.value)}
            placeholder="이름을 입력해 주세요."
            label="이름"
            state={isError ? "warning" : null}
          />
          <Input
            type="text"
            name="id"
            inputValue={userId}
            setInputValue={(e) => setUserId(e.target.value)}
            placeholder="아이디를 입력해 주세요."
            label="아이디"
            state={isError ? "warning" : null}
          />
          <Input
            type="email"
            name="email"
            inputValue={userEmail}
            setInputValue={(e) => setUserEmail(e.target.value)}
            placeholder="가입 시 입력한 이메일 주소를 입력해 주세요."
            label="이메일주소"
            state={isError ? "warning" : null}
            caption={isError ? errorMessage : ""}
          />
        </div>
        <TextButton
          type="button"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
          onClick={handleFindPassword}
        >
          임시 비밀번호 발급
        </TextButton>
      </form>
    </>
  );
}
