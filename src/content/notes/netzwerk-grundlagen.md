---
title: "Netzwerk-Grundlagen: OSI-Modell und private Netze"
description: "Die sieben OSI-Schichten mit Merksatz, die privaten IP-Bereiche und wie CIDR-Notation (/24) funktioniert."
date: 2026-09-10
source: "TryHackMe – Networking Fundamentals"
tags: [grundlagen, netzwerk]
draft: true
---

## Das OSI-Modell

Sieben Schichten, von unten nach oben. Merksatz: **P**lease **D**o **N**ot **T**hrow **S**alami **P**izza **A**way.

| # | Schicht | Aufgabe (grob) | Beispiel |
|---|---------|----------------|----------|
| 1 | Physical | Bits als Signal über das Medium | Kabel, Funk |
| 2 | Data Link | Rahmen zwischen zwei Geräten im selben Netz | MAC, Switch |
| 3 | Network | Wegfindung zwischen Netzen (Routing) | IP, Router |
| 4 | Transport | Zuverlässigkeit, Ports | TCP, UDP |
| 5 | Session | Verbindungen auf- und abbauen | — |
| 6 | Presentation | Format, Verschlüsselung, Kodierung | TLS, Zeichensätze |
| 7 | Application | Das, was der Nutzer sieht | HTTP, DNS, SSH |

Warum das praktisch ist: Wenn ein Problem auftritt, kann man es einer Schicht zuordnen.
„Kein Link-Licht“ ist Schicht 1, „Ping geht, aber die Webseite nicht“ ist eher Schicht 7.

## Private Netze (RFC 1918)

Diese Bereiche sind für interne Netze reserviert und werden nicht im öffentlichen Internet geroutet:

- `10.0.0.0` – `10.255.255.255`
- `172.16.0.0` – `172.31.255.255`
- `192.168.0.0` – `192.168.255.255`

## CIDR kurz erklärt

Die Zahl hinter dem Schrägstrich sagt, wie viele Bits das Netz festlegen. Der Rest sind Hosts.

`192.168.0.0/24` bedeutet: die ersten 24 Bit (`192.168.0`) stehen fest, das letzte Oktett läuft
von `0` bis `255`. Das sind 256 Adressen, davon rund 254 nutzbar für Hosts.

## In eigenen Worten
Das OSI-Modell ist eine Landkarte für „wo im Stapel passiert gerade was“. Private Netze erkennt
man an den drei Bereichen oben, und `/24` ist einfach die Kurzschreibweise für „ein ganzes letztes
Oktett voller Hosts“.
