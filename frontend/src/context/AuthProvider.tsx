
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { Role, User } from "./Type";

const normalizeRole = (role: number | string): Role => {
  if (role === 1 || role === "admin" || role === "ADMIN") {
    return "admin";
  }

  if (role === 2 || role === "recruiter" || role === "RECRUITER") {
    return "recruiter";
  }

  return "candidate";
};

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const token = window.localStorage.getItem("token");
  const userString = window.localStorage.getItem("user");

  if (!token || !userString) return null;

  try {
    return JSON.parse(userString) as User;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [loading] = useState(false);

  const login = (data: { token: string; role: number | string; id?: number; name?: string; avatar?: string; email?: string }) => {
    const formattedRole = normalizeRole(data.role);
    const userData: User = {
      token: data.token,
      role: formattedRole,
      id: data.id ?? 0,
      name: data.name ?? "Google User",
      avatar: data.avatar,
      email: data.email,
    };

    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};