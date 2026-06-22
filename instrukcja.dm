# Instrukcja Logowania i Zarządzania Treściami

Niniejszy dokument zawiera instrukcję logowania do panelu administracyjnego oraz szczegółowy opis dodawania i edycji treści na stronie internetowej.

---

## 1. Logowanie do Panelu Admina

Aby uzyskać dostęp do panelu zarządzania stroną, wykonaj następujące kroki:

1. Przejdź pod adres URL:
   **`/login`** (np. `https://rafalwozny.web.app/login` lub lokalnie `http://localhost:3000/login`)
2. Wprowadź poniższe dane uwierzytelniające:
   - **Login:** `yop9ha_12345`
   - **Hasło:** `Zachwyconyswiatem!@2`
3. Kliknij przycisk **Zaloguj Się**. Po pomyślnej weryfikacji zostaniesz przekierowany do panelu administracyjnego (**`/admin`**).

---

## 2. Opis Modułów Panelu Administracyjnego

Panel admina podzielony jest na cztery główne sekcje zarządzania:

### A. Portfolio (Zarządzanie pracami i zdjęciami)
Pozwala na dodawanie nowych prac fotograficznych wyświetlanych w galerii głównej.
* **Dodawanie nowej pozycji:**
  1. Kliknij przycisk **Dodaj wpis do portfolio** (ikona z plusem).
  2. Wypełnij pola formularza:
     - **Tytuł:** Nazwa zdjęcia/projektu.
     - **Kategoria:** Wybierz kategorię (np. *Góry*, *Ludzie*, *Podróże*).
     - **Data:** Data wykonania lub publikacji.
     - **Krótki opis:** Tekst widoczny na kafelku w galerii.
     - **Pełny opis:** Rozwinięcie opisu widoczne po wejściu w szczegóły zdjęcia.
     - **Zdjęcie:** Kliknij obszar wgrywania pliku, aby wybrać zdjęcie bezpośrednio ze swojego komputera. Plik zostanie automatycznie przesłany do chmury Firebase Storage.
  3. Kliknij **Zapisz**, aby dodać wpis.
* **Edycja/Usuwanie:** Przy każdej pozycji w tabeli administracyjnej znajdują się przyciski pozwalające na edycję (ikona ołówka) lub usunięcie pozycji (ikona kosza).

### B. Sklep (Zarządzanie ofertą produktów)
Umożliwia dodawanie i edycję odbitek lub produktów fizycznych dostępnych w sklepie online.
* **Dodawanie nowego produktu:**
  1. Kliknij przycisk **Dodaj produkt**.
  2. Wypełnij pola formularza:
     - **Nazwa produktu:** Nazwa wyświetlana w sklepie.
     - **Cena (PLN):** Cena produktu.
     - **Opis:** Dokładny opis produktu (np. format, rodzaj papieru, warunki dostawy).
     - **Zdjęcie produktu:** Wgraj plik graficzny ze swojego komputera.
  3. Kliknij **Zapisz**, aby opublikować produkt w sklepie.
* **Edycja/Usuwanie:** Możesz edytować ceny, opisy i zdjęcia produktów lub usuwać je bezpośrednio z listy.

### C. Wystawy i Prelekcje (Zarządzanie wydarzeniami)
Umożliwia prowadzenie kalendarium wystaw oraz prelekcji.
* **Dodawanie nowego wydarzenia:**
  1. Kliknij przycisk **Dodaj wydarzenie**.
  2. Uzupełnij formularz:
     - **Tytuł:** Nazwa wystawy bądź prelekcji.
     - **Typ:** Wybierz *Wystawa* lub *Prelekcja*.
     - **Data:** Data wydarzenia.
     - **Miejsce:** Lokalizacja (np. nazwa galerii sztuki, miasto).
     - **Opis:** Szczegółowe informacje o wydarzeniu.
  3. Zapisz zmiany.

### D. Ustawienia Strony (Zarządzanie layoutem i danymi kontaktowymi)
Centralny moduł konfiguracji tożsamości wizualnej i biografii autora.
* **Konfiguracja nagłówka i stopki:**
  - **Nazwa strony:** Główny tekst brandingowy wyświetlany w menu nawigacyjnym.
  - **Logo strony:** Możliwość wgrania własnego pliku logo (np. plik PNG z przezroczystością). Po wgraniu logo zastąpi ono domyślną ikonę aparatu fotograficznego w menu.
* **Dane kontaktowe:**
  - Edycja **numeru telefonu** oraz **adresu e-mail** (zostaną one automatycznie zaktualizowane w stopce na każdej podstronie serwisu).
* **Sekcja "O mnie" (Biografia):**
  - **Tytuł sekcji o mnie:** Nagłówek powitalny.
  - **Treść biografii:** Główny tekst opisujący Twoją twórczość i sylwetkę.
  - **Zdjęcie profilowe:** Wgraj swoje zdjęcie portretowe z komputera, które wyświetli się obok tekstu biograficznego.

---

## 3. Ważne Informacje Techniczne

1. **Wgrywanie zdjęć:** Dodawanie zdjęć do portfolio, sklepu oraz profilu odbywa się wyłącznie poprzez przesyłanie plików z dysku komputera. System nie wymaga podawania linków URL do zewnętrznych hostingów. Wszystkie przesyłane grafiki trafiają na bezpieczny serwer Firebase Storage.
2. **Bramka Płatności ING (imoje):** Płatności w sklepie są w pełni skonfigurowane w trybie produkcyjnym (wyłączony sandbox). Zmiany cen produktów w sklepie bezpośrednio przekładają się na kwoty procesowane przez bramkę imoje.
