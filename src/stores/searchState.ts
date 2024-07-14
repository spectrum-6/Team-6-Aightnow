// store/useStore.ts
import create from "zustand";

interface SearchState {
  recentSearches: string[];
  addSearch: (search: string) => void;
  clearSearches: () => void;
  setRecentSearches: (searches: string[]) => void;
}

export const useStore = create<SearchState>((set) => ({
  recentSearches: [],
  addSearch: (search) =>
    set((state) => {
      const updatedSearches = [
        search,
        ...state.recentSearches.filter((item) => item !== search),
      ].slice(0, 10);
      return { recentSearches: updatedSearches };
    }),
  clearSearches: () => set({ recentSearches: [] }),
  setRecentSearches: (searches) => set({ recentSearches: searches }),
}));
