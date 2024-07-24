"use client";

import { useEffect } from "react";
import i18next, { i18n } from "i18next";
import {
  initReactI18next,
  useTranslation as useTransAlias,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { type LocaleTypes, getOptions, locales } from "./settings";

const runsOnServerSide = typeof window === "undefined";

// 클라이언트 측에서 i18next 초기화
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: LocaleTypes, namespace: string) => {
      return import(`./locales/${language}/${namespace}.json`); // 언어와 네임스페이스에 따라 번역 파일을 동적으로 가져옴
    }),
  )
  .init({
    ...getOptions(),
    lng: undefined, // detect the language on the client
    detection: {
      order: ["path"],
    },
    preload: runsOnServerSide ? locales : [],
  });

// 번역 훅을 사용하는 커스텀 훅 정의
export function useTranslation(lng: LocaleTypes, ns: string) {
  const translator = useTransAlias(ns);
  const { i18n } = translator;

  // 클라이언트 측에서 실행 중인 경우 커스텀 번역 구현 사용
  useCustomTranslationImplem(i18n, lng);

  // 서버 측에서 실행 중인 경우
  if (runsOnServerSide && lng) {
    i18n.changeLanguage(lng);
  }
  return translator;
}

// 클라이언트 측에서 언어 변경을 처리하는 커스텀 훅
function useCustomTranslationImplem(i18n: i18n, lng: LocaleTypes) {
  // 서버측 실행 시 return
  // This effect changes the language of the application when the lng prop changes.
  useEffect(() => {
    if (runsOnServerSide || !lng) return; // || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
}
