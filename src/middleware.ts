import { NextResponse, NextRequest } from "next/server";
import { fallbackLng, locales } from "@/utils/localization/settings";

// 로그인 후 접근 가능한 페이지 리스트
const restrictedPages = [
  "main",
  "news",
  "search",
  "report",
  "settings",
  "like",
  "accountCancle",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // NextAuth 관련 경로는 그대로 통과
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 로그인하지 않은 사용자(userAccessToken check)가
  // 제한된 페이지에 접근할 경우(isRestricted)  redirect
  const userAccessToken = request.cookies.get("userAccessToken") || "";
  const isRestricted = restrictedPages.some((page) => pathname.includes(page));

  if (userAccessToken === "" && isRestricted) {
    const locale =
      locales.find((locale) => pathname.startsWith(`/${locale}`)) ||
      fallbackLng;

    const newUrl = pathname.includes("/main")
      ? `/${locale}`
      : `/${locale}/login`;

    return NextResponse.redirect(new URL(newUrl, request.url));
  }

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
  // ( 클라이언트에서 /main 으로 요청 시 서버는 /ko/main 을 반환 함)
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  // 아래 경로에서는 미들웨어를 요청하지 않음
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)",
  ],
};
