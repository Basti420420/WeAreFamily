# ♥ Familienherz

Installierbare deutsche Familien-PWA für **iOS, Android und Desktop**, bereit für **GitHub Pages** und **Supabase**.

**▶ [START-HIER.md](START-HIER.md) – GitHub-Upload und Einrichtung in einfachen Schritten.**

Projekt enthält: Kalender, privaten Dienstplan-.ics-Import, gemeinsame Einkaufsliste, To-dos, Wochenbericht als PDF, FRITZ!NAS-Zugang, Service Worker und Supabase-RLS-Schema. Die eigenständige Dienstplan-App wird nicht verändert.

## Struktur

- `index.html`, `app.js`, `styles.css`: fertige Web-App, ohne Build-Step
- `config.js`: **nur öffentliche** Supabase-Zugangsdaten ergänzen
- `manifest.webmanifest`, `sw.js`, `icons/`: installierbare PWA
- `lib/ics.mjs`, `lib/dates.mjs`, `lib/pdf.mjs`: Import, Datum und PDF
- `sql/01_setup.sql`: additive Tabellen / Policies / Realtime
- `sql/02_verify.sql`: SQL-Sicherheitsprüfung
- `tests/`: lokale Kern-Tests, mit `npm run check` starten

**Hinweis:** Login, Mehrgeräte-Synchronisierung und Familienlisten benötigen ein korrekt konfiguriertes Supabase-Projekt. Web Push ist noch nicht serverseitig angeschlossen. Die Codebasis ist **neu erstellt**, kein bytegetreuer Lovable-Projektexport.
