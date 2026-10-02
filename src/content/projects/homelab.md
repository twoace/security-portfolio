---
title: "Homelab: Segmentiertes Übungsnetz mit Logging"
description: "Beispiel-Projekt: Ein kleines Lab aus VMs mit eigenem Netzsegment, zentralem Logging und einer verwundbaren Ziel-VM."
date: 2026-09-25
status: in Arbeit
stack: [Proxmox, pfSense, Kali Linux, Wazuh]
featured: true
tags: [homelab, blue-team, netzwerk]
---

> **Beispiel-Eintrag.** Passe ihn an dein echtes Setup an.

## Motivation
Angriffe nicht nur ausführen, sondern auch sehen, wie sie in Logs aussehen.

## Aufbau
- **pfSense** als Firewall zwischen Heimnetz und Lab-Netz (das Lab kommt nicht ins Heimnetz!)
- **Kali** als Angreifer-VM
- **Metasploitable / DVWA** als Ziel
- **Wazuh** als SIEM, sammelt Logs aller VMs

## Nächste Schritte
- [ ] Sysmon auf einer Windows-VM
- [ ] Eigene Detection-Regel für Nmap-Scans schreiben und testen
