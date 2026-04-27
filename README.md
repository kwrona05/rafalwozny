# Rafał Woźny - Portfolio & Sklep Fotograficzny

Profesjonalna platforma portfolio połączona ze sklepem internetowym dla fotografa Rafała Woźnego. Projekt zbudowany w oparciu o stos technologiczny Next.js 15, Firebase oraz nowoczesne biblioteki do animacji i stylizacji.

## 🚀 Funkcjonalności

### 🎨 Design i UX
- **Premium Aesthetics**: Nowoczesny, ciemny design z wykorzystaniem efektów glassmorphismu i płynnych animacji (Framer Motion).
- **Responsive Design**: Pełna responsywność na urządzeniach mobilnych i desktopowych.
- **Dynamiczne Nawigowanie**: Pasek nawigacji reagujący na scrollowanie.

### 📸 Portfolio (Mini-blog)
- **Galeria Zdjęć**: Przejrzysta prezentacja prac fotograficznych.
- **Szczegóły Projektu**: Każde zdjęcie w portfolio posiada krótki opis na liście oraz pełną treść (blog post) dostępną po kliknięciu.

### 🛒 Sklep i E-commerce
- **Kategorie produktów**: Podział na Wydruki (Prints), Presety oraz Warsztaty.
- **System Koszyka**: Trwały koszyk zsynchronizowany z lokalną pamięcią i Firebase.
- **Proces Zakupowy**: Uproszczony checkout z formularzem dostawy.
- **Płatności**: Integracja z bramką płatniczą **imoje** (Sandbox).
- **Generowanie Faktur/Potwierdzeń**: Automatyczne tworzenie dokumentów PDF po zakupie (jsPDF).

### 🔐 System Użytkownika i Bezpieczeństwo
- **Autoryzacja**: Rejestracja i logowanie oparte na Firebase Auth.
- **Weryfikacja Konta**: System OTP (One Time Password) dla nowo zarejestrowanych użytkowników.
- **System Ról**: Rozróżnienie między zwykłym klientem a administratorem.

### 🛠 Panel Administratora (CMS)
- Zarządzanie produktami w sklepie.
- Dodawanie i edycja elementów portfolio.
- Zarządzanie sekcją "Wystawy i prelekcje".
- Monitorowanie transakcji.

---

## 🛠 Instrukcja Uruchomienia

1. **Instalacja zależności**:
   ```bash
   npm install
   ```

2. **Konfiguracja środowiska**:
   Utwórz plik `.env.local` w katalogu głównym i uzupełnij go o dane z Firebase oraz imoje:
   ```env
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...

   # imoje (Sandbox)
   IMOJE_MERCHANT_ID=v698mqz9v2nxvnmvny1r
   IMOJE_SERVICE_ID=l1scsyd48m8vstmvp6rr
   IMOJE_SERVICE_KEY=...
   IMOJE_AUTH_TOKEN=...
   ```

3. **Uruchomienie serwera deweloperskiego**:
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

---

## 🔑 Mocki i Dane Testowe

### Panel Administratora
Aby uzyskać uprawnienia administratora, należy zarejestrować się na poniższy e-mail:
- **Email**: `admin@rafalwozny.pl`
- **Hasło**: `test1234`
*Uwaga: System w celach testowych został odłączony od Firebase Auth. Każde konto używa teraz tego samego hasła testowego.*

### Weryfikacja OTP (Mock)
System weryfikacji e-mail jest zmockowany. Po rejestracji:
1. Kod weryfikacyjny (6 cyfr) jest zapisywany w kolekcji `otps` w Firestore.
2. Kod jest również wypisywany w **konsoli przeglądarki (F12)** podczas procesu rejestracji/weryfikacji dla ułatwienia testów.

### Płatności imoje
Bramka płatnicza działa w trybie **Sandbox**. Dane do płatności testowych można znaleźć w dokumentacji [imoje](https://docs.imoje.pl/). Nie używaj prawdziwych danych kart płatniczych!

---

## 🏗 Technologie
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Stylizacja**: Tailwind CSS 4, Lucide React (ikony)
- **Animacje**: Framer Motion
- **Backend / Database**: Firebase (Auth, Firestore, Storage)
- **Płatności**: imoje API
- **Dokumenty**: jsPDF, jsPDF-autotable
