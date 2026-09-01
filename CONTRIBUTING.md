# Mitwirken

Vor dem ersten Beitrag `AGENTS.md`, `docs/CURRENT_STATE.md` und
`docs/NEXT_TASK.md` lesen. Neue Entwickler beginnen mit der dort beschriebenen
Starter-Aufgabe, sofern kein anderes Issue zugewiesen wurde.

## Arbeitsweise

1. Kleinen Branch von `main` erstellen.
2. Änderung mit passenden Tests umsetzen.
3. `npm run verify` lokal ausführen.
4. Pull Request mit Motivation, Testnachweis und möglichen Risiken eröffnen.

## Definition of Done

- Verhalten und Fehlerzustände sind dokumentiert.
- Geschäftsregeln besitzen Unit-Tests, insbesondere Zeit- und Geldgrenzen.
- Keine Secrets, personenbezogenen Testdaten oder Stripe-Payloads sind eingecheckt.
- Datenbankänderungen enthalten eine geprüfte Migration.
- Änderungen an Stornoregeln erhöhen die Policy-Version; bestehende Buchungen
  behalten die bei Abschluss gespeicherte Version.
- Nur tatsächlich verwendete UI-Primitives und Abhängigkeiten einchecken.

## Commits

Kurze imperative Beschreibung verwenden, zum Beispiel:
`Add idempotent Stripe webhook handler`.
