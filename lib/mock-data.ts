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

export const MOCK_PRODUCTS: Product[] = [];

export const MOCK_PORTFOLIO: PortfolioItem[] = [];


export const MOCK_EXHIBITIONS: Exhibition[] = [];

export const MOCK_ADMIN: User = {
  id: "admin",
  email: "admin@rafalwozny.pl",
  role: "admin",
  name: "Rafał Woźny",
};

export type SiteSettings = {
  siteName: string;
  siteLogo: string;
  contactPhone: string;
  contactEmail: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Rafał Woźny",
  siteLogo: "",
  contactPhone: "",
  contactEmail: "",
  aboutTitle: "",
  aboutText: "",
  aboutImage: "",
};
