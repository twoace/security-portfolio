---
title: "Reverse-, Bind- und Web-Shells verstehen"
description: "Der Unterschied zwischen Reverse- und Bind-Shells, wie ein Netcat-Listener funktioniert und was bei Web-Shells über die URL zu beachten ist – Lernnotiz fürs Lab."
date: 2026-10-01
source: "TryHackMe – Shells / Networking"
tags: [shells, netcat, ctf]
draft: true
---

> Lernnotiz für autorisierte Lab-/CTF-Umgebungen.

## Reverse vs. Bind – der Unterschied
- **Reverse Shell:** Das Zielsystem verbindet sich *zurück* zum Angreifer. Vorteil: kommt oft durch
  Firewalls, weil ausgehende Verbindungen meist erlaubt sind.
- **Bind Shell:** Das Zielsystem öffnet selbst einen Port und *wartet* auf eine Verbindung. Braucht,
  dass dieser Port von außen erreichbar ist.

## Der Listener (Angreiferseite)
```bash
nc -lvnp 443
```
`-l` listen, `-v` verbose, `-n` keine DNS-Auflösung (nur IP), `-p` Port. Ports unter 1024 brauchen
erhöhte Rechte.

## Named Pipe – das Prinzip
Viele Shell-Einzeiler bauen eine zweiseitige Verbindung über eine *named pipe* (`mkfifo`). Die Idee:
Eine Pipe verbindet die Ausgabe einer Shell mit dem Netzwerk-Tool und dessen Eingang zurück in die
Shell – so entsteht ein durchgehender Kanal in beide Richtungen. Die Bausteine:
- `mkfifo /tmp/f` – legt die Pipe an
- `cat /tmp/f | sh -i` – liest aus der Pipe und gibt sie an eine interaktive Shell
- `2>&1` – leitet auch Fehlermeldungen mit über den Kanal
- das Netzwerk-Tool schreibt die Shell-Ausgabe wieder in die Pipe zurück

Für fertige, dienst-/sprachabhängige Einzeiler ist
[revshells.com](https://www.revshells.com) die übliche Referenz – dort wählt man Typ, IP und Port aus.

## Mit einer Bind-Shell verbinden
```bash
nc -nv ziel-ip 8080
```

## Web-Shells über die URL
Wird eine Web-Shell (z. B. eine hochgeladene PHP-Datei) über Parameter angesprochen, gibt es zwei
Stolpersteine:
- Mehrere Befehle hintereinander trennt man mit `;`. In der URL muss das oft als `%3B` kodiert werden,
  weil `&` dort schon Parameter trennt.
- Je nach Server funktioniert auch die unkodierte Variante – ausprobieren.

## In eigenen Worten
Reverse = „ruf mich an“, Bind = „ich warte auf deinen Anruf“. Bei Web-Shells ist die halbe Miete, die
Sonderzeichen in der URL richtig zu kodieren.

## Verteidigungssicht
Ausgehende Verbindungen einschränken (Egress-Filtering), Uploads streng validieren und nicht im
Web-Root ausführbar ablegen, ungewöhnliche ausgehende Verbindungen von Servern überwachen.
