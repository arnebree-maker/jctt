const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100063642758998";
const WHATSAPP_URL = "https://chat.whatsapp.com/CbiWOd1S68h4zpcuUicbLF";

export function Footer() {
  return (
    <footer className="mt-10 bg-[#2f3a44] text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-2 bg-jcttRed rounded" />
              <h3 className="font-bold text-lg">Judo Club Tori Torhout</h3>
            </div>
            <p className="mt-3 text-sm text-white/80">Samen sterk op de tatami</p>
          </div>

          <div>
            <h4 className="font-semibold">Contact</h4>
            <div className="mt-3 text-sm text-white/80 space-y-2">
              <div>Sporthal Benny Vansteelandt – Dojo</div>
              <div>Industrieelaan 2, 8820 Torhout</div>
              <div>
                <a className="underline" href="mailto:infojct@hotmail.com">
                  infojct@hotmail.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Volg ons</h4>
            <div className="mt-3 text-sm text-white/80 space-y-2">
              <div>
                <a className="underline" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </div>
              <div>
                <a className="underline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  WhatsApp Group
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Documenten</h4>
            <div className="mt-3 text-sm text-white/80">
              <a className="underline" href="/aangifteformulier-verzekering.pdf" target="_blank" rel="noreferrer">
                Aangifteformulier verzekering
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-sm text-white/70 space-y-1">
          <div>Judo Club Tori Torhout vzw</div>
          <div>Ondernemingsnummer: 0872162533</div>
          <div>IBAN: BE03 9731 7159 8084</div>
        </div>
      </div>
    </footer>
  );
}
