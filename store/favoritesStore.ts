import { create } from "zustand";

interface FavoritesStore {
  ids: Set<string>;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  count: () => number;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  ids: new Set(),

  toggle: (id) =>
    set((state) => {
      const next = new Set(state.ids);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { ids: next };
    }),

  isFavorite: (id) => get().ids.has(id),

  count: () => get().ids.size,
}));
