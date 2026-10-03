---
title: "Web-Enumeration: Verzeichnisse, Subdomains, vHosts"
description: "Werkzeuge und Vorgehen, um in Lab-Umgebungen versteckte Pfade, Subdomains und virtuelle Hosts zu finden – feroxbuster, ffuf und gobuster im Vergleich."
date: 2026-09-28
source: "TryHackMe – Content Discovery / Web Enumeration"
tags: [web, recon, enumeration]
draft: true
---

> Nur gegen eigene oder ausdrücklich freigegebene Ziele (CTF-Räume, eigenes Lab).

## Welches Werkzeug wofür?
- **feroxbuster** – schnelles Verzeichnis-Brute-Forcing mit automatischer Rekursion: findet es `/admin`,
  sucht es direkt darin weiter.
- **ffuf** – das flexible „Schweizer Taschenmesser“: fuzzt nicht nur Pfade, sondern auch Parameter,
  Subdomains und Formularfelder. Der Platzhalter `FUZZ` markiert die Stelle.
- **gobuster** – schlank und schnell, getrennte Modi für Verzeichnisse, DNS und vHosts.

## feroxbuster
```bash
feroxbuster -u http://ziel -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

## ffuf
```bash
# Pfade
ffuf -u http://ziel/FUZZ -w wortliste.txt
# Parameter
ffuf -u "http://ziel/?id=FUZZ" -w wortliste.txt
# Subdomains
ffuf -u http://FUZZ.ziel -w wortliste.txt
```

## gobuster
```bash
# Verzeichnisse
gobuster dir -u "http://ziel/" -w /usr/share/wordlists/dirb/small.txt -t 64
# Subdomains
gobuster dns -d ziel.thm -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt
# virtuelle Hosts
gobuster vhost -u "http://ziel.thm" -w wortliste.txt
```

## Nützliche Wortlisten
- `/usr/share/wordlists/dirb/common.txt` – klein, schneller Erst-Scan
- `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt` – gründlicher
- SecLists (`/usr/share/seclists/`) – Sammlung für fast jeden Zweck

## In eigenen Worten
Erst breit und schnell (common-Liste), dann gezielt und tief (medium-Liste, Rekursion). ffuf nehme ich,
sobald ich mehr als nur Pfade suche.

## Verteidigungssicht
Viele 404er in kurzer Zeit auf nicht existierende Pfade sind ein klares Scan-Muster. Rate-Limiting,
eine Web Application Firewall und aussagekräftiges Logging helfen beim Erkennen.
