import create from "zustand";
import { persist } from "zustand/middleware";

export interface SubscribeEmailState {
  hasSubscribed: boolean;
  setHasSubscribed: () => void;
  clearHasSubscribed: () => void;
}

export const useSubscribeState = create<SubscribeEmailState>()(
  persist(
    (set) => ({
      hasSubscribed: false,
      setHasSubscribed: () => set((state) => ({ hasSubscribed: true })),
      clearHasSubscribed: () => set((state) => ({ hasSubscribed: false })),
    }),
    {
      name: "subscribe-state", // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
