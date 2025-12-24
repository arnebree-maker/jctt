import { useMemo, useState } from "react";
import { Section } from "../components/Section";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100063642758998";
const WHATSAPP_URL = "https://chat.whatsapp.com/CbiWOd1S68h4zpcuUicbLF";

type FormState = {
  voornaam: string;
  familienaam: string;
  email: string;
  telefoon: string;
  geboortedatum: string;
  doelgroep: string;
  niveau: string;
  opmerkingen: string;
  akkoord: boolean;
  website: string; // honeypot
};

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState<FormState>({
    voornaam: "",
    familienaam: "",
    email: "",
    telefoon: "",
    geboortedatum: "",
    doelgroep: "U9-U13 (Groep 1 & 2)",
    niveau: "Beginner",
    opmerkingen: "",
    akkoord: false,
    website: ""
  });

  const fullName = useMemo(() => `${form.voornaam} ${form.familienaam}`.trim(), [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Er ging iets mis. Probeer later opnieuw.");
      }

      setStatus("sent");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Er ging iets mis.");
    }
  }

  const cardBase =
    "rounded-2xl bg-white shadow-soft border border-gray-200 p-6 md:p-7 text-left";

  return (
    <div className="tatami">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="min-h-[70vh] md:min-h-[78vh] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/55 to-white/85" />
          <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-14 md:pt-20 pb-16 md:pb-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 h-28 w-28 md:h-36 md:w-36 rounded-2xl bg-white/90 border border-gray-200 shadow-soft grid place-items-center">
                <img src="/logo.png" alt="JCTT logo" className="h-20 w-20 md:h-28 md:w-28 object-contain" />
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Judo Club Tori Torhout
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-700">
                Discipline • Respect • Competitie
              </p>

              <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-jcttRed" />

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#inschrijven"
                  className="inline-flex items-center justify-center rounded-xl bg-jcttRed px-6 py-3 text-white font-semibold shadow-soft hover:opacity-95"
                >
                  Proeftraining – 4 gratis lessen
                </a>
                <a
                  href="#trainingen"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold border border-gray-200 hover:bg-gray-50"
                >
                  Trainingsuren bekijken
                </a>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-700">
                <a className="underline" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <a className="underline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  WhatsApp groep
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVER */}
      <Section id="over" title="Over JCTT">
        <div className={`${cardBase} max-w-5xl mx-auto`}>
          <p className="text-lg leading-relaxed text-gray-800">
            Judo Club Tori Torhout is een dynamische judoclub gevestigd in Torhout. Wij bieden
            kwaliteitstraining voor alle leeftijden en niveaus, van beginners tot competitiegerichte
            judoka&apos;s.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-gray-800">
            Wij zijn een warme familie met meer dan <strong>70 leden</strong>. Onze club staat voor
            discipline, respect en samen groeien op de tatami. Met ervaren trainers en een warme,
            sportieve sfeer verwelkomen we iedereen die judo wil ontdekken of verder wil ontwikkelen.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-gray-800">
            In de weekends organiseren we regelmatig activiteiten om de teamgeest te versterken:
            gezellige etentjes, wandelingen, buiten lopen en nog veel meer. Zo bouwen we niet alleen
            aan judovaardigheden, maar ook aan sterke vriendschappen!
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className={cardBase}>
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-xl font-bold">Trainingslocatie</h3>
            <p className="mt-3 text-gray-700">
              Sporthal Benny Vansteelandt – <strong>Dojo</strong>
              <br />
              Industrieelaan 2
              <br />
              8820 Torhout
            </p>
          </div>

          <div className={cardBase}>
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="text-xl font-bold">Proeftrainen</h3>
            <p className="mt-3 text-gray-700">
              Wens je eens te proeven van de judosport, dan bieden wij u{" "}
              <strong>4 GRATIS initiatielessen</strong> aan inclusief verzekering.
            </p>
          </div>

          <div className={cardBase}>
            <div className="text-3xl mb-3">✉️</div>
            <h3 className="text-xl font-bold">Contact</h3>
            <p className="mt-3 text-gray-700">
              <a className="text-jcttRed underline" href="mailto:infojct@hotmail.com">
                infojct@hotmail.com
              </a>
            </p>
            <p className="mt-3 text-gray-700">
              <strong>Secretaris:</strong> Rik Vinckier <br />
              050 21 42 30 (na 18u)
            </p>
            <p className="mt-3 text-gray-700">
              <strong>Hoofdtrainer:</strong> Dirk Steelandt <br />
              0477 47 25 80
            </p>
          </div>
        </div>
      </Section>

      {/* TRAININGEN */}
      <Section id="trainingen" title="Trainingen" subtitle="Maandag en donderdag in Torhout">
        <div className="max-w-5xl mx-auto grid gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="text-xl">ℹ️</div>
              <p className="text-gray-700">
                Tijdens schoolvakanties kan een andere uurregeling gelden. Kleuterjudo (3de kleuterklas)
                wordt in mei–juni apart gecommuniceerd.
              </p>
            </div>
          </div>

          <div className={cardBase}>
            <h3 className="text-2xl font-bold">Trainingsschema</h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-5 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-jcttRed" />
                <h4 className="text-xl font-bold pl-3">Maandag</h4>
                <div className="mt-3 pl-3 text-gray-700 space-y-1">
                  <div>U9–U13 (Groep 1 &amp; 2): 18:00 – 19:00</div>
                  <div>U13+ (Groep 3): 19:00 – 20:30</div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-5 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-jcttRed" />
                <h4 className="text-xl font-bold pl-3">Donderdag</h4>
                <div className="mt-3 pl-3 text-gray-700 space-y-1">
                  <div>U9–U13 (Groep 1 &amp; 2): 18:00 – 19:00</div>
                  <div>U13+ (Groep 3): 19:00 – 20:30</div>
                </div>
              </div>
            </div>
          </div>

          <div id="kalender" className={cardBase}>
            <h3 className="text-2xl font-bold">Trainingskalender</h3>
            <p className="mt-3 text-gray-700">
              Download onze actuele trainingskalender voor alle uren en eventuele wijzigingen.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/kalender-aug-dec-2025.png"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold hover:bg-gray-50"
              >
                ⬇️ Kalender aug–dec 2025
              </a>
              <a
                href="/kalender-jan-aug-2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold hover:bg-gray-50"
              >
                ⬇️ Kalender jan–aug 2026
              </a>
            </div>
          </div>

          <div id="techniekposters" className="rounded-2xl border border-red-200 bg-red-50 p-6 md:p-7 shadow-soft">
            <h3 className="text-2xl font-extrabold text-jcttRed">Techniekposters – Judopaspoort</h3>
            <p className="mt-3 text-gray-800">
              Download onze handige techniekposters met alle worpen en houdgrepen per gordel. Perfect om thuis
              te oefenen en je voor te bereiden op je volgende graadproef!
            </p>
            <div className="mt-6">
              <a
                href="/techniekposters.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-jcttRed px-6 py-3 text-white font-bold shadow-soft hover:opacity-95"
              >
                ⬇️ Download Techniekposters (PDF)
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* INSCHRIJVEN */}
      <Section id="inschrijven" title="Inschrijven" subtitle="Word lid van Judo Club Tori Torhout">
        <div className="max-w-4xl mx-auto">
          <div className={cardBase}>
            <h3 className="text-2xl font-bold">Inschrijfformulier</h3>
            <p className="mt-2 text-gray-700">
              Vul onderstaande gegevens in en we nemen zo snel mogelijk contact met je op.
            </p>

            <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
              {/* honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="font-semibold">Voornaam *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                    value={form.voornaam}
                    onChange={(e) => setForm((f) => ({ ...f, voornaam: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold">Familienaam *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                    value={form.familienaam}
                    onChange={(e) => setForm((f) => ({ ...f, familienaam: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">E-mail *</label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="font-semibold">Telefoon *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                    value={form.telefoon}
                    onChange={(e) => setForm((f) => ({ ...f, telefoon: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold">Geboortedatum *</label>
                  <input
                    type="date"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                    value={form.geboortedatum}
                    onChange={(e) => setForm((f) => ({ ...f, geboortedatum: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="font-semibold">Doelgroep</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                    value={form.doelgroep}
                    onChange={(e) => setForm((f) => ({ ...f, doelgroep: e.target.value }))}
                  >
                    <option>U9-U13 (Groep 1 &amp; 2)</option>
                    <option>U13+ (Groep 3)</option>
                    <option>Volwassenen</option>
                    <option>Competitie</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold">Ervaringsniveau</label>
                  <select
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                    value={form.niveau}
                    onChange={(e) => setForm((f) => ({ ...f, niveau: e.target.value }))}
                  >
                    <option>Beginner</option>
                    <option>Reeds ervaring</option>
                    <option>Competitiegericht</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold">Opmerkingen</label>
                <textarea
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3"
                  rows={4}
                  value={form.opmerkingen}
                  onChange={(e) => setForm((f) => ({ ...f, opmerkingen: e.target.value }))}
                />
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5"
                  checked={form.akkoord}
                  onChange={(e) => setForm((f) => ({ ...f, akkoord: e.target.checked }))}
                  required
                />
                <span>
                  <span className="font-semibold">Ik ga akkoord met het huisreglement en privacy *</span>
                  <div className="text-sm text-gray-600">Door in te schrijven ga je akkoord met onze voorwaarden.</div>
                </span>
              </label>

              {status === "error" && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
                  {errorMsg}
                </div>
              )}

              {status === "sent" ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
                  Bedankt {fullName || ""}! Je inschrijving is goed ontvangen. We nemen snel contact met je op.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-jcttRed px-6 py-4 text-white font-bold shadow-soft disabled:opacity-60"
                >
                  {status === "sending" ? "Bezig met verzenden..." : "Inschrijven"}
                </button>
              )}
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
