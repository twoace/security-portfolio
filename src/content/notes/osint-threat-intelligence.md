---
title: "OSINT & Threat Intelligence: Shodan, VirusTotal, CVE"
description: "Drei Werkzeuge zur Recherche: Geräte im Internet finden, Dateien und URLs auf Schadcode prüfen und Schwachstellen nachschlagen."
date: 2026-09-12
source: "TryHackMe – Threat Intelligence Tools"
tags: [grundlagen, osint, threat-intel]
draft: true
---

## Shodan
Eine Suchmaschine für mit dem Internet verbundene Geräte – oft „Google für IoT“ genannt.
Statt Webseiten indexiert Shodan offene Dienste: Webserver, Kameras, Datenbanken, Industriesteuerungen.
Nützlich, um zu verstehen, wie groß die Angriffsfläche eines Dienstes im Internet wirklich ist.

## VirusTotal
Prüft eine **Datei, URL, Domain oder einen File-Hash** gegen viele Antiviren-Engines und Reputationslisten
und zeigt, ob etwas als bösartig eingestuft wird. Praktisch: Man muss die verdächtige Datei nicht selbst
ausführen, sondern kann oft schon den Hash nachschlagen. Hinweis: Hochgeladene Dateien werden geteilt –
also nichts Vertrauliches hochladen.

## CVE
**Common Vulnerabilities and Exposures** ist der Katalog bekannter Schwachstellen. Jede bekommt eine ID
(z. B. `CVE-2021-44228`) und über das CVSS einen Schweregrad-Score von 0 bis 10. So lässt sich einordnen,
wie kritisch eine Lücke ist und ob sie für ein eingesetztes Produkt relevant ist.

## In eigenen Worten
Das sind meine drei Nachschlage-Werkzeuge vor und während einer Analyse: Shodan sagt „was ist überhaupt
erreichbar“, VirusTotal sagt „ist das hier gefährlich“, und die CVE-Datenbank sagt „welche bekannten
Lücken hat die Software“.
