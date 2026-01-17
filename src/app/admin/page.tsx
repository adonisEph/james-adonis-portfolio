"use client";

import * as React from "react";

type Stats = {
  total: number;
  dayCounts: { day: string; visits: number }[];
  log: { ts: string; path: string; ref: string; country: string; ua: string }[];
};

export default function AdminPage() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as Stats;
      setStats(data);
    } catch {
      setError("Impossible de charger les statistiques.");
    }
  }, []);

  React.useEffect(() => {
    load();
    const id = window.setInterval(load, 30_000);
    return () => window.clearInterval(id);
  }, [load]);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Statistiques de visites (protège cette page via Cloudflare Access).
          </p>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total visites</p>
            <p className="mt-1 text-3xl font-semibold">{stats?.total ?? "—"}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Aujourd’hui</p>
            <p className="mt-1 text-3xl font-semibold">
              {stats?.dayCounts?.slice(-1)?.[0]?.visits ?? "—"}
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-base font-semibold">Visites par jour (30 derniers jours)</h2>
          <div className="mt-4 grid gap-2">
            {(stats?.dayCounts ?? []).map((d) => (
              <div key={d.day} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{d.day}</span>
                <span className="font-medium">{d.visits}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-base font-semibold">Dernières visites</h2>
          <div className="mt-4 grid gap-3">
            {(stats?.log ?? []).slice(0, 12).map((l, idx) => (
              <div key={`${l.ts}-${idx}`} className="text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{l.path}</span>
                  <span className="text-muted-foreground">{new Date(l.ts).toLocaleString()}</span>
                </div>
                <div className="mt-1 text-muted-foreground">
                  {l.country ? `${l.country} · ` : ""}
                  {l.ref ? `Ref: ${l.ref}` : "Direct"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
