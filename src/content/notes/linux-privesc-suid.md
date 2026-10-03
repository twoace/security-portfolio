---
title: "Linux Privilege Escalation: SUID-Binaries & GTFOBins"
description: "Wie man nach einem Fuß in der Tür auf einem Lab-System prüft, welche Rechte man hat, SUID-Dateien findet und normale von verdächtigen unterscheidet."
date: 2026-09-30
source: "TryHackMe – Linux PrivEsc"
tags: [privesc, linux, ctf]
draft: true
---

> Lernnotiz für autorisierte Lab-/CTF-Umgebungen. Die Schritte setzen voraus, dass man bereits
> legitimen (eingeschränkten) Zugriff auf das eigene Übungssystem hat.

## Erste Orientierung
```bash
id                                    # wer bin ich, in welchen Gruppen?
sudo -l                               # darf ich etwas als root ausführen?
ls -la ~/.ssh/ /home/*/.ssh/ 2>/dev/null
```

## SUID-Binaries finden
Das SUID-Bit lässt ein Programm mit den Rechten seines Besitzers laufen – bei root also mit root-Rechten.
```bash
find / -perm -4000 2>/dev/null
```

## Normal von verdächtig unterscheiden
Die meisten Treffer sind völlig normal, weil sie das SUID-Bit für ihren Zweck brauchen:

| Normal (ignorieren) | Warum SUID |
|---------------------|------------|
| `passwd`, `chsh`, `gpasswd`, `newgrp` | müssen Systemdateien ändern |
| `sudo`, `su` | müssen den Benutzer wechseln |
| `mount`, `umount`, `ping` | brauchen Kernel-/Netzwerkrechte |

**Verdächtig** ist alles, was da eigentlich nichts zu suchen hat: Standard-Tools wie `find`, `vim`,
`less`, `awk`, `python`, `bash`, `cp`, oder selbstgeschriebene Programme mit ungewöhnlichem Namen.
Faustregel: Wenn ein Tool, mit dem man Dateien lesen, Text bearbeiten oder Befehle ausführen kann,
SUID-root ist → hohes Alarmzeichen.

## GTFOBins
Für bekannte Tools listet [gtfobins.github.io](https://gtfobins.github.io) auf, wie sie sich
missbrauchen lassen. Man sucht das Tool, wählt die Sektion „SUID“ und bekommt den passenden Weg
beschrieben, warum und wie die erhöhten Rechte erhalten bleiben.

## Selbstgeschriebene Programme
Bei unbekannten Programmen schaut man, was sie intern tun:
```bash
strings /pfad/zum/programm      # lesbare Textfragmente, aufgerufene Befehle
```
Häufiger Fund: Das Programm ruft ein anderes Tool ohne vollen Pfad auf (z. B. nur `service` statt
`/usr/sbin/service`). Das kann über **PATH-Manipulation** ausnutzbar sein.

## Automatisierung
Skripte wie **LinPEAS** sammeln viele dieser Prüfungen automatisch ein und markieren Auffälligkeiten
farblich.

## In eigenen Worten
Der Ablauf: Rechte prüfen (`id`, `sudo -l`), SUID-Dateien suchen, aus der Liste das Ungewöhnliche
herauspicken und bei GTFOBins nachschlagen. Verstehen, *warum* etwas funktioniert, ist wichtiger als
den Befehl auswendig zu können.

## Verteidigungssicht
SUID-Bits sparsam vergeben, regelmäßig auditieren (`find / -perm -4000`), Programme mit absoluten Pfaden
aufrufen und `PATH` nicht aus unsicheren Quellen übernehmen.
