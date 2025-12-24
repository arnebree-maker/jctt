// api/send-registration.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

type Body = {
  voornaam?: string;
  familienaam?: string;
  email?: string;
  telefoon?: string;
  geboortedatum?: string;
  doelgroep?: string;
  niveau?: string;
  opmerkingen?: string;
  akkoord?: boolean;
  website?: string; // honeypot
};

// --- simpele in-memory rate limit (werkt per warm instance)
const hits = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1000;

function getClientIp(req: VercelRequest) {
  const xf = req.headers["x-forwarded-for"];
  const ip = Array.isArray(xf) ? xf[0] : (xf || "").split(",")[0].trim();
  return ip || req.socket.remoteAddress || "unknown";
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  const now = Date.now();

  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
    hits.set(ip, entry);
    if (entry.count > MAX_PER_HOUR) {
      return res.status(429).json({ ok: false, error: "Te veel inschrijvingen. Probeer later opnieuw." });
    }
  }

  const body = (req.body || {}) as Body;

  // honeypot: bots vullen dit meestal in
  if (body.website && body.website.trim().length > 0) {
    return res.status(200).json({ ok: true }); // stilletjes slagen
  }

  const voornaam = (body.voornaam || "").trim();
  const familienaam = (body.familienaam || "").trim();
  const email = (body.email || "").trim();
  const telefoon = (body.telefoon || "").trim();
  const geboortedatum = (body.geboortedatum || "").trim();

  if (!voornaam || !familienaam || !email || !telefoon || !geboortedatum) {
    return res.status(400).json({ ok: false, error: "Vul alle verplichte velden in." });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: "Ongeldig e-mailadres." });
  }

  if (body.akkoord !== true) {
    return res.status(400).json({ ok: false, error: "Je moet akkoord gaan met huisreglement en privacy." });
  }

  const doelgroep = (body.doelgroep || "").trim();
  const niveau = (body.niveau || "").trim();
  const opmerkingen = (body.opmerkingen || "").trim();

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.REGISTRATION_TO_EMAIL || "infojct@hotmail.com";

  if (!apiKey || !fromEmail) {
    return res.status(500).json({ ok: false, error: "Server is niet correct geconfigureerd (email)." });
  }

  const subject = `Nieuwe inschrijving JCTT: ${voornaam} ${familienaam}`;

  const safe = {
    voornaam: escapeHtml(voornaam),
    familienaam: escapeHtml(familienaam),
    email: escapeHtml(email),
    telefoon: escapeHtml(telefoon),
    geboortedatum: escapeHtml(geboortedatum),
    doelgroep: escapeHtml(doelgroep),
    niveau: escapeHtml(niveau),
    opmerkingen: escapeHtml(opmerkingen)
  };

  const html = `
    <h2>Nieuwe inschrijving JCTT</h2>
    <p><strong>Naam:</strong> ${safe.voornaam} ${safe.familienaam}</p>
    <p><strong>E-mail:</strong> ${safe.email}</p>
    <p><strong>Telefoon:</strong> ${safe.telefoon}</p>
    <p><strong>Geboortedatum:</strong> ${safe.geboortedatum}</p>
    <hr/>
    <p><strong>Doelgroep:</strong> ${safe.doelgroep || "-"}</p>
    <p><strong>Niveau:</strong> ${safe.niveau || "-"}</p>
    <p><strong>Opmerkingen:</strong><br/>${(safe.opmerkingen || "-").replaceAll("\n", "<br/>")}</p>
    <hr/>
    <p style="color:#666;font-size:12px">IP (rate limit): ${escapeHtml(ip)}</p>
  `;

  // Resend REST API
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      html
    })
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    return res.status(502).json({ ok: false, error: "E-mail kon niet verstuurd worden. Probeer later opnieuw.", details: text });
  }

  return res.status(200).json({ ok: true });
}
