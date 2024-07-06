import { create } from "zustand";

// 관심종목 페이지에서 userStock 컬렉션 조회 시 조회값을 저장

// 1. 최근 검색어 (단어)
type TRecentSearchState = {
  recentSearch: string[];
  setRecentSearch: (data: string[]) => void;
};

export const useRecentSearchStore = create<TRecentSearchState>((set) => ({
  recentSearch: [],
  setRecentSearch: (data: string[]) => set({ recentSearch: data }),
}));

// 2. 최근 조회 종목
type TRecentViewState = {
  recentViews: string[];
  setRecentViews: (data: string[]) => void;
};

export const useRecentViewStore = create<TRecentViewState>((set) => ({
  recentViews: [],
  setRecentViews: (data: string[]) => set({ recentViews: data }),
}));
