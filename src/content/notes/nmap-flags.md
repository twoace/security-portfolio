---
title: "Nmap-Spickzettel: Scan-Typen und Flags"
description: "Die wichtigsten Nmap-Optionen auf einen Blick – Scan-Typen, Portauswahl, Timing, Ausgabe und der klassische -sC -sV Startscan."
date: 2026-09-18
source: "TryHackMe – Nmap"
tags: [recon, netzwerk, nmap]
draft: true
---

> Nur in autorisierten Umgebungen (eigenes Lab, TryHackMe-Räume, Systeme mit Erlaubnis).
> Scans am besten mit `sudo` laufen lassen, damit die SYN-Scans funktionieren.

## Host-Discovery
| Flag | Bedeutung |
|------|-----------|
| `-sL` | Liste der Ziele, ohne zu scannen |
| `-sn` | nur prüfen, welche Hosts leben (kein Portscan) |
| `-Pn` | Host-Discovery überspringen, auch „offline“ wirkende Hosts scannen |

## Scan-Typen
| Flag | Bedeutung |
|------|-----------|
| `-sT` | TCP Connect (voller Handshake, ohne root) |
| `-sS` | TCP SYN (kein voller Handshake, Standard mit root) |
| `-sU` | UDP-Ports |
| `-sV` | Dienst- und Versionserkennung |
| `-O` | Betriebssystem-Erkennung |
| `-A` | aggressiv: `-sV` + `-O` + Standard-Skripte + Traceroute |

## Ports
| Flag | Bedeutung |
|------|-----------|
| `-F` | Fast Mode, nur die 100 häufigsten Ports |
| `-p 22,80,443` | nur diese Ports |
| `-p-` | alle Ports (1–65535) |

## Timing
`-T0` bis `-T5`: paranoid, sneaky, polite, normal (Standard), aggressive, insane.
Höher = schneller, aber lauter und ungenauer.

## Ausgabe speichern
| Flag | Format |
|------|--------|
| `-oN datei` | normal (lesbar) |
| `-oX datei` | XML |
| `-oG datei` | grepbar |
| `-oA name` | alle drei auf einmal |

## `-sC` – die Standard-Skripte
`-sC` ist die Kurzform von `--script=default` und startet die Nmap Scripting Engine (NSE) mit den als
sicher und nützlich markierten Skripten. Statt nur „Port offen/zu“ liefert das pro Dienst Zusatzinfos:

- **HTTP:** Seitentitel, erlaubte Methoden, `robots.txt`
- **SSH:** Host-Keys, unterstützte Algorithmen
- **SMB:** Freigaben, OS-Infos
- **FTP:** ob anonymer Login erlaubt ist
- **SSL/TLS:** Zertifikatsdetails

## Der klassische Startscan
```bash
nmap -sC -sV -oN scan.txt <ziel>
```
`-sV` erkennt Software und Version, `-sC` holt pro Dienst Zusatzinfos, `-oN` speichert alles zum
späteren Nachschauen. Praxis-Tipp: erst mit `-p-` alle Ports schnell finden, dann gezielt nur die
offenen Ports mit `-sC -sV` genauer ansehen – das spart viel Zeit.

## Verteidigungssicht
Viele SYN-Pakete ohne abgeschlossenen Handshake von einer Quelle in kurzer Zeit sind ein typisches
Scan-Signal. IDS wie Suricata oder Snort haben dafür fertige Regeln.
