import { createContext, useContext } from "react";
import type { GeneratedPolicy } from "./policyEngine";

export interface AppStore {
  policies: GeneratedPolicy[];
  addPolicy: (p: GeneratedPolicy) => void;
}

export const StoreContext = createContext<AppStore>({
  policies: [],
  addPolicy: () => {},
});

export const useStore = () => useContext(StoreContext);
