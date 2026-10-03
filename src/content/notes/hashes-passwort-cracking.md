---
title: "Hashes & Passwort-Cracking: Hashcat und John"
description: "Wie Passwort-Hashes unter Linux und Windows aussehen und wie man sie in Lab-Umgebungen mit Hashcat und John the Ripper analysiert."
date: 2026-09-26
source: "TryHackMe – Crack the Hash / John the Ripper"
tags: [hashing, passwort, hashcat, john]
draft: true
---

> Nur mit Hashes aus eigenen Systemen, CTF-Räumen oder mit ausdrücklicher Erlaubnis. Das Knacken
> fremder Passwörter ohne Erlaubnis ist strafbar.

## Wo Passwörter gespeichert werden
- **Linux:** in `/etc/shadow` (früher `/etc/passwd`). Format:
  `$prefix$options$salt$hash`. Der Präfix sagt, welches Verfahren benutzt wurde – `man 5 crypt`
  listet die Formate auf (z. B. `$6$` = SHA-512).
- **Windows:** als **NTLM**-Hash (eine Variante von MD4), in der SAM-Datei bzw. NTDS.dit.

## Hash-Typ erkennen
Vor dem Knacken muss man den Typ bestimmen. Anhaltspunkte:
- `/etc/shadow` mit `$6$` → SHA-512 crypt
- Windows → NTLM
- Web-App-Datenbanken → oft MD5, SHA-1 oder bcrypt

## Hashcat
```bash
hashcat -m <hash_type> -a <attack_mode> hashfile wordlist
```
Wichtige Modus-Nummern (`-m`):
| Typ | `-m` |
|-----|------|
| SHA-512 crypt (`$6$`) | 1800 |
| NTLM | 1000 |
| MD5 | 0 |
| SHA-1 | 100 |
| bcrypt | 3200 |

## John the Ripper
```bash
john --list=formats                                   # verfügbare Formate
john --format=<format> --wordlist=<liste> <datei>     # Wörterbuch-Angriff
john --single --format=<format> <datei>               # Single-Mode (Varianten des Benutzernamens)
```

Linux-Hashes zusammenführen, bevor John sie lesen kann:
```bash
unshadow /pfad/passwd /pfad/shadow > hashes.txt
```

## Hashes aus Dateien extrahieren
John bringt Helfer mit, die aus passwortgeschützten Dateien einen knackbaren Hash erzeugen:
```bash
zip2john datei.zip  > hash.txt      # ZIP-Passwort
rar2john datei.rar  > hash.txt      # RAR-Passwort
ssh2john id_rsa     > hash.txt      # Passphrase eines SSH-Keys
```
Danach läuft der Hash ganz normal durch `john ... hash.txt`.

## In eigenen Worten
Der Ablauf ist immer gleich: Hash besorgen → Typ bestimmen → passenden Modus/Format wählen →
Wörterbuch drüberlaufen lassen. Der schwierigste Schritt ist oft, den Hash-Typ korrekt zu erkennen.

## Verteidigungssicht
Langsame, gesalzene Hash-Verfahren (bcrypt, Argon2) machen genau diese Wörterbuch-Angriffe teuer.
MD5 und SHA-1 ohne Salt sind für Passwörter ungeeignet.
