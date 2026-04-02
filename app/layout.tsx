import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { Metadata } from "next";
import { StoreProvider } from "@/lib/data-store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafał Woźny | Photography",
  description: "Portfolio i Sklep Autorski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-black`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
