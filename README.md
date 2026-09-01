# Guest Parking Booking

Eine einfache deutschsprachige Buchungsseite für Gäste: Zeitraum im Kalender
wählen, verfügbaren Parkplatz reservieren, über Stripe bezahlen und eine
nachvollziehbare Stornierung auslösen.

> Status: Das Repository enthält das geprüfte technische Fundament und einen
> interaktiven Frontend-Prototyp. Echte Buchungen, Stripe-Zahlungen und
> E-Mail-Versand sind bewusst noch nicht aktiviert.

## Funktionsumfang

- Kalenderauswahl mit halb-offenen Zeiträumen (Anreise inklusive, Abreise exklusive)
- Sichtbare Zustände für freie und ausgebuchte Stellplätze
- Versionierte Stornologik mit 100 %, 50 % oder 0 % Rückerstattung
- D1/SQLite-Datenmodell für Stellplätze, Buchungen, Zahlungen und Audit-Ereignisse
- Tests für Überschneidungen, Verfügbarkeit und Storno-Grenzfälle
- CI für Format, Lint, Typen, Tests, Build und Produktions-Abhängigkeiten

## Lokale Entwicklung

Voraussetzungen: Node.js 22.13 oder neuer und npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Die lokale URL wird vom Entwicklungsserver ausgegeben. Für den aktuellen
Frontend-Prototyp werden noch keine Stripe-Schlüssel benötigt.

## Qualitätsprüfungen

```bash
npm run check
npm run test:coverage
npm run build
```

## Dokumentation

- [Produktanforderungen](docs/PRODUCT_REQUIREMENTS.md)
- [Architektur](docs/ARCHITECTURE.md)
- [Buchungs- und Stornoregeln](docs/BOOKING_AND_CANCELLATION.md)
- [Sicherheit und Datenschutz](docs/SECURITY_AND_PRIVACY.md)
- [Betrieb](docs/OPERATIONS.md)
- [Mitwirken](CONTRIBUTING.md)

## Wichtige Entscheidung vor dem Livegang

Die Stornoregeln sind als vernünftiger Ausgangspunkt implementiert, aber noch
keine Rechtsberatung. Preise, Rückerstattungsfristen, Betreiberangaben,
Datenschutzerklärung und AGB müssen vor dem Livegang fachlich bestätigt werden.
