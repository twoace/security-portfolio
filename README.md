# security-portfolio

Meine persönliche Website als Lern- und Projektbasis auf dem Weg in die Cybersecurity:
**TryHackMe-Writeups**, **eigene Projekte** und **Lernnotizen** aus der Weiterbildung.

Gebaut mit [Astro](https://astro.build) als statische Seite, gehostet auf GitHub Pages.
Inhalte sind einfache Markdown-Dateien.

## Lokal starten

```bash
npm install
npm run dev        # http://localhost:4321/security-portfolio/
npm run build      # Typecheck + Build nach dist/
```

## Neuen Eintrag anlegen

1. Passende Vorlage aus `templates/` kopieren:
   - `writeup.md` → `src/content/writeups/<name>.md`
   - `project.md` → `src/content/projects/<name>.md`
   - `note.md` → `src/content/notes/<name>.md`
2. Frontmatter ausfüllen. Mit `draft: true` ist der Eintrag nur lokal sichtbar.
3. Bilder neben die Markdown-Datei legen und relativ einbinden: `![Scan](./scan.png)`.
4. Commit & Push auf `main` → GitHub Actions baut und deployt automatisch.

Das Schema in `src/content.config.ts` prüft beim Build jedes Feld. Ein Tippfehler im
Frontmatter (z. B. `difficulty: easy` statt `Easy`) lässt den Build mit klarer Fehlermeldung scheitern.

## Struktur

```
src/
  content/          ← deine Inhalte (Markdown)
    writeups/
    projects/
    notes/
  content.config.ts ← Schema / Pflichtfelder pro Inhaltstyp
  pages/            ← Routen (Startseite, Listen, Detailseiten, Tags, RSS)
  layouts/          ← Seitengerüst
  components/       ← Karten, Tags
  styles/global.css ← Design (Farben oben als Variablen)
templates/          ← Vorlagen für neue Einträge
```

## Einmalige Einrichtung (GitHub Pages)

1. Repo auf GitHub → **Settings → Pages → Source: GitHub Actions**.
2. In `astro.config.mjs` `site` und `base` prüfen (für `https://twoace.github.io/security-portfolio/` passt es).
3. Platzhalter ersetzen: `[Dein Name]` in `src/pages/index.astro`, Links in `src/pages/about.astro`.

## Regeln für Writeups

- **Keine Flags, Passwörter oder Hashes im Klartext.** Zeig den Lösungsweg und dein Denken.
- Keine echten IPs, keine Daten von der Arbeit oder aus Kundenumgebungen.
- Immer ein Abschnitt **„Verteidigungssicht“**: Wie erkennt oder verhindert man das?
- Auch Fehlversuche dokumentieren. Genau das zeigt Lernfähigkeit.

## Roadmap (Ideen zum Mitwachsen)

- [ ] Eigene Inhalte statt der drei Beispiel-Einträge
- [ ] Eigene Domain + HTTPS (z. B. Cloudflare) und Security-Header (CSP, HSTS) setzen
- [ ] Suche (z. B. [Pagefind](https://pagefind.app), funktioniert rein statisch)
- [ ] Seite „Lernpfad“ / Timeline mit Zertifikaten und Meilensteinen
- [ ] Secret-Scanning im CI (z. B. gitleaks), damit nie versehentlich Credentials im Repo landen
- [ ] Eigene Seite selbst prüfen: securityheaders.com, Mozilla Observatory, Lighthouse
