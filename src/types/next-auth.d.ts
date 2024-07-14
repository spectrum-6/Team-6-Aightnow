import NextAuth from "next-auth";
import { UserInfo } from "@/types/UserInfo";

declare module "next-auth" {
  interface Session {
    user: UserInfo & {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    provider?: string; // 명시적으로 provider 필드 추가
  }
}
