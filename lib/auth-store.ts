"use client";

import { useState, useEffect } from "react";
import { User as AppUser } from "./mock-data";

export interface ExtendedUser extends AppUser {
  isVerified: boolean;
}

// Mock Password Configuration
const MOCK_PASSWORD = "test1234";

export const useAuth = () => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount (Session Persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem("rw_mock_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse mock user", e);
        localStorage.removeItem("rw_mock_user");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (email: string, name: string, pass: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const role = email.toLowerCase() === "admin@rafalwozny.pl" ? "admin" : "user";
    const newUser: ExtendedUser = {
      id: `mock-${Date.now()}`,
      email,
      name,
      role,
      isVerified: true // Auto-verify for easy testing
    };

    setUser(newUser);
    localStorage.setItem("rw_mock_user", JSON.stringify(newUser));
    return { success: true, uid: newUser.id, error: undefined as string | undefined };
  };

  const login = async (email: string, pass: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple password check
    if (pass !== MOCK_PASSWORD) {
      return { 
        success: false, 
        error: `Nieprawidłowe hasło testowe. Użyj: ${MOCK_PASSWORD}` 
      };
    }

    const role = email.toLowerCase() === "admin@rafalwozny.pl" ? "admin" : "user";
    const mockUser: ExtendedUser = {
      id: `mock-${email.split('@')[0]}`,
      email,
      name: email === "admin@rafalwozny.pl" ? "Rafał Woźny (Admin)" : "Użytkownik Testowy",
      role,
      isVerified: true
    };

    setUser(mockUser);
    localStorage.setItem("rw_mock_user", JSON.stringify(mockUser));
    return { success: true, isVerified: true, uid: mockUser.id, error: undefined as string | undefined };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("rw_mock_user");
    return { success: true };
  };

  const verifyOTP = async (uid: string, code: string) => {
    // Mock OTP always succeeds
    if (user && user.id === uid) {
      const updatedUser = { ...user, isVerified: true };
      setUser(updatedUser);
      localStorage.setItem("rw_mock_user", JSON.stringify(updatedUser));
    }
    return { success: true, error: undefined as string | undefined };
  };

  return { 
    user, 
    isLoading, 
    login, 
    logout, 
    register, 
    verifyOTP,
    isAdmin: user?.role === "admin",
    isVerified: user?.isVerified
  };
};

