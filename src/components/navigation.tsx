import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100063642758998";
const WHATSAPP_URL = "https://chat.whatsapp.com/CbiWOd1S68h4zpcuUicbLF";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  const homeLinks = [
    { label: "Over", href: "/#over" },
    { label: "Trainingen", href: "/#trainingen" },
    { label: "Kalender", href: "/#kalender" },
    { label: "Techniekposters", href: "/#techniekposters" },
    { label: "Inschrijven", href: "/#inschrijven" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="JCTT logo"
              className="h-10 w-10 rounded bg-white object-contain border border-gray-200"
            />
            <div className="leading-tight">
              <div className="font-bold tracking-tight">JCTT</div>
              <div className="text-xs text-gray-500">Judo Club Tori Torhout</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-jcttRed" : "text-gray-700 hover:text-gray-900"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-jcttRed" : "text-gray-700 hover:text-gray-900"}`
              }
            >
              Contact
            </NavLink>

            <div className="flex items-center gap-3 pl-2">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                title="Facebook"
              >
                <span className="text-lg font-bold">f</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                title="WhatsApp groep"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>
          </nav>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded border border-gray-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              <Link className="rounded px-3 py-2 hover:bg-gray-50" to="/">
                Home
              </Link>

              {loc.pathname === "/" && (
                <div className="grid gap-1 rounded border border-gray-200 p-2">
                  {homeLinks.map((l) => (
                    <a key={l.href} className="rounded px-3 py-2 hover:bg-gray-50" href={l.href}>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}

              <Link className="rounded px-3 py-2 hover:bg-gray-50" to="/contact">
                Contact
              </Link>

              <div className="flex items-center gap-3 px-3 pt-2">
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="underline">
                  Facebook
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="underline">
                  WhatsApp groep
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
