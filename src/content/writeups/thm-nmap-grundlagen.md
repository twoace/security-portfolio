---
title: "THM: Nmap – Scans verstehen statt auswendig lernen"
description: "Beispiel-Writeup: Welche Scan-Typen es gibt, wann man welchen nutzt und wie sie auf Paketebene aussehen."
date: 2026-09-20
platform: TryHackMe
difficulty: Easy
roomUrl: https://tryhackme.com/room/furthernmap
tags: [recon, netzwerk, nmap]
---

> **Beispiel-Eintrag.** Ersetze ihn durch deinen eigenen Writeup. Er zeigt nur die Struktur.

## Ziel
Den Unterschied zwischen den wichtigsten Nmap-Scan-Typen verstehen und sie gezielt einsetzen.

## Recon

```bash
# SYN-Scan (braucht root): schickt SYN, wertet SYN/ACK bzw. RST aus, baut keine volle Verbindung auf
sudo nmap -sS -p- --min-rate 1000 -oN scans/all-ports.txt 10.10.x.x

# Service- und Script-Scan nur auf die gefundenen Ports
sudo nmap -sC -sV -p 22,80 -oN scans/services.txt 10.10.x.x
```

| Scan | Flag | Wann sinnvoll |
|------|------|---------------|
| TCP Connect | `-sT` | ohne root-Rechte |
| SYN | `-sS` | Standard, schnell, „leiser“ |
| UDP | `-sU` | DNS, SNMP, DHCP – langsam! |
| NULL/FIN/Xmas | `-sN/-sF/-sX` | Firewall-Verhalten testen |

## Was ich gelernt habe
- `-p-` erst einmal alle Ports schnell scannen, **dann** gezielt `-sV -sC`, spart viel Zeit.
- Ein „filtered“-Port heißt: keine Antwort, meistens eine Firewall, die verwirft.
- Mit Wireshark parallel mitschneiden hilft enorm, die Scan-Typen wirklich zu verstehen.

## Verteidigungssicht
Viele SYNs ohne abgeschlossenen Handshake von einer Quelle in kurzer Zeit sind ein klassisches
Signal für Port-Scans. IDS wie Suricata haben dafür fertige Regeln.
