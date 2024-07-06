import { TStockType } from "@/app/types/stockType";
import { create } from "zustand";

type TStockStoreState = {
  stockList: TStockType[];
  setStockList: (data: TStockType[]) => void;
};

export const useStockStore = create<TStockStoreState>((set) => ({
  stockList: [],
  setStockList: (data) => set({ stockList: data }),
}));
