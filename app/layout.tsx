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
  title: "Rafał Woźny | Fotografia Krajobrazowa, Presety i Wydruki",
  description: "Galeria autorska i sklep internetowy fotografa krajobrazowego Rafała Woźnego. Odkryj wyjątkowe wydruki kolekcjonerskie z Karkonoszy, Tatr i Beskidów, presety Lightroom oraz autorskie warsztaty.",
  keywords: ["fotografia krajobrazowa", "wydruki kolekcjonerskie", "presety lightroom", "warsztaty fotograficzne", "Tatry", "Karkonosze", "Beskidy", "Rafał Woźny"],
  authors: [{ name: "Rafał Woźny", url: "https://rafalwozny.pl" }],
  creator: "Rafał Woźny",
  publisher: "Rafał Woźny",
  alternates: {
    canonical: "https://rafalwozny.pl",
  },
  openGraph: {
    title: "Rafał Woźny | Fotografia Krajobrazowa, Presety i Wydruki",
    description: "Galeria autorska i sklep internetowy fotografa krajobrazowego Rafała Woźnego. Odkryj wyjątkowe wydruki kolekcjonerskie z Karkonoszy, Tatr i Beskidów.",
    url: "https://rafalwozny.pl",
    siteName: "Rafał Woźny Photography",
    images: [
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Rafał Woźny - Fotografia Krajobrazowa",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <meta name="geo.region" content="PL-MA" />
        <meta name="geo.placename" content="Zakopane, Tatry, Karkonosze, Polska" />
        <meta name="geo.position" content="49.299;19.949" />
        <meta name="ICBM" content="49.299, 19.949" />
      </head>
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
