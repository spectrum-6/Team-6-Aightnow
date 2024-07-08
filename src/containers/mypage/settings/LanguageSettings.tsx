import LanguageButton from "@/components/Button/LanguageButton";
import useUserStore from "@/stores/userStore";

type lang = "ko" | "en" | "zh" | "ja" | "fr";
const langList: lang[] = ["ko", "en", "zh", "ja", "fr"];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const patchUserTransLang = async (userUID: string, changeLang: lang) => {
  try {
    await fetch(`${baseUrl}/api/users/${userUID}/changeLang`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transLang: changeLang }), // 데이터를 JSON 문자열로 변환하여 전송
    });
  } catch (error) {
    console.log("error : ", error);
  }
};

export default function LanguageSettings() {
  const { userInfo, setUserInfo } = useUserStore();

  // zustand user 정보에 저장된 번역언어
  const uid = userInfo?.uid;
  const userLang = userInfo?.transLang;

  const clickLanguageButton = async (changeLang: lang) => {
    const updateUserInfo = { ...userInfo, transLang: changeLang };
    // zustand user 정보 업데이트
    setUserInfo(updateUserInfo);

    if (uid) {
      await patchUserTransLang(uid, changeLang);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-bold self-start text-gray-900 pb-2">
        언어 설정
      </h4>
      <p className="text-base font-normal pb-5">
        이 설정에서 번역할 언어를 선택하시면 뉴스 및 리포트에서 설정하신 언어로
        번역한 정보를 확인할 수 있습니다.
      </p>
      <div className="flex flex-wrap gap-[10px]">
        {langList.map((item) => (
          <LanguageButton
            key={item}
            lang={item}
            selected={item === userLang ? true : false}
            onClick={() => clickLanguageButton(item)}
          />
        ))}
      </div>
    </div>
  );
}
