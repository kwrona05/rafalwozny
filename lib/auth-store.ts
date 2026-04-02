"use client";

import { useState, useEffect } from "react";
import { User, MOCK_ADMIN } from "./mock-data";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("rw_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, pass: string) => {
    // Mock login logic
    if (email === MOCK_ADMIN.email && pass === "admin123") {
      const adminUser = MOCK_ADMIN;
      localStorage.setItem("rw_user", JSON.stringify(adminUser));
      setUser(adminUser);
      return true;
    }
    
    // Mock regular user
    const newUser: User = { id: Math.random().toString(), email, role: "user", name: email.split("@")[0] };
    localStorage.setItem("rw_user", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("rw_user");
    setUser(null);
  };

  const register = (email: string, name: string) => {
    const newUser: User = { id: Math.random().toString(), email, role: "user", name };
    localStorage.setItem("rw_user", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  return { user, isLoading, login, logout, register, isAdmin: user?.role === "admin" };
};
