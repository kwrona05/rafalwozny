"use client";

import { useState, useEffect } from "react";
import { User as AppUser } from "./mock-data";

export interface ExtendedUser extends AppUser {
  isVerified: boolean;
}

// Admin Configuration
const ADMIN_LOGIN = "yop9ha_12345";
const ADMIN_PASSWORD = "Zachwyconyswiatem!@2";

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

  const register = async (_email: string, _name: string, _pass: string) => {
    // Registration is disabled for standard users
    return { success: false, uid: "", error: "Rejestracja jest wyłączona." };
  };

  const login = async (loginVal: string, passVal: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Verify admin credentials
    if (loginVal === ADMIN_LOGIN && passVal === ADMIN_PASSWORD) {
      const adminUser: ExtendedUser = {
        id: "admin-user-id",
        email: "admin@rafalwozny.pl",
        name: "Rafał Woźny (Admin)",
        role: "admin",
        isVerified: true
      };

      setUser(adminUser);
      localStorage.setItem("rw_mock_user", JSON.stringify(adminUser));
      return { success: true, isVerified: true, uid: adminUser.id, error: undefined as string | undefined };
    }

    return { 
      success: false, 
      error: "Nieprawidłowy login lub hasło." 
    };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("rw_mock_user");
    return { success: true };
  };

  const verifyOTP = async (uid: string, _code: string) => {
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

