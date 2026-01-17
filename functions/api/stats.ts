type KVNamespaceLike = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
  list: (options?: { prefix?: string }) => Promise<{ keys: { name: string }[] }>;
};

type Env = {
  VISITS: KVNamespaceLike;
};

type PagesContext = {
  env: Env;
};

export async function onRequest({ env }: PagesContext) {
  const totalRaw = await env.VISITS.get("total");
  const total = Number.parseInt(totalRaw ?? "0", 10) || 0;

  const listed = await env.VISITS.list({ prefix: "day:" });
  const byDay = (listed?.keys ?? [])
    .map((k) => k.name)
    .sort()
    .slice(-30);

  const dayCounts = await Promise.all(
    byDay.map(async (k: string) => {
      const v = await env.VISITS.get(k);
      return { day: k.replace("day:", ""), visits: Number.parseInt(v ?? "0", 10) || 0 };
    })
  );

  let log: unknown[] = [];
  try {
    const logRaw = await env.VISITS.get("log");
    const parsed: unknown = logRaw ? JSON.parse(logRaw) : [];
    log = Array.isArray(parsed) ? (parsed as unknown[]) : [];
  } catch {
    log = [];
  }

  return new Response(JSON.stringify({ total, dayCounts, log }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
