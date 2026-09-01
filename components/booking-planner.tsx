'use client';

import { useMemo, useState } from 'react';
import { de } from 'date-fns/locale';
import { differenceInCalendarDays, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import {
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const PARKING_SPACES = [
  {
    id: 'hof-1',
    name: 'Innenhof 1',
    detail: 'Direkt beim Hauseingang',
    pricePerDay: 12,
    available: true,
  },
  {
    id: 'hof-2',
    name: 'Innenhof 2',
    detail: 'Breiter Stellplatz',
    pricePerDay: 12,
    available: false,
  },
  {
    id: 'carport',
    name: 'Carport',
    detail: 'Überdacht, Einfahrtshöhe 2,10 m',
    pricePerDay: 16,
    available: true,
  },
] as const;

const INITIAL_RANGE: DateRange = {
  from: new Date(2026, 8, 5),
  to: new Date(2026, 8, 7),
};

export function BookingPlanner() {
  const [range, setRange] = useState<DateRange | undefined>(INITIAL_RANGE);
  const [parkingId, setParkingId] = useState<string>('hof-1');

  const selectedParking = PARKING_SPACES.find((spot) => spot.id === parkingId);
  const dayCount = useMemo(() => {
    if (!range?.from || !range.to) return 0;
    return Math.max(1, differenceInCalendarDays(range.to, range.from));
  }, [range]);
  const total = dayCount * (selectedParking?.pricePerDay ?? 0);

  const rangeLabel =
    range?.from && range.to
      ? `${format(range.from, 'dd. MMM', { locale: de })} – ${format(range.to, 'dd. MMM yyyy', { locale: de })}`
      : 'Zeitraum wählen';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <CarFront className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold tracking-tight">Gästeparkplatz</p>
              <p className="text-xs text-muted-foreground">Einfach ankommen</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Buchung verwalten
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-8 max-w-2xl">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1">
            Reservierung in wenigen Schritten
          </Badge>
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Wann dürfen wir einen Platz freihalten?
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Zeitraum wählen, freien Parkplatz aussuchen und sicher bezahlen. Die
            Verfügbarkeit wird vor der Zahlung nochmals geprüft.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <Card className="overflow-hidden border-border/80 shadow-sm">
              <CardHeader className="border-b bg-muted/35">
                <div className="flex items-center gap-3">
                  <span className="step-number">1</span>
                  <div>
                    <CardTitle>Aufenthalt wählen</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Anreise inklusive, Abreise exklusive
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 p-5 md:grid-cols-[auto_1fr] md:p-7">
                <div className="overflow-x-auto rounded-2xl border bg-card p-1">
                  <Calendar
                    mode="range"
                    locale={de}
                    selected={range}
                    onSelect={setRange}
                    defaultMonth={INITIAL_RANGE.from}
                    numberOfMonths={1}
                    className="mx-auto"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-secondary p-5">
                  <CalendarDays className="mb-4 size-6 text-primary" />
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Gewählter Zeitraum
                  </p>
                  <p className="mt-2 text-xl font-semibold">{rangeLabel}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {dayCount > 0
                      ? `${dayCount} Tage`
                      : 'Bitte Hin- und Rückfahrt wählen'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80 shadow-sm">
              <CardHeader className="border-b bg-muted/35">
                <div className="flex items-center gap-3">
                  <span className="step-number">2</span>
                  <div>
                    <CardTitle>Parkplatz auswählen</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Verfügbarkeit für {rangeLabel}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 p-5 md:grid-cols-3 md:p-7">
                {PARKING_SPACES.map((spot) => {
                  const selected = spot.id === parkingId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      disabled={!spot.available}
                      onClick={() => setParkingId(spot.id)}
                      className={cn(
                        'relative min-h-40 rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40',
                        selected
                          ? 'border-primary bg-primary text-primary-foreground shadow-md'
                          : 'bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm',
                        !spot.available &&
                          'cursor-not-allowed border-dashed bg-muted/60 text-muted-foreground opacity-75 hover:translate-y-0 hover:border-border hover:shadow-none',
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <CarFront className="size-6" aria-hidden="true" />
                        {selected && (
                          <Check className="size-5" aria-hidden="true" />
                        )}
                      </div>
                      <p className="mt-5 font-semibold">{spot.name}</p>
                      <p
                        className={cn(
                          'mt-1 text-xs leading-5',
                          selected
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground',
                        )}
                      >
                        {spot.available
                          ? spot.detail
                          : 'Für diesen Zeitraum ausgebucht'}
                      </p>
                      <p className="mt-3 text-sm font-medium">
                        {spot.available
                          ? `CHF ${spot.pricePerDay} / Tag`
                          : 'Nicht verfügbar'}
                      </p>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <Card className="border-primary/15 shadow-[0_18px_60px_-28px_oklch(0.36_0.08_175/45%)]">
              <CardHeader>
                <CardTitle>Ihre Reservierung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3 rounded-2xl bg-muted/55 p-4 text-sm">
                  <SummaryRow label="Zeitraum" value={rangeLabel} />
                  <SummaryRow
                    label="Parkplatz"
                    value={selectedParking?.name ?? '–'}
                  />
                  <SummaryRow label="Dauer" value={`${dayCount} Tage`} />
                  <div className="border-t pt-3">
                    <SummaryRow
                      label="Gesamt"
                      value={`CHF ${total.toFixed(2)}`}
                      strong
                    />
                  </div>
                </div>
                <Button
                  size="lg"
                  className="h-12 w-full rounded-xl"
                  disabled={!dayCount}
                >
                  Weiter zur Zahlung
                  <ChevronRight data-icon="inline-end" />
                </Button>
                <div className="grid gap-3 text-xs leading-5 text-muted-foreground">
                  <p className="flex gap-2">
                    <CreditCard className="mt-0.5 size-4 shrink-0" />
                    Sichere Zahlung über Stripe. Belastung erst nach finaler
                    Verfügbarkeitsprüfung.
                  </p>
                  <p className="flex gap-2">
                    <Clock3 className="mt-0.5 size-4 shrink-0" />
                    Kostenfrei bis 7 Tage vorher, danach gestaffelte
                    Rückerstattung.
                  </p>
                  <p className="flex gap-2">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                    Buchungen werden serverseitig geschützt und nachvollziehbar
                    protokolliert.
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn('text-right', strong && 'text-base font-semibold')}>
        {value}
      </span>
    </div>
  );
}
