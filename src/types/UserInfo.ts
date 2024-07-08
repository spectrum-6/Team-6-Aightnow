export interface UserInfo {
  id?: string;
  uid?: string;
  password?: string;
  email?: string | null;
  username?: string | null;
  phoneNumber?: string;
  birthDate?: string;
  profileImgUrl?: string;
  nickname?: string;
  interests?: string[];
  emailVerified?: boolean; // 이메일 인증 여부
  createdAt?: string; // 계정 생성 시간
  lastLoginAt?: string; // 마지막 로그인 시간
}
