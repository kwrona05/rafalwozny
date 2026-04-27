"use client";

import React, { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Home, Mail, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-store";
import { useSearchParams } from "next/navigation";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear cart immediately on landing
    clearCart();

    async function fetchTransaction() {
      if (!transactionId) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "transactions", transactionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTransaction({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching transaction:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTransaction();
  }, [transactionId]);

  const generatePDF = () => {
    if (!transaction) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text("RAFAŁ WOŹNY", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("ART GALLERY & STORE", 105, 27, { align: "center" });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);

    // Order Info
    doc.setFontSize(14);
    doc.text("RACHUNEK / RECEIPT", 20, 50);
    
    doc.setFontSize(10);
    doc.text(`Nr zamówienia: ${transaction.id}`, 20, 60);
    doc.text(`Data: ${transaction.createdAt?.toDate ? transaction.createdAt.toDate().toLocaleString() : new Date().toLocaleString()}`, 20, 67);
    doc.text(`Metoda płatności: ${transaction.paymentMethod}`, 20, 74);

    // Customer Info
    doc.setFontSize(12);
    doc.text("DANE KLIENTA", 120, 50);
    doc.setFontSize(10);
    doc.text(transaction.customer.fullName, 120, 60);
    doc.text(transaction.customer.address, 120, 67);
    doc.text(`${transaction.customer.zipCode} ${transaction.customer.city}`, 120, 74);
    doc.text(transaction.customer.email, 120, 81);

    // Items Table
    const tableData = transaction.items.map((item: any) => [
      item.name,
      item.quantity,
      `${item.price} PLN`,
      `${(item.price * item.quantity).toFixed(2)} PLN`
    ]);

    autoTable(doc, {
      startY: 95,
      head: [["Produkt", "Ilość", "Cena jedn.", "Suma"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [30, 30, 30], textColor: [255, 255, 255] },
      margin: { top: 95 },
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`SUMA CAŁKOWITA: ${transaction.totalAmount} PLN`, 190, finalY, { align: "right" });

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Dziękujemy za zakupy w galerii Rafała Woźnego.", 105, 280, { align: "center" });

    doc.save(`rachunek-${transaction.id}.pdf`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="max-w-xl w-full bg-zinc-950 border border-white/5 p-12 text-center shadow-2xl shadow-accent/5 overflow-hidden relative"
    >
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className="w-24 h-24 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-accent" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
          Zamówienie <br /> <span className="text-accent underline underline-offset-8 decoration-white/10 italic">Przyjęte!</span>
        </h1>

        <p className="text-muted text-lg mb-12 font-light leading-relaxed">
          Dziękujemy za zaufanie. Twoje zamówienie zostało przekazane do realizacji. Potwierdzenie wysłaliśmy na Twój adres e-mail.
        </p>

        {transaction ? (
          <div className="flex flex-col gap-6 p-8 bg-black/40 border border-white/5 mb-12 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                <FileText className="w-4 h-4 text-accent" /> Dokument zamówienia
              </div>
              <button 
                onClick={generatePDF}
                className="text-[10px] font-bold text-accent hover:text-white transition-colors uppercase tracking-widest underline underline-offset-4"
              >
                Pobierz PDF
              </button>
            </div>
            <p className="text-muted text-xs font-light leading-relaxed">
               Możesz pobrać rachunek w formacie PDF klikając powyższy przycisk. Dokument zawiera szczegóły Twojego zamówienia.
            </p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center gap-3 py-8 mb-12 border border-white/5 bg-black/40">
            <Loader2 className="w-4 h-4 text-accent animate-spin" />
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Pobieranie danych zamówienia...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6 p-8 bg-black/40 border border-white/5 mb-12 text-left">
            <div className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
               <Mail className="w-4 h-4 text-accent" /> Sprawdź pocztę
            </div>
            <p className="text-muted text-xs font-light leading-relaxed">
               Znajdziesz tam szczegóły zamówienia oraz informacje o statusie dostawy. W razie pytań skontaktuj się z nami.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all"
          >
            Wróć do Sklepu <ShoppingBag className="w-4 h-4" />
          </Link>
          <Link 
            href="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent border border-white/10 text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:border-white transition-all"
          >
            Strona Główna <Home className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 flex items-center justify-center font-sans antialiased text-foreground">
      <Navbar />
      <Suspense fallback={
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}

