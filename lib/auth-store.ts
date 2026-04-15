"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { User as AppUser, MOCK_ADMIN } from "./mock-data";

export interface ExtendedUser extends AppUser {
  isVerified: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: userData.name || "",
            role: userData.role || "user",
            isVerified: userData.isVerified || false
          });
        } else {
          // Fallback if doc doesn't exist yet (e.g. during registration flow)
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "",
            role: "user",
            isVerified: false
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, name: string, pass: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const firebaseUser = userCredential.user;

      // Assign admin role if it's the specific admin email
      const role = email.toLowerCase() === "admin@rafalwozny.pl" ? "admin" : "user";

      // Create user profile in Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name,
        email,
        role,
        isVerified: false,
        createdAt: serverTimestamp()
      });

      return { success: true, uid: firebaseUser.uid };
    } catch (error: any) {
      console.error("Registration Error:", error);
      return { success: false, error: error.message };
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      let isVerified = false;
      if (userDoc.exists()) {
        isVerified = userDoc.data().isVerified || false;
      }

      return { success: true, isVerified, uid: userCredential.user.uid };
    } catch (error: any) {
      console.error("Login Error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const verifyOTP = async (uid: string, code: string) => {
    try {
      const otpDoc = await getDoc(doc(db, "otps", uid));
      if (otpDoc.exists() && otpDoc.data().code === code) {
        // Check expiration (optional, set to 15 mins)
        const createdAt = otpDoc.data().createdAt?.toDate();
        if (createdAt && (new Date().getTime() - createdAt.getTime()) > 15 * 60 * 1000) {
          return { success: false, error: "Kod wygasł." };
        }

        // Mark user as verified
        await setDoc(doc(db, "users", uid), { isVerified: true }, { merge: true });
        
        // Refresh local user state if currently logged in
        if (user && user.id === uid) {
          setUser({ ...user, isVerified: true });
        }
        
        return { success: true };
      }
      return { success: false, error: "Nieprawidłowy kod." };
    } catch (error: any) {
      console.error("Verification Error:", error);
      return { success: false, error: error.message };
    }
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
