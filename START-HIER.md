# Familienherz – Deine GitHub-Version

**Für iOS, Android und Mac** · Statische PWA auf GitHub Pages · gemeinsame Daten per Supabase.

Dieses Paket ist eine **neue, unabhängig entwickelte GitHub-Pages-Version** auf Basis der besprochenen Funktionen, **kein vollständiger Export des früheren Lovable-Quellcodes**. Der Lovable-Projektzugriff war beim Erstellen nicht mehr verfügbar. Die eigenständige Dienstplan-App bleibt unverändert.

## 1. In GitHub hochladen (Mac/Computer)

**Wichtig: Die ZIP-Datei NICHT unverändert als Datei hochladen!** GitHub Pages kann eine ZIP nicht automatisch als App auspacken.

1. `familienherz-github.zip` zuerst entpacken.
2. Auf [github.com/new](https://github.com/new) ein neues Repository **familienherz** anlegen. Bei GitHub Pages auf einem kostenlosen persönlichen Konto sollte das Repository öffentlich sein. **Keine privaten Schlüssel oder persönlichen Daten im Repo speichern.**
3. In GitHub **Add file → Upload files** öffnen. **Alle entpackten Dateien samt Unterordnern** in das Repository hochladen (nicht nur `index.html`, nicht die ZIP). Im Finder versteckte Dateien per `⌘ ⇧ .` anzeigen, wenn du auch `.nojekyll` hochladen möchtest.
4. Commit ausführen. Kontrolliere, dass `index.html`, `app.js`, `styles.css`, `config.js`, `sw.js`, der `lib`-Ordner und der `sql`-Ordner im Repository liegen.
5. Repository → **Settings → Pages** → „Deploy from a branch“ → `main` → `/(root)` → Save. Nach der Veröffentlichung ist die Adresse typischerweise `https://basti420420.github.io/familienherz/`.

### Alternative mit Terminal (Mac)

Wenn du im entpackten Ordner bist und das leere GitHub-Repository schon erstellt hast:

```bash
cd ~/Downloads/familienherz-github
git init
git branch -M main
git add .
git commit -m "Familienherz erste GitHub-Version"
git remote add origin https://github.com/Basti420420/familienherz.git
git push -u origin main
```

GitHub kann dich zur Anmeldung im Browser auffordern. Die Befehle werden nicht benötigt, wenn du die Dateien bereits über die GitHub-Webseite hochgeladen hast.

## 2. Gemeinsame Datenbank anschließen

**Die App funktioniert nur als Mehrgeräte-Familienapp, wenn du anschließend Supabase einrichtest.** Ohne Konfiguration zeigt sie absichtlich eine Einrichtungsseite, keine erfundenen Familiendaten.

1. Auf [supabase.com/dashboard](https://supabase.com/dashboard) dein Supabase-Projekt öffnen oder eines erstellen. Verwende **genau die Datenbank, in der deine bisherigen Familiendaten gespeichert sind**, falls du bereits Einträge übernehmen möchtest. Das frühere Lovable-Projekt hatte möglicherweise eine **andere** Datenbank als dein Projekt „Family APP“. Die Zuordnung ist hier nicht verifiziert! Eine neue Datenbank übernimmt alte Daten **nicht automatisch**.
2. **Vor Änderungen an einer bestehenden Datenbank ein Backup erstellen!**
3. Im SQL Editor die gesamte Datei `sql/01_setup.sql` ausführen. Sie erstellt oder ergänzt Tabellen und aktiviert Row-Level Security; sie löscht keine vorhandenen Familien oder Einträge. Sie ist jedoch kein Ersatz für eine Prüfung fremder, bereits bestehender Policies.
4. Danach optional `sql/02_verify.sql` ausführen und prüfen, dass bei **allen** Familientabellen und `private_shifts` RLS aktiv ist.
5. In Supabase → **Project Settings / API Keys** die **Project URL** und einen **Publishable Key** (`sb_publishable_...`) kopieren. Alternativ geht ein älterer öffentlicher `anon`-Schlüssel. **NIE** Datenbankpasswort, `service_role` oder `sb_secret_...` in die App einfügen!
6. In GitHub die Datei `config.js` bearbeiten und die beiden Platzhalter ausfüllen, z. B.:

```javascript
window.FAMILIENHERZ_CONFIG = {
  supabaseUrl: "https://DEIN-PROJEKT.supabase.co",
  supabaseKey: "sb_publishable_DEIN_OEFFENTLICHER_SCHLUESSEL",
  vapidPublicKey: ""
};
```

7. Speichern/committen. In Supabase → Authentication → URL Configuration die GitHub-Pages-Adresse als **Site URL** eintragen, z. B. `https://basti420420.github.io/familienherz/`. Diese Adresse bei den **Redirect URLs** ebenfalls zulassen. E-Mail/Passwort-Login in Authentication aktivieren.
8. App im Browser öffnen, anmelden, bei erstmaliger Anmeldung ggf. E-Mail bestätigen, eine Familie erstellen und den Familiencode an andere Personen weitergeben.

### Alte Daten erhalten

**Wichtig:** Vorhandene Daten in einem Lovable Cloud/Supabase-Projekt werden beim GitHub-Upload nicht verschoben. Nur wenn die neue App auf dieselbe Supabase-Datenbank zeigt **und die Tabellen/Benutzerkonten passen**, können bestehende Daten direkt erscheinen. Andernfalls ist ein expliziter, separater Datenexport/-import nötig. Diese ZIP enthält **keine Datenbanksicherung, keine alten Logins und keine Familien-Datensätze**.

## 3. Dienstplan-App verbinden – sie bleibt eigenständig

1. Öffne die bestehende App: <https://basti420420.github.io/mein-dienstplan/>.
2. Im Dienstplan **Kalenderdatei (.ics) exportieren**.
3. Familienherz → **Kalender → Dienstplan (.ics) importieren**.
4. Die vorgeschlagenen Dienste kontrollieren und bestätigen. Sie erscheinen nur bei deinem eigenen Login im Familienkalender und im Wochenbericht.
5. Bei Änderungen im Dienstplan erneut .ics exportieren/importieren. Wiederholte UIDs werden aktualisiert und nicht dupliziert.

**Noch keine automatische Live-Verbindung zwischen beiden Apps.** Eine direkte gemeinsame Nutzung von `localStorage` über verschiedene Website-Domains ist technisch nicht erlaubt.

## 4. Auf iPhone und Android installieren

- **iPhone**: GitHub-Pages-Adresse in Safari öffnen → Teilen → **Zum Home-Bildschirm**.
- **Android**: in Chrome öffnen → Menü **⋮** → **App installieren** / **Zum Startbildschirm hinzufügen**.
- App-Shell wird teilweise offline geladen; private Familiendaten werden aus Sicherheitsgründen nicht im Service-Worker zwischengespeichert. Für aktuelle Listen ist Internet nötig.
- Öffnen, Zurückkehren in die App und Realtime-Änderungen lösen eine Aktualisierung der Daten aus.

## 5. Was ist drin, was fehlt noch?

**Vorbereitet/implementiert im Paket:**
- Registrierung/Login, Familiencode, gemeinsamer Kalender und geteilte Einkauf-/To-do-Listen auf Basis von Supabase
- Abhaken und Durchstreichen sowie erneutes Aktivieren
- Vorschläge für häufige Einkaufsartikel, Kategorien und Mengen
- Private Dienstplan-.ics-Vorschau und deduplizierter Import
- Monatskalender sowie Start-Agenda der nächsten Tage
- Persönlicher Wochenbericht und PDF-Download/Teilen
- FRITZ!NAS-Link mit lokal einstellbarer Adresse
- PWA-Manifest, Service-Worker für App-Shell, sichere Tabellenrichtlinien

**Noch NICHT live:**
- Web-Push bei neuen Einträgen / alle zwei Stunden für Aufgaben: Dafür fehlen Push-Backend, VAPID-Schlüssel, Push-Abonnements und ein geplanter Serverjob. Die App behauptet nicht, dass diese Funktion bereits aktiv ist.
- Native iOS-/Android-Startbildschirm-Widgets: Eine normale GitHub-Pages-PWA kann kein vollwertiges natives Kalender-Widget für den System-Startbildschirm erzeugen.
- Permanente Synchronisation aller Apple-/Google-Kalender: aktuell Import/Export einer .ics-Datei, **kein** OAuth-/CalDAV-Abgleich.
- Vollständig automatischer Abgleich mit der eigenständigen Dienstplan-App: aktuell manueller .ics-Import.

## 6. Tests und Grenzen

- Die Dateien sind als statische HTML/CSS/JavaScript-App ohne lokalen Build-Schritt verwendbar.
- Code-Syntax und acht Kern-Tests für Kalenderimport, Zeitzone, Wochennummer und PDF-Erstellung sind geprüft (`npm run check`).
- Der PDF-Ausgang wurde zusätzlich mit `pdfinfo` und `pdftotext` überprüft.
- Ein vollständiger Live-Test mit einem echten angemeldeten Supabase-Familienkonto war hier **nicht** möglich; die alte Lovable-Datenbank war nicht mehr zugänglich. Browser-End-to-End-Prüfungen waren in der Testumgebung netzwerkseitig blockiert. Bitte nach Datenbankanschluss die Hauptfunktionen auf zwei echten Geräten testen.

### Bei Problemen

- **„Supabase nicht verbunden“**: URL/Publishable Key in `config.js` prüfen und nach Commit erneut laden.
- **„relation ... does not exist“**: SQL-Setup für das richtige Projekt ausführen.
- **„row-level security policy“ / „permission denied“**: SQL-Setup und bestehende Fremd-Policies in Supabase überprüfen.
- **Keine Echtzeitänderung**: Im Supabase Dashboard die Realtime-Publikation der drei Familientabellen kontrollieren. Die App lädt auch bei erneuter Aktivierung nach.
- **Alte Familien nicht da**: Du bist mit einer anderen Supabase-Datenbank verbunden. Nicht versehentlich neue Daten anlegen oder alte löschen, sondern erst die Projektzuordnung prüfen.
- **Die FRITZ!NAS öffnet nicht**: Nur im lokalen Heimnetz oder über WireGuard/VPN; lokale FRITZ!-DNS-Namen funktionieren außerhalb des Heimnetzes nicht.
