# Produktanforderungen

> Dieses Dokument beschreibt das Zielprodukt. Bereits implementierte und noch
> fehlende Teile stehen in [CURRENT_STATE.md](CURRENT_STATE.md).

## Ziel

Gäste sollen ohne Konto in wenigen Minuten einen Parkplatz für einen klaren
Zeitraum buchen und bezahlen können. Der Betreiber vermeidet Doppelbuchungen und
kann jede Zahlung, Stornierung und Rückerstattung nachvollziehen.

## Primärer Ablauf

1. Gast wählt Anreise- und Abreisedatum.
2. Das System zeigt jeden Stellplatz als frei oder ausgebucht.
3. Gast wählt einen freien Platz und sieht den verbindlichen Gesamtpreis.
4. Gast gibt Name, E-Mail und optional das Kennzeichen ein.
5. Das System hält den Platz kurzzeitig und startet Stripe Checkout.
6. Erst ein verifiziertes Stripe-Webhook bestätigt die Buchung.
7. Gast erhält Bestätigung und einen zeitlich begrenzten Verwaltungslink.

## Stornierung

- Vor der Bestätigung wird der exakte Rückerstattungsbetrag angezeigt.
- 7 oder mehr volle Tage vor Anreise: 100 % Rückerstattung.
- 2 bis unter 7 volle Tage: 50 % Rückerstattung.
- Weniger als 48 Stunden oder nach Beginn: keine automatische Rückerstattung.
- Betreiber kann Kulanzfälle begründet manuell behandeln; der Audit-Log bleibt erhalten.

## Muss-Kriterien für Version 1

- Mobile und Desktop, Tastaturbedienung, verständliche Fehlermeldungen.
- Zeitzone `Europe/Zurich`, Preise in CHF und ganzzahligen Rappen.
- Keine Doppelbuchung trotz paralleler Anfragen.
- Ausgebuchte Plätze sind sichtbar, aber nicht auswählbar.
- Abgebrochene Zahlungen geben den Platz automatisch wieder frei.
- Idempotente Stripe-Webhooks und idempotente Stornierung.
- E-Mail-Bestätigung, Verwaltungslink und Rückerstattungsbeleg.
- Datenschutzkonforme Lösch- und Aufbewahrungsregeln.

## Nicht Bestandteil der ersten Version

- Gäste-Konten, Monatsabos, dynamische Preise, Warteliste oder mehrere Standorte.
- Barzahlung, Apple-/Google-Kalendersynchronisation oder automatische Schrankenöffnung.

## Abnahmeszenarien

- Zwei Gäste können denselben Platz im selben Zeitraum nicht beide bezahlen.
- Eine Abreise am Tag der nächsten Anreise gilt nicht als Überschneidung.
- Ein nicht bezahlter Hold läuft aus und blockiert keine weitere Buchung.
- Wiederholte Webhooks erzeugen weder doppelte Buchungen noch doppelte Erstattungen.
- Der angezeigte Stornobetrag entspricht exakt dem an Stripe gesendeten Betrag.
