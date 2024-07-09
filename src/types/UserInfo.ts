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
  emailVerified?: boolean;
  createdAt?: string;
  lastLoginAt?: string;
  transLang?: string;
  socialProvider?: string;
  socialId?: string;
  registrationCompleted?: boolean;
  isNewUser?: boolean;
}
