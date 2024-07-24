export interface UserInfo {
  id?: string;
  uid?: string;
  password?: string | null;
  email?: string | null;
  username?: string | null;
  phoneNumber?: string | null;
  birthDate?: string | null;
  profileImgUrl?: string | null;
  nickname?: string;
  createdAt?: string;
  lastLoginAt?: string;
  transLang?: string;
  socialProvider?: string | null;
  registrationCompleted?: boolean;
  isNewUser?: boolean;
  // watchlist?: string[]; // 회원가입 시 symbolCode만 저장
  userStockCollection?: IUserStockCollection;
  [key: string]: any; // 문자열 인덱스 시그니처 추가
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
