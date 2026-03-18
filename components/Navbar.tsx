"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Start", href: "#home" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "O mnie", href: "#about" },
  { name: "Blog", href: "#blog" },
  { name: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Camera className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
          <span className="text-xl font-serif font-bold tracking-tight text-white uppercase">
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
          <button className="px-5 py-2 bg-accent text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Galerie
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 absolute top-full left-0 right-0 overflow-hidden"
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
              <button className="px-8 py-3 bg-accent text-black text-sm font-bold uppercase tracking-widest">
                Galerie
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
