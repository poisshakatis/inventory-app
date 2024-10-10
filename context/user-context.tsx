import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

import { CustomJwtPayload } from "@/app/lib/definitions";

export interface UserContextType {
  isAuthenticated: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    setIsAuthenticated(!!accessToken);
    if (accessToken) {
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);

      setEmail(decoded["email"]);
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setEmail(email);
  };

  const logout = () => {
    document.cookie = "access_token=; Max-Age=0; path=/";
    document.cookie = "refresh_token=; Max-Age=0; path=/";
    setIsAuthenticated(false);
    setEmail("");
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
