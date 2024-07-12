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
  emailVerified?: boolean;
  createdAt?: string;
  lastLoginAt?: string;
  transLang?: string;
  socialProvider?: string;
  registrationCompleted?: boolean;
  isNewUser?: boolean;
  watchlist?: string[]; // 회원가입 시 symbolCode만 저장
  userStockCollection?: IUserStockCollection;
}

// 회원가입 이후 다른 페이지에서 사용할 WatchlistItem
export interface WatchlistItem {
  symbolCode: string;
  timestamp: string;
}

export interface IUserStockCollection {
  recentSearch: string[];
  recentViews: string[];
  watchList: string[]; //symbolCode만
}
