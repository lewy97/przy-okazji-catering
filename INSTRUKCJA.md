# Strona cateringu – jak ją uruchomić za 0 zł

Koszt: **0 zł/mies.** (płacisz tylko za domenę, którą już masz).

| Co | Usługa | Cena |
|---|---|---|
| Przechowywanie plików strony | GitHub | darmowe |
| Hosting + HTTPS | Netlify (plan Free) | darmowe |
| Panel edycji | Decap CMS (już wbudowany, adres `/admin`) | darmowe |

## Struktura plików

```
index.html, styles.css, app.js   – wygląd strony (nie trzeba ruszać)
oferta/index.html                – podstrona „Oferta” (cateringprzyokazji.pl/oferta/)
content/menu.json                – propozycje menu (edytowane z panelu)
content/about.json               – zakładka „O mnie”
content/reviews.json             – ocena i opinie z Google
content/settings.json            – nazwa firmy, telefon, e-mail, adres
admin/                           – panel edycji
images/uploads/                  – zdjęcia wgrane z panelu
```

## Krok 1 – GitHub (5 min)

1. Załóż konto na https://github.com (osoba prowadząca stronę też potrzebuje konta – to jej login do panelu).
2. Utwórz nowe repozytorium, `przy-okazji-catering` (może być prywatne).
3. Wgraj do niego wszystkie pliki z tego folderu („Add file → Upload files”).
4. W pliku `admin/config.yml` zmień linię `repo: lewy97/przy-okazji-catering` na swój login i nazwę repozytorium.
5. Jeśli stronę ma edytować ktoś inny: repozytorium → Settings → Collaborators → dodaj jego konto GitHub.

## Krok 2 – Netlify (5 min)

1. Wejdź na https://app.netlify.com i zaloguj się przez GitHub.
2. „Add new site → Import an existing project → GitHub” → wybierz repozytorium `przy-okazji-catering`.
3. Build command: zostaw puste. Publish directory: `/` (lub puste). Kliknij **Deploy**.
4. Strona działa pod adresem typu `nazwa.netlify.app`.

## Krok 3 – panel edycji (2 min)

1. Na GitHubie: Settings (Twojego konta) → Developer settings → OAuth Apps → **New OAuth App**
   - Homepage URL: `https://cateringprzyokazji.pl`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Skopiuj **Client ID** i wygeneruj **Client Secret**.
3. W Netlify: Site configuration → Access & security → **OAuth** → Install provider → GitHub → wklej oba klucze.
4. Wejdź na `cateringprzyokazji.pl/admin` → „Zaloguj przez GitHub”. Gotowe.

## Krok 4 – podpięcie domeny

W Netlify: Domain management → **Add a domain** → wpisz swoją domenę. Netlify pokaże, co ustawić u rejestratora domeny (np. OVH, home.pl, nazwa.pl):
- rekord **A** dla `@` → `75.2.60.5`
- rekord **CNAME** dla `www` → `nazwa.netlify.app`

Certyfikat HTTPS włączy się sam (do kilku godzin).

## Jak edytować stronę

`cateringprzyokazji.pl/admin` → wybierz sekcję:
- **🍽️ Propozycje menu** – „Dodaj menu”, wpisz nazwę, okazję, cenę, wgraj zdjęcie, dodaj dania i składniki.
- **📷 Galeria zdjęć** – wgraj zdjęcia realizacji (sekcja pojawi się na stronie po dodaniu pierwszego).
- **👩‍🍳 O mnie** – tekst i zdjęcie.
- **⭐ Opinie Google** – średnia ocena, liczba opinii, wybrane opinie, link do wizytówki.
- **⚙️ Dane firmy i kontakt**.

Kliknij **Opublikuj** – zmiany pojawią się na stronie po ok. 30–60 sekundach.

## Opinie z Google – skąd wziąć dane

- Link do wizytówki: wyszukaj firmę w Google Maps → Udostępnij → skopiuj link.
- Link „Wystaw opinię”: profil firmy w Google → „Poproś o opinie” → skopiuj link.
- Ocenę i liczbę opinii przepisujesz z wizytówki (raz na jakiś czas).

Chcesz, żeby opinie odświeżały się same? Można dodać darmowy widżet (np. Trustindex lub Elfsight – plan darmowy ma ograniczenia i ich logo) albo pobierać je przez Google Places API (wymaga podpięcia karty w Google Cloud, przy małym ruchu mieści się w darmowym limicie).
