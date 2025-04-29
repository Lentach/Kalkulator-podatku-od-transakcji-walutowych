# Kalkulator Podatku od Transakcji Walutowych

Aplikacja do obliczania podatku dochodowego od transakcji w walutach obcych, korzystająca z aktualnych kursów walut Narodowego Banku Polskiego.

## Funkcje

* Dodawanie pojedynczych transakcji walutowych
* Masowe dodawanie transakcji z pliku JSON
* Automatyczne pobieranie kursów walut z API NBP
* Konwersja wszystkich transakcji na złotówki (PLN)
* Obliczanie podatku (19% stawka)
* Szczegółowe podsumowanie transakcji

## Technologie

* Next.js 13+
* React 18+
* TypeScript
* Tailwind CSS

## Instalacja

Aby uruchomić projekt lokalnie:

```bash
# Klonowanie repozytorium
git clone [https://github.com/twoja-nazwa-uzytkownika/currency-tax-calculator.git](https://github.com/twoja-nazwa-uzytkownika/currency-tax-calculator.git)
cd currency-tax-calculator

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev
Aplikacja będzie dostępna pod adresem https://www.google.com/search?q=http://localhost:3000

Jak używać
Dodaj transakcję, podając walutę, kwotę i datę.
Alternatywnie, wklej listę transakcji w formacie JSON.
Kliknij "Oblicz podatek".
Sprawdź wyniki przeliczenia i kwotę podatku do zapłacenia.
Format danych JSON
Przykład struktury danych dla masowego importu z pliku JSON:

JSON

[
  {
    "currency": "EUR",
    "amount": 25.69,
    "data": "15-03-2023"
  },
  {
    "currency": "USD",
    "amount": 100,
    "data": "22-04-2023"
  }
]
API NBP
Aplikacja korzysta z oficjalnego API Narodowego Banku Polskiego do pobierania kursów walut.
Dokumentacja API: http://api.nbp.pl/

Zastrzeżenie
Ta aplikacja jest narzędziem pomocniczym i nie zastępuje profesjonalnej porady księgowej lub podatkowej.
Obliczenia są oparte na danych publicznie dostępnych z API NBP, ale mogą nie uwzględniać wszystkich specyficznych przepisów podatkowych lub sytuacji indywidualnej użytkownika.
Zawsze skonsultuj się z kwalifikowanym doradcą podatkowym, aby potwierdzić swoje zobowiązania podatkowe.

