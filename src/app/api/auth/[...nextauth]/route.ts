import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { firestore } from "@/firebase/firebasedb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserInfo, IUserStockCollection } from "@/types/UserInfo";
import { adminAuth } from "@/firebase/firebaseAdmin";

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
    async signIn({ user, account, profile }) {
      if (account && user) {
        try {
          // Firebase Admin SDK를 사용하여 사용자 생성 또는 업데이트
          let firebaseUser;
          try {
            firebaseUser = await adminAuth.getUser(user.id);
          } catch (error) {
            // 사용자가 존재하지 않으면 새로 생성
            firebaseUser = await adminAuth.createUser({
              uid: user.id,
              email: user.email || "",
              displayName: user.name,
              photoURL: user.image,
            });
          }

          // Firestore에 사용자 정보 저장 또는 업데이트
          const userRef = doc(firestore, "users", user.id);
          const userSnapshot = await getDoc(userRef);

          let userData: UserInfo = {
            id: user.id,
            uid: user.id,
            email: user.email || null,
            username: user.name || null,
            profileImgUrl: user.image || null,
            createdAt:
              firebaseUser.metadata.creationTime || new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            transLang: "en",
            socialProvider: account.provider,
            registrationCompleted: userSnapshot.exists()
              ? userSnapshot.data()?.registrationCompleted || false
              : false,
            isNewUser: !userSnapshot.exists(),
            userStockCollection: userSnapshot.exists()
              ? userSnapshot.data()?.userStockCollection || {
                  recentSearch: [],
                  recentViews: [],
                  watchList: [],
                }
              : ({
                  recentSearch: [],
                  recentViews: [],
                  watchList: [],
                } as IUserStockCollection),
            phoneNumber: null,
          };

          // 소셜 로그인 제공자별로 추가 정보 처리
          switch (account.provider) {
            case "google":
              // Google은 기본적으로 이름을 제공하지만, 전화번호는 안줌
              userData.username = user.name;
              break;
            case "naver":
              // Naver profile 정보에서 이름과 전화번호 추출
              if (profile) {
                userData.username = (profile as any).name;
                userData.phoneNumber = (profile as any).mobile;
              }
              break;
            case "kakao":
              // Kakao profile 정보에서 이름과 전화번호 추출
              if (profile) {
                userData.nickname = (profile as any).properties?.nickname;
                userData.username = (profile as any).name;
                userData.phoneNumber = (
                  profile as any
                ).kakao_account?.phone_number;
              }
              break;
          }
          // Firebase Firestore에 저장하기 전에 undefined 값 제거
          Object.keys(userData).forEach((key) => {
            if (userData[key as keyof UserInfo] === undefined) {
              delete userData[key as keyof UserInfo];
            }
          });

          await setDoc(userRef, userData, { merge: true });

          // Firebase 커스텀 토큰 생성
          const customToken = await adminAuth.createCustomToken(user.id);
          (user as User & { firebaseToken?: string }).firebaseToken =
            customToken;
        } catch (error) {
          console.error("Firebase 사용자 생성/업데이트 중 오류 발생:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.firebaseToken = (
          user as User & { firebaseToken?: string }
        ).firebaseToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.firebaseToken = token.firebaseToken;
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
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
