export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Prints" | "Presets" | "Workshops";
  image: string;
  description: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
};

export type Exhibition = {
  id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
  place: string;
};

export type User = {
  id: string;
  email: string;
  role: "admin" | "user";
  name: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Tatry Wysokie - Wydruk Kolekcjonerski",
    price: 450,
    category: "Prints",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80",
    description: "Limitowana edycja wydruku na papierze archiwalnym Hanemühle. Każdy egzemplarz numerowany i podpisany.",
  },
  {
    id: "2",
    name: "Golden Hour Presets Pack",
    price: 199,
    category: "Presets",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80",
    description: "Zestaw 10 autorskich presetów Lightroom, które nadadzą Twoim zdjęciom górskim niepowtarzalny klimat.",
  },
  {
    id: "3",
    name: "Warsztaty: Fotografia Pejzażowa w Karkonoszach",
    price: 1200,
    category: "Workshops",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    description: "Trzydniowe warsztaty w sercu Karkonoszy. Nauka kompozycji, pracy ze światłem i postprodukcji.",
  },
];

export const MOCK_PORTFOLIO: PortfolioItem[] = [];


export const MOCK_EXHIBITIONS: Exhibition[] = [];

export const MOCK_ADMIN: User = {
  id: "admin",
  email: "admin@rafalwozny.pl",
  role: "admin",
  name: "Rafał Woźny",
};
