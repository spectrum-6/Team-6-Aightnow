import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: any }) {
      if (account) {
        token.provider = account.provider;
        // 여기에서 사용자 정보를 확인하고 isNewUser와 registrationCompleted를 설정
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.provider = token.provider;
      (session as any).isNewUser = token.isNewUser;
      (session as any).registrationCompleted = token.registrationCompleted;
      return session;
    }, // 소셜 로그인 성공 후 추가 정보 처리를 위해 커스텀 라우트 호출
    async signIn({ user, account }) {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "socialLogin",
          provider: account?.provider,
          email: user.email,
          username: user.name,
          image: user.image,
        }),
      });

      if (!response.ok) {
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
