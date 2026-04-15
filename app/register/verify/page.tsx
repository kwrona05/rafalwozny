"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, AlertCircle, ArrowRight, Mail } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verifyOTP } = useAuth();
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!uid) {
      router.push("/register");
    }
  }, [uid, router]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Filter out error when user starts typing again
    if (error) setError("");

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newCode = [...code];
    
    pastedData.forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newCode[index] = char;
      }
    });
    
    setCode(newCode);
    if (pastedData.length > 0) {
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Wprowadź pełny 6-cyfrowy kod.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await verifyOTP(uid || "", fullCode);
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(result.error || "Nieprawidłowy kod weryfikacyjny.");
      }
    } catch (err) {
      setError("Wystąpił błąd podczas weryfikacji.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    if (code.every(digit => digit !== "") && !isSuccess && !isLoading) {
      handleSubmit();
    }
  }, [code]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 border border-white/5 p-12 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
      
      <div className="mb-12 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">Weryfikacja Konta</h1>
        <p className="text-muted text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <Mail className="w-3 h-3" /> Kod został wysłany na Twój e-mail
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="flex justify-between gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isLoading || isSuccess}
              className="w-12 h-16 md:w-14 md:h-20 bg-black border border-white/10 text-white text-center text-2xl font-serif focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all disabled:opacity-50"
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/10 border border-red-500/20 p-4 flex items-center justify-center gap-3 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          ) : isSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 p-4 flex items-center justify-center gap-3 text-green-500 text-[10px] font-bold uppercase tracking-widest text-center"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Weryfikacja zakończona sukcesem! Przekierowanie...
            </motion.div>
          ) : (
            <motion.p 
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[10px] text-muted font-bold uppercase tracking-widest leading-loose"
            >
              Wprowadź 6-cyfrowy kod otrzymany w wiadomości e-mail. <br />
              <span className="text-accent underline cursor-not-allowed opacity-50">Wyślij kod ponownie</span>
            </motion.p>
          )}
        </AnimatePresence>

        <button
          disabled={isLoading || isSuccess}
          type="submit"
          className="w-full bg-accent text-black py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isSuccess ? (
            <ShieldCheck className="w-4 h-4" />
          ) : (
            <>Weryfikuj <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>
      
      {/* Dev Hint */}
      <div className="mt-8 pt-8 border-t border-white/5 text-center">
        <p className="text-[9px] text-muted italic font-light">
          Wskazówka: Kod znajdziesz w konsoli deweloperskiej (F12) oraz w bazie Firestore.
        </p>
      </div>
    </motion.div>
  );
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col justify-center px-6 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/2 rounded-full blur-[120px] -z-10" />

      <div className="max-w-md w-full mx-auto">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        }>
          <VerifyContent />
        </Suspense>
      </div>
    </main>
  );
}
