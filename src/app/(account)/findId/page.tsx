import AccountFormBox from "@/containers/account/AccountFormBox";
import FindIdForm from "@/containers/account/findId/FindIdForm";
import FindIdResult from "@/containers/account/findId/FindIdResult";

// 렌더링 확인용 임시 데이터
const isGetId = false;
const [userId, registDate] = ["yunchaehyeon", "2023.06.24"];

export default function FindId() {
  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center">
          아이디 찾기
        </h3>

        {/* 저장된 값이 없으면 id 찾기 form */}
        {!isGetId && <FindIdForm />}

        {/* 아이디를 찾은 후 결과 */}
        {isGetId && (
          <FindIdResult
            userId={userId}
            registDate={registDate}
            authType="google"
          />
        )}
      </AccountFormBox>
    </>
  );
}
