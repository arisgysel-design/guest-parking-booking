# ADR 0002: Stripe-Webhooks sind autoritativ

- Status: Angenommen
- Datum: 2026-09-01

## Entscheidung

Nur ein signierter, idempotent verarbeiteter Stripe-Webhook bestätigt Zahlung
oder Erstattung. Browser-Redirects ändern keinen Buchungsstatus.

## Begründung

Redirects können fehlen, manipuliert oder wiederholt werden. Stripe liefert
Webhook-Events erneut, weshalb die Event-ID eindeutig gespeichert wird.

## Folgen

Die UI zeigt bis zur Verarbeitung einen ehrlichen Zwischenstatus. Webhook-Retries
und manuelle Wiederverarbeitung benötigen ein Runbook.
