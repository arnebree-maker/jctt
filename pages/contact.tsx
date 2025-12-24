export default function Contact() {
  return (
    <div className="tatami">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Contact</h1>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-jcttRed" />
          <p className="mt-4 text-gray-700 text-lg">
            Neem gerust contact op met ons team. We helpen je graag verder.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white shadow-soft border border-gray-200 p-6 md:p-7">
            <h2 className="text-2xl font-bold">Gegevens</h2>
            <div className="mt-4 space-y-3 text-gray-700">
              <div>
                <strong>Locatie:</strong> Sporthal Benny Vansteelandt – Dojo
              </div>
              <div>
                <strong>Adres:</strong> Industrieelaan 2, 8820 Torhout
              </div>
              <div>
                <strong>E-mail:</strong>{" "}
                <a className="text-jcttRed underline" href="mailto:infojct@hotmail.com">
                  infojct@hotmail.com
                </a>
              </div>
              <div>
                <strong>Secretaris:</strong> Rik Vinckier – 050 21 42 30 (na 18u)
              </div>
              <div>
                <strong>Hoofdtrainer:</strong> Dirk Steelandt – 0477 47 25 80
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-soft border border-gray-200 p-6 md:p-7">
            <h2 className="text-2xl font-bold">Route</h2>
            <p className="mt-3 text-gray-700">
              Open snel de route in Google Maps:
            </p>
            <a
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold hover:bg-gray-50"
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/maps/search/?api=1&query=Industrieelaan+2+8820+Torhout"
            >
              📍 Open Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
