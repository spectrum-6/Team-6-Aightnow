import { TWatchList } from "@/app/types/userStockType";
import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

// 관심종목 페이지에서 userStock 컬렉션 조회 시 조회값을 저장
type TWatchListStoreState = {
  watchList: TWatchList[];
  setWatchList: (data: TWatchList[]) => void;
};

export const useWatchListStore = create<TWatchListStoreState>((set) => ({
  watchList: [],
  setWatchList: (data: TWatchList[]) => set({ watchList: data }),
}));

// 관심종목 삭제 시 symbolCode를 저장하기 위함
type TDeleteWatchListStore = {
  symbolCode: string;
  setSymbolCode: (symbolCode: string) => void;
};

export const useDeleteWatchList = create<TDeleteWatchListStore>((set) => ({
  symbolCode: "",
  setSymbolCode: (symbolCode) => set({ symbolCode }),
}));
