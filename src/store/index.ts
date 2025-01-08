import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface QuoraStore {
  bears: number;
  addABear: () => void;
}

export const useQuoraStore = create<QuoraStore>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
