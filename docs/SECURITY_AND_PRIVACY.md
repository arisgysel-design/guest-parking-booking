# Sicherheit und Datenschutz

> Sicherheitsvertrag für die weitere Implementierung und den späteren Livebetrieb.
> Der aktuelle Funktionsstand steht in [CURRENT_STATE.md](CURRENT_STATE.md).

## Zahlungsdaten

- Ausschließlich Stripe Checkout verwenden; keine Kartendaten verarbeiten oder speichern.
- Webhook-Signatur gegen den unveränderten Request-Body prüfen.
- Event-ID und Refund-Idempotency-Key eindeutig speichern.
- Secret Keys nur serverseitig und ausschließlich als Deployment-Secrets halten.

## Buchungsschutz

- Alle Eingaben serverseitig validieren und normalisieren.
- Verwaltungslinks mit HMAC, Buchungs-ID, Zweck und kurzer Ablaufzeit signieren.
- Mutation-Endpunkte gegen CSRF, Replay und Brute Force schützen.
- Statuswechsel als erlaubte Zustandsmaschine implementieren.
- Gast-E-Mail niemals als alleinigen Berechtigungsnachweis verwenden.

## Datensparsamkeit

Erforderlich sind Name, E-Mail, Zeitraum und Stellplatz. Kennzeichen ist optional.
Keine vollständigen Stripe-Payloads speichern. Logs dürfen weder Secrets noch
personenbezogene Formulardaten enthalten.

## Aufbewahrung

Vor dem Livegang verbindlich festlegen. Vorschlag: operative Buchungsdaten bis 90
Tage nach Abreise, notwendige Finanzbelege gemäß gesetzlicher Frist, technische
Logs maximal 30 Tage. Löschung muss Audit- und Buchhaltungspflichten trennen.

## Browser-Sicherheit

CSP, HSTS, `frame-ancestors`, sichere Cookies, Referrer-Policy und restriktive
Permissions-Policy aktivieren. Abhängigkeiten werden automatisiert geprüft.
