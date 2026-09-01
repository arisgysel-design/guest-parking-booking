# Guest Parking Booking

Eine einfache deutschsprachige Buchungsseite für Gäste: Zeitraum im Kalender
wählen, verfügbaren Parkplatz reservieren, über Stripe bezahlen und eine
nachvollziehbare Stornierung auslösen.

> Status: Das Repository enthält das geprüfte technische Fundament und einen
> interaktiven Frontend-Prototyp. Echte Buchungen, Stripe-Zahlungen und
> E-Mail-Versand sind bewusst noch nicht aktiviert.

## Einstieg für neue Entwickler

1. [Codex- und Repository-Regeln](AGENTS.md) lesen.
2. [Aktuellen Implementierungsstand](docs/CURRENT_STATE.md) lesen.
3. Mit der [klar abgegrenzten Starter-Aufgabe](docs/NEXT_TASK.md) beginnen.

[Codex lädt `AGENTS.md` beim Start aus dem Repository](https://developers.openai.com/codex/guides/agents-md).
Eine neue Codex-Sitzung daher im Repository-Root starten.

## Funktionsumfang

- Kalenderauswahl mit halb-offenen Zeiträumen (Anreise inklusive, Abreise exklusive)
- Sichtbare Zustände für freie und ausgebuchte Stellplätze
- Versionierte Stornologik mit 100 %, 50 % oder 0 % Rückerstattung
- D1/SQLite-Datenmodell für Stellplätze, Buchungen, Zahlungen und Audit-Ereignisse
- Tests für Überschneidungen, Verfügbarkeit und Storno-Grenzfälle
- CI für Format, Lint, Typen, Tests, Build und Produktions-Abhängigkeiten

## Lokale Entwicklung

Voraussetzungen: Node.js 22.13 oder neuer und npm. `.node-version` fixiert die
verifizierte lokale Version für kompatible Versionsmanager.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Die lokale URL wird vom Entwicklungsserver ausgegeben. Für den aktuellen
Frontend-Prototyp werden noch keine Stripe-Schlüssel benötigt.

## Qualitätsprüfungen

```bash
npm run verify
```

Dieser eine Befehl entspricht dem verpflichtenden lokalen und CI-Gate: Format,
Lint, Typen, Tests mit Coverage, Build und Produktions-Abhängigkeitsprüfung.

## Dokumentation

- [Produktanforderungen](docs/PRODUCT_REQUIREMENTS.md)
- [Architektur](docs/ARCHITECTURE.md)
- [Buchungs- und Stornoregeln](docs/BOOKING_AND_CANCELLATION.md)
- [Sicherheit und Datenschutz](docs/SECURITY_AND_PRIVACY.md)
- [Betrieb](docs/OPERATIONS.md)
- [Mitwirken](CONTRIBUTING.md)

## Veröffentlichung

Der vorgesehene Cloudflare-Pfad ist `https://parking.justsunny.ch`. Es existieren
noch kein DNS-Eintrag und kein Live-Deployment.

## Lizenzstatus

Dieses öffentliche Repository besitzt derzeit keine Open-Source-Lizenz. Öffentliche
Sichtbarkeit erlaubt Einsicht und Zusammenarbeit per Pull Request, aber keine
allgemeine Wiederverwendungsfreigabe. Die Lizenzwahl bleibt eine Entscheidung des
Repository-Inhabers.

## Wichtige Entscheidung vor dem Livegang

Die Stornoregeln sind als vernünftiger Ausgangspunkt implementiert, aber noch
keine Rechtsberatung. Preise, Rückerstattungsfristen, Betreiberangaben,
Datenschutzerklärung und AGB müssen vor dem Livegang fachlich bestätigt werden.
