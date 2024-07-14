import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, LocaleTypes } from "./settings";

const initI18next = async (lang: LocaleTypes, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: typeof ns) =>
          import(`./locales/${language}/${namespace}.json`), // 언어와 네임스페이스에 따라 번역 파일을 동적으로 가져옴
      ),
    )
    .init(getOptions(lang, ns));

  return i18nInstance;
};

export async function createTranslation(lang: LocaleTypes, ns: string) {
  const i18nextInstance = await initI18next(lang, ns); // 지정된 언어와 네임스페이스로 i18next 인스턴스를 초기화

  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns), // 번역 함수(t)를 반환, ns가 배열이면 첫 번째 네임스페이스 사용
  };
}
