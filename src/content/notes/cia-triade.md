---
title: "CIA-Triade und warum sie überall auftaucht"
description: "Beispiel-Notiz: Vertraulichkeit, Integrität, Verfügbarkeit – mit konkreten Beispielen für Angriffe und Schutzmaßnahmen."
date: 2026-09-15
source: "TryHackMe Pre-Security"
tags: [grundlagen, grc]
---

> **Beispiel-Eintrag.**

## Kernaussagen

| Schutzziel | Bedeutung | Angriff (Beispiel) | Schutzmaßnahme |
|---|---|---|---|
| **C**onfidentiality | Nur Berechtigte sehen Daten | Datenleck, Sniffing | Verschlüsselung, Zugriffskontrolle |
| **I**ntegrity | Daten unverändert & korrekt | Manipulation, MITM | Hashes, Signaturen |
| **A**vailability | Systeme erreichbar | DDoS, Ransomware | Redundanz, Backups |

## In eigenen Worten
Fast jede Sicherheitsmaßnahme lässt sich einem dieser drei Ziele zuordnen.
Gute Frage bei jedem Vorfall: *Welches Schutzziel wurde verletzt?*
