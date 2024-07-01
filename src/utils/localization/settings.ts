import type { InitOptions } from "i18next";

// 기본 언어 설정
export const fallbackLng = "ko";
// 지원하는 언어 목록 (기본 언어(한국어), 엉어, 중국어, 일본어, 프랑스어)
export const locales = [fallbackLng, "en", "zh", "ja", "fr"] as const;
export type LocaleTypes = (typeof locales)[number];
// 기본 네임스페이스 설정 (locales json 파일명)
export const defaultNS = "common";

// i18next 초기화 옵션
export function getOptions(lang = fallbackLng, ns = defaultNS): InitOptions {
  return {
    // debug: true, // 디버그 모드 설정 (콘솔 로그 보기)
    supportedLngs: locales, // 지원하는 언어 목록 설정
    fallbackLng, // 언어 감지 실패 시 사용할 기본 언어
    lng: lang, // 초기 언어 설정
    fallbackNS: defaultNS, // 네임스페이스 감지 실패 시 사용할 기본 네임스페이스
    defaultNS, // 기본 네임스페이스 설정
    ns, // 사용할 네임스페이스 설정
  };
}
