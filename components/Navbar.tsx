"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera, LogOut, LayoutDashboard, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-store";
import { useCart } from "@/lib/cart-store";

const navLinks = [
  { name: "Start", href: "/" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Wystawy i prelekcje", href: "/exhibitions" },
  { name: "Sklep", href: "/shop" },
  { name: "Kontakt", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { totalItems, isReady } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Camera className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
          <span className="text-xl font-serif font-bold tracking-tight text-white uppercase text-wrap">
            Rafał Woźny
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-6 pl-6 border-l border-white/10">
            {/* Cart Icon */}
            <Link href="/cart" className="relative group text-muted hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {isReady && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className="p-2 text-accent hover:bg-white/5 rounded-full transition-colors"
                    title="Panel Admina"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="p-2 text-muted hover:text-white transition-colors"
                  title="Wyloguj"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 bg-accent text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Logowanie
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-6 md:hidden">
          <Link href="/cart" className="relative text-muted">
            <ShoppingCart className="w-6 h-6" />
            {isReady && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 absolute top-full left-0 right-0 overflow-hidden border-t border-white/5"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-muted hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="text-accent uppercase text-sm font-bold tracking-widest"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="text-muted uppercase text-sm font-bold tracking-widest"
                  >
                    Wyloguj
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-accent text-black text-sm font-bold uppercase tracking-widest"
                >
                  Logowanie
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
