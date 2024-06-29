import { NextResponse, NextRequest } from "next/server";
import { fallbackLng, locales } from "@/utils/localization/settings";

export function middleware(request: NextRequest) {
  // ---i18n---
  const pathname = request.nextUrl.pathname;

  // 기본 언어가 경로명에 포함되어 있는지 확인
  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    // 들어온 요청이 기본 언어 (ko) 인 경우, 경로에서 제거
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLng}`,
          pathname === `/${fallbackLng}` ? "/" : "",
        ),
        request.url,
      ),
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  // 경로명에 언어 코드가 없다면, 기본 언어로 이동하게 함
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${pathname}`, request.url),
    );
  } // 만약 et/login 요청이 온다면 ko/login 으로 변경
}

export const config = {
  // 아래 경로에서는 미들웨어를 요청하지 않음
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)",
  ],
};
