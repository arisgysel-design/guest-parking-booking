# Buchungs- und Stornoregeln

## Zeitraum und Preis

- Anreisetag ist belegt, Abreisetag ist wieder verfügbar.
- Mindestens 1 Tag, maximal 31 Tage pro Buchung.
- Preis = Anzahl Tage × gespeicherter Tagespreis in Rappen.
- Preis und Policy-Version werden bei Buchung eingefroren.

## Hold und Ausgebucht-Status

Ein Checkout hält den Stellplatz für 15 Minuten. `held` und noch nicht
abgelaufen sowie `confirmed` blockieren den Zeitraum. `cancelled`, `expired` und
`refunded` blockieren nicht. Die UI darf Verfügbarkeit vorab anzeigen, aber die
serverseitige Prüfung unmittelbar vor dem Hold entscheidet.

## Policy `2026-09-v1`

| Zeitpunkt der Stornierung                | Rückerstattung |
| ---------------------------------------- | -------------: |
| Mindestens 7 volle Tage vor Anreise      |          100 % |
| Mindestens 48 Stunden, aber unter 7 Tage |           50 % |
| Unter 48 Stunden                         |            0 % |
| Nach Anreise                             |            0 % |

Die Berechnung verwendet exakte Zeitpunkte in UTC, zeigt sie Gästen aber in
`Europe/Zurich`. Bei einem ungeraden Rappenbetrag wird die 50-%-Erstattung
zugunsten einer deterministischen Buchhaltung abgerundet.

## Sicherer Stornoablauf

1. Gast öffnet einen signierten, zeitlich begrenzten Verwaltungslink.
2. Server lädt Buchung und Policy-Version und berechnet eine Vorschau.
3. Gast bestätigt Betrag und Wirkung explizit.
4. Server sperrt die Buchung, prüft Status erneut und erzeugt genau eine
   Stripe-Erstattung mit stabiler Idempotency-Key.
5. Webhook bestätigt die Erstattung; Status und Audit-Trail werden aktualisiert.

Keine Stornierung allein anhand einer erratbaren Buchungsnummer zulassen.
