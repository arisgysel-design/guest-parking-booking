# Betrieb

> Zielzustand für den späteren Livebetrieb. Aktuell existiert noch kein Deployment;
> siehe [CURRENT_STATE.md](CURRENT_STATE.md).

## Konfiguration

Benötigte Secrets: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` und
`BOOKING_LINK_SECRET`. `APP_ORIGIN` muss eine vertrauenswürdige feste HTTPS-Origin
sein. Werte aus weitergeleiteten Host-Headern dürfen nicht ungeprüft verwendet werden.

## Beobachtbarkeit

Metriken und Alarme für fehlgeschlagene Checkouts, abgelehnte Webhook-Signaturen,
Webhook-Retries, abgelaufene Holds, Buchungskonflikte und Refund-Fehler vorsehen.
Logs mit Korrelations-ID, aber ohne personenbezogene Daten schreiben.

## Runbooks

- Zahlung erfolgreich, Buchung nicht bestätigt: Stripe-Event suchen, Signatur-
  und Event-Deduplizierung prüfen, dann idempotent erneut verarbeiten.
- Doppelte Anfrage: über gespeicherte Event-ID/Idempotency-Key beantworten, nicht
  erneut buchen oder erstatten.
- Refund fehlgeschlagen: Buchung nicht als erstattet markieren; Betreiber alarmieren.
- Datenbankmigration: Backup/Export prüfen, Migration anwenden, Smoke-Test und
  `PRAGMA optimize` ausführen.

## Release

Nur grüne CI auf `main` veröffentlichen. Migrationen zuerst in einer
Vorschauumgebung prüfen. Stripe-Testmodus vollständig abnehmen, bevor Live-Secrets
gesetzt werden. Rollback muss Code und kompatibles Schema berücksichtigen.
