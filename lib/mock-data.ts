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

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: "1",
    title: "Misty Mountains",
    category: "Góry",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    shortDescription: "Tajemnicza atmosfera o poranku w Wysokich Tatrach.",
    fullDescription: "To był jeden z tych poranków, kiedy budzik dzwoni o 3:00 rano, a Ty zastanawiasz się, czy warto. Po dwóch godzinach podejścia w gęstej mgle, dotarłem na grań. Nagle chmury zaczęły opadać, odsłaniając postrzępione szczyty. Światło było miękkie, niemal nierzeczywiste. To zdjęcie to zapis ciszy, która panuje na szczycie przed pierwszymi promieniami słońca.",
    date: "2024-03-15",
  },
  {
    id: "2",
    title: "Cisza Przed Burzą",
    category: "Natura",
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80",
    shortDescription: "Gwałtowne zmiany pogody nad bałtyckimi klifami.",
    fullDescription: "Bałtyk potrafi być nieprzewidywalny. Ta fotografia powstała tuż przed nadejściem potężnej nawałnicy. Powietrze było ciężkie, a niebo przybrało niemal granatowy odcień. Kontrast między spokojną wodą a groźnym niebem stworzył dramatyczną kompozycję, której nie mogłem przepuścić.",
    date: "2024-01-20",
  },
  {
    id: "3",
    title: "Alpejskie Echo",
    category: "Góry",
    image: "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80",
    shortDescription: "Monumentalne szczyty Dolomitów w złotej godzinie.",
    fullDescription: "Dolomity to mekka każdego fotografa krajobrazu. Strzeliste turnie w świetle zachodzącego słońca stają się niemal czerwone. Trzy wejścia na tę samą miejscówkę opłaciły się - za trzecim razem warunki były idealne. Brak wiatru pozwolił na uzyskanie idealnego odbicia w małym stawie u podnóża góry.",
    date: "2023-11-10",
  },
];

export const MOCK_EXHIBITIONS: Exhibition[] = [];

export const MOCK_ADMIN: User = {
  id: "admin",
  email: "admin@rafalwozny.pl",
  role: "admin",
  name: "Rafał Woźny",
};
