import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserInfo, IUserStockCollection } from "@/types/UserInfo";

const handler = NextAuth({
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
    async signIn({ user, account }) {
      if (account && user) {
        const userRef = doc(firestore, "users", user.id);
        const userSnapshot = await getDoc(userRef);

        let userData: UserInfo = {
          id: user.id,
          uid: user.id,
          email: user.email || null,
          username: user.name || null,
          profileImgUrl: user.image || null,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          transLang: "en",
          socialProvider: account.provider,
          registrationCompleted: false,
          isNewUser: !userSnapshot.exists(),
          watchlist: [],
          userStockCollection: {
            recentSearch: [],
            recentViews: [],
            watchList: [],
          } as IUserStockCollection,
        };

        if (!userSnapshot.exists()) {
          // 새 사용자인 경우, Firestore에 사용자 정보 저장
          await setDoc(userRef, userData);
        } else {
          // 기존 사용자인 경우, 마지막 로그인 시간 업데이트
          await setDoc(
            userRef,
            { lastLoginAt: new Date().toISOString() },
            { merge: true },
          );
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        // Firestore에서 추가 사용자 정보 가져오기
        const userRef = doc(firestore, "users", token.sub!);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as UserInfo;
          session.user = { ...session.user, ...userData };
        }
        session.provider = token.provider as string;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
