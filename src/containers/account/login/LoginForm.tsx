import React, { useEffect, useState } from "react";
import TextButton from "@/components/Button/TextButton";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Link from "next/link";

interface LoginFormProps {
  onLogin: (id: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  // 상태 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isAutoLoginChecked, setAutoLoginChecked] = useState(false);
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [error, setError] = useState("");

  // ID와 비밀번호가 입력되었는지 확인하여 버튼 활성화 상태를 설정
  useEffect(() => {
    setButtonEnable(id.trim() !== "" && password.trim() !== "");
  }, [id, password]);

  // 로그인 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // onLogin 함수 호출 (id와 password만 전달)
      await onLogin(id, password);
    } catch (error: any) {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {/* 아이디 입력 필드 */}
        <Input
          type="text"
          name="id"
          inputValue={id}
          setInputValue={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해 주세요."
        />
        {/* 비밀번호 입력 필드 */}
        <Input
          type={isPasswordShow ? "text" : "password"}
          name="password"
          inputValue={password}
          setInputValue={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          iconType={isPasswordShow ? "eyeHide" : "eyeShow"}
          iconClickHandler={() => setPasswordShow((prev) => !prev)}
        />
      </div>
      {/* 에러 메시지 표시 */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex justify-between items-center py-4 text-sm">
        {/* 자동 로그인 체크박스 */}
        <Checkbox
          id="autoLogin"
          checked={isAutoLoginChecked}
          onChange={() => setAutoLoginChecked((prev) => !prev)}
        >
          자동 로그인
        </Checkbox>
        {/* 아이디/비밀번호 찾기 링크 */}
        <div className="flex justify-between items-center gap-2 text-sm">
          <Link href="/findId">아이디 찾기</Link>
          <span className="w-px h-[14px] bg-grayscale-400"></span>
          <Link href="/findPassword">비밀번호 찾기</Link>
        </div>
      </div>
      {/* 로그인 버튼 */}
      <TextButton
        variant={isButtonEnable ? "primary" : "disable"}
        size="lg"
        disabled={!isButtonEnable}
        type="submit"
      >
        로그인
      </TextButton>
    </form>
  );
};

export default LoginForm;
