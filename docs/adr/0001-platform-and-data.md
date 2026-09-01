# ADR 0001: Worker-App mit D1

- Status: Angenommen
- Datum: 2026-09-01

## Entscheidung

Vinext/React wird als Worker-kompatible Webanwendung eingesetzt; D1/SQLite ist
die autoritative relationale Datenbank. Stripe Checkout übernimmt Zahlungen.

## Begründung

Die App benötigt transaktionale, dauerhaft gespeicherte Buchungen und schnelle
Datumsabfragen, aber keinen separaten Serverbetrieb. D1 passt zur Sites-Laufzeit.
Stripe reduziert den Umfang sensibler Zahlungsdaten.

## Folgen

SQLite-Schreibkonkurrenz und Worker-Laufzeit müssen berücksichtigt werden.
Externe Dienste müssen per HTTP erreichbar sein; rohe TCP-Verbindungen sind nicht
zulässig.
