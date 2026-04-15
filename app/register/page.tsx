"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, UserPlus, LogIn, Loader2, AlertCircle } from "lucide-react";
import { db } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password || !name) {
      setError("Proszę wypełnić wszystkie pola.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(email, name, password);
      
      if (result.success && result.uid) {
        const otpCode = generateOTP();
        
        // Store OTP in Firestore
        await setDoc(doc(db, "otps", result.uid), {
          code: otpCode,
          email: email,
          createdAt: serverTimestamp()
        });

        // For demo purposes, we'll log the code or show it (since we can't send real emails here)
        console.log("TWÓJ KOD WERYFIKACYJNY:", otpCode);
        
        // Redirect to verification page
        router.push(`/register/verify?uid=${result.uid}`);
      } else {
        setError(result.error || "Wystąpił błąd podczas rejestracji.");
      }
    } catch (err) {
      console.error("Registration handle error:", err);
      setError("Wystąpił nieoczekiwany błąd.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col justify-center px-6 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-md w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-white/5 p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1 h-full bg-accent opacity-50" />
          <div className="absolute bottom-0 left-0 w-1 h-full bg-accent opacity-30" />
          
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Dołącz do Nas</h1>
            <p className="text-muted text-sm font-light uppercase tracking-widest text-wrap">Stwórz konto klienta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase tracking-widest"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="relative group">
                <User className="absolute left-0 top-3 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                <input
                  disabled={isLoading}
                  type="text"
                  placeholder="Imię i Nazwisko"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-10 text-white placeholder-muted focus:outline-none focus:border-accent transition-all font-light disabled:opacity-50"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-0 top-3 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                <input
                  disabled={isLoading}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-10 text-white placeholder-muted focus:outline-none focus:border-accent transition-all font-light disabled:opacity-50"
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-0 top-3 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                <input
                  disabled={isLoading}
                  type="password"
                  placeholder="Hasło (min. 6 znaków)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-10 text-white placeholder-muted focus:outline-none focus:border-accent transition-all font-light disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-white text-black py-4 mt-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                    Zarejestruj Się
                  </>
                )}
              </button>
              
              <div className="flex flex-col items-center gap-4 text-[10px] text-muted font-bold uppercase tracking-widest">
                <span>Masz już konto?</span>
                <Link 
                  href="/login"
                  className="text-white hover:text-accent transition-colors flex items-center gap-2"
                >
                  Zaloguj Się Teraz <LogIn className="w-3.5 h-3.5 text-accent" />
                </Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

