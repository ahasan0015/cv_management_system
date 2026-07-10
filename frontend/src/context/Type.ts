export type Role = "admin" | "recruiter" | "candidate";

export interface User {
  token: string;
  role: Role;
  id: number;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: { token: string; role: number | string; id: number; name: string }) => void;
  logout: () => void;
  loading: boolean;
}