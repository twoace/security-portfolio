# security-portfolio

Persönliches Portfolio und Lernjournal von **Aaron Hintze** auf dem Weg in die Cybersecurity.

Hier dokumentiere ich, woran ich arbeite und was ich lerne:

- **Writeups** zu TryHackMe-Räumen und CTFs, jeweils mit Lösungsweg und Verteidigungssicht
- **Projekte** aus meinem Homelab sowie eigene Skripte und Tools
- **Lernnotizen** aus meiner Weiterbildung, aus Kursen und Fachliteratur

🔗 **Live:** https://twoace.github.io/security-portfolio/

## Technik

| Bereich | Umsetzung |
|---|---|
| Framework | [Astro](https://astro.build), statisch generiert, TypeScript im Strict-Modus |
| Inhalte | Markdown mit typisiertem Frontmatter-Schema (Zod), das beim Build validiert wird |
| Motion | View Transitions, Canvas-Animation, Scroll-Reveal, alles ohne externe Libraries |
| Barrierefreiheit | `prefers-reduced-motion` wird respektiert, Inhalte bleiben ohne JavaScript lesbar |
| CI/CD | GitHub Actions: Typecheck und Build bei jedem Push, Deployment auf GitHub Pages |
| Extras | Tag-Übersicht, RSS-Feed, Sitemap |

## Sicherheitsüberlegungen

Ich habe die Seite bewusst schlank gehalten:

- **Statisch statt dynamisch:** kein Backend, keine Datenbank, keine Formulare. Das hält die Angriffsfläche klein.
- **Wenige Abhängigkeiten:** nur Astro und dessen offizielle Integrationen, kein clientseitiges Framework.
- **Minimale CI-Rechte:** Der Workflow läuft mit `contents: read`. Schreibrechte für Pages gibt es nur im Deploy-Job.
- **Externe Links** setzen `rel="noopener noreferrer"`, und die Seite verwendet eine restriktive Referrer-Policy.
- **Writeups veröffentlichen keine Flags, Passwörter oder Hashes**, sondern den Lösungsweg und das Vorgehen.

## Struktur

```
src/
  content/            Writeups, Projekte und Notizen als Markdown
  content.config.ts   Schema pro Inhaltstyp
  pages/              Routen: Startseite, Listen, Detailseiten, Tags, RSS
  layouts/            Seitengerüst
  components/         wiederverwendbare UI-Bausteine
  scripts/effects.ts  Client-Animationen
  styles/global.css   Design-Tokens und Styles
templates/            Vorlagen für neue Einträge
```

## Lokal ausführen

```bash
npm install
npm run dev     # Entwicklungsserver
npm run build   # Typecheck und Produktions-Build
```

## Geplant

- [ ] Volltextsuche mit [Pagefind](https://pagefind.app)
- [ ] Eigene Domain mit Security-Headern (CSP, HSTS) und Prüfung über Mozilla Observatory
- [ ] Secret-Scanning im CI (gitleaks)
- [ ] Timeline mit Zertifikaten und Meilensteinen
