import NextAuth from "next-auth";
import { UserInfo } from "./UserInfo";

declare module "next-auth" {
  interface Session {
    user: UserInfo & {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    provider?: string;
    firebaseToken?: string;
    accessToken?: string;
  }

  interface User {
    firebaseToken?: string;
    accessToken?: string;
  }
}

interface Profile {
  kakao_account?: {
    phone_number?: string;
  };
  properties?: {
    nickname?: string;
  };
}

declare module "next-auth/jwt" {
  interface JWT {
    firebaseToken?: string;
  }
}
