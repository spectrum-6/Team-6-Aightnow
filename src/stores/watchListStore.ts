import { create } from "zustand";

// 관심종목 삭제 시 symbolCode를 저장하기 위함
type TDeleteWatchListStore = {
  symbolCode: string;
  setSymbolCode: (symbolCode: string) => void;
};

export const useDeleteWatchList = create<TDeleteWatchListStore>((set) => ({
  symbolCode: "",
  setSymbolCode: (symbolCode) => set({ symbolCode }),
}));
