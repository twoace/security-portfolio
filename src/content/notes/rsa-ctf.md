---
title: "RSA für CTFs verstehen"
description: "Wie RSA funktioniert, die Variablen p, q, n, e, d, m, c, ein durchgerechnetes Mini-Beispiel und warum fast jede RSA-Aufgabe auf das Faktorisieren von n hinausläuft."
date: 2026-09-22
source: "TryHackMe – Cryptography / CTF-Krypto"
tags: [krypto, ctf, rsa]
draft: true
---

RSA ist ein Verschlüsselungsverfahren mit zwei Schlüsseln:
- Den **öffentlichen** Schlüssel darf jeder kennen – damit wird verschlüsselt.
- Den **privaten** Schlüssel kennt nur der Empfänger – damit wird entschlüsselt.

## Die Variablen
| Symbol | Bedeutung |
|--------|-----------|
| `p`, `q` | zwei große Primzahlen (geheim) |
| `n` | Produkt `p · q` (öffentlich) |
| `e` | öffentlicher Exponent, oft `65537` |
| `d` | privater Exponent |
| `m` | Klartext (als Zahl) |
| `c` | Geheimtext (als Zahl) |

Öffentlicher Schlüssel: `(n, e)`. Privater Schlüssel: `d`.

## Die zwei Formeln
```
Verschlüsseln:   c = m^e mod n
Entschlüsseln:   m = c^d mod n
```
`mod n` heißt: der Rest beim Teilen durch `n`. (Wie die Uhr: 10 Uhr + 5 Stunden = 3 Uhr,
also `15 mod 12 = 3`.)

## Mini-Beispiel mit kleinen Zahlen
1. Primzahlen: `p = 3`, `q = 11`
2. `n = 3 · 11 = 33`
3. `φ = (p−1)·(q−1) = 2 · 10 = 20`
4. `e = 3` wählen
5. `d` so, dass `e · d mod φ = 1`: `3 · 7 = 21`, und `21 mod 20 = 1`, also `d = 7`

Nachricht `m = 4` verschlüsseln:
```
c = 4^3 mod 33 = 64 mod 33 = 31
```
Entschlüsseln:
```
m = 31^7 mod 33 = 4   ✓
```
`e` und `d` passen zusammen wie Schloss und Schlüssel.

## `pow()` in Python
```python
pow(2, 3)        # 2^3 = 8
pow(4, 3, 33)    # 4^3 mod 33 = 31   ← diese Form braucht man bei RSA ständig
pow(3, -1, 20)   # 7   = das "Gegenstück" von 3 modulo 20 (das d)
```
`pow(m, e, n)` rechnet die Potenz modular und bleibt dabei klein – `(m ** e) % n` würde bei großen
Zahlen den Speicher sprengen.

## Warum RSA sicher ist – und wo es kippt
Um `d` zu berechnen, braucht man `φ(n)`, und dafür `p` und `q`. Wer nur `n` kennt, müsste `n` in seine
Primfaktoren zerlegen. Bei 2048-Bit-Zahlen ist das praktisch unmöglich.

Deshalb laufen fast alle RSA-CTF-Aufgaben auf **eine** Frage hinaus: *Wie komme ich trotzdem an `p` und
`q`?* Typische Schwächen: `p` und `q` liegen zu nah beieinander, `n` ist klein genug zum Faktorisieren,
oder `e` ist sehr klein. Hat man `p` und `q`, berechnet man `φ`, daraus `d`, und dann `m = c^d mod n`.
`bytes_to_long` wandelt den Text der Flagge in die Zahl `m` um.

## In eigenen Worten
Verschlüsseln und Entschlüsseln sind dieselbe Rechnung – einmal mit `e`, einmal mit `d`. Die ganze
Sicherheit hängt daran, dass niemand `n` faktorisieren kann. CTF-Aufgaben bauen genau da eine Lücke ein.
