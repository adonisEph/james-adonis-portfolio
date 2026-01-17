type KVNamespaceLike = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
  list: (options?: { prefix?: string }) => Promise<{ keys: { name: string }[] }>;
};

type Env = {
  VISITS: KVNamespaceLike;
};

type Cf = {
  country?: string;
};

type RequestWithCf = Request & { cf?: Cf };

type PagesContext = {
  request: RequestWithCf;
  env: Env;
};

export async function onRequest({ request, env }: PagesContext) {
  if (request.method !== "POST" && request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const url = new URL(request.url);
    const today = new Date().toISOString().slice(0, 10);

    const totalKey = "total";
    const dayKey = `day:${today}`;
    const logKey = "log";

    const totalRaw = await env.VISITS.get(totalKey);
    const dayRaw = await env.VISITS.get(dayKey);

    const total = Number.parseInt(totalRaw ?? "0", 10) || 0;
    const day = Number.parseInt(dayRaw ?? "0", 10) || 0;

    await env.VISITS.put(totalKey, String(total + 1));
    await env.VISITS.put(dayKey, String(day + 1));

    let body: unknown = null;
    if (request.method === "POST") {
      try {
        body = await request.json();
      } catch {
        body = null;
      }
    }

    const cf = request.cf ?? {};
    const bodyObj =
      body && typeof body === "object" ? (body as { path?: string; ref?: string }) : null;
    const entry = {
      ts: new Date().toISOString(),
      path: bodyObj?.path ?? url.pathname,
      ref: bodyObj?.ref ?? request.headers.get("referer") ?? "",
      ua: request.headers.get("user-agent") ?? "",
      country: cf.country ?? "",
    };

    const logRaw = await env.VISITS.get(logKey);
    let log: unknown = [];
    try {
      log = logRaw ? JSON.parse(logRaw) : [];
    } catch {
      log = [];
    }
    const logArr = Array.isArray(log) ? log : [];

    const nextLog = [entry, ...logArr].slice(0, 50);
    await env.VISITS.put(logKey, JSON.stringify(nextLog));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }
}
