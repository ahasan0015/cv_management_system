import { createContext } from "react";
import type { AuthContextType } from "./Type";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);