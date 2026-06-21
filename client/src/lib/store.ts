import { createContext, useContext } from "react";
import type { Policy } from "@shared/schema";

export interface AppStore {
  policies: Policy[];
  addPolicy: (p: Policy) => void;
}

export const StoreContext = createContext<AppStore>({
  policies: [],
  addPolicy: () => {},
});

export const useStore = () => useContext(StoreContext);
