
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { Role, User } from "./Type";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      setUser(JSON.parse(userString));
    }
    setLoading(false);
  }, []);

  const login = (data: { token: string; role: number | string; id: number; name: string }) => {
    const formattedRole: Role = 
    (data.role == 1 || data.role === "admin") ? "admin" : 
    (data.role == 2 || data.role === "recruiter") ? "recruiter" : "candidate";

    const userData: User = { 
      token: data.token,
      role: formattedRole, 
      id: data.id, 
      name: data.name 
    };
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};