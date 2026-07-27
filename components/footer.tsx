import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Footer({ settings }: { settings?: any }) {
  const email = settings?.contact?.email || 'lkarchigroupe@gmail.com';
  const phone = settings?.contact?.phone || '+212 636 866 105';
  const waDigits = phone.replace(/[^0-9]/g, '');
  const instagram = settings?.contact?.instagram || 'https://instagram.com/lkarchigroupe';
  const facebook = settings?.contact?.facebook || 'https://www.facebook.com/lkarchigroupe';
  const linkedin = settings?.contact?.linkedin || 'https://linkedin.com/lkarchigroupe';
  const location =
    settings?.contact?.address?.split(',').slice(-2).join(',').trim() ||
    'Salé, Maroc';

  return (
    <footer className="h-full w-full bg-[#050505] text-white px-5 md:px-10 lg:px-14 flex flex-col">
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col flex-1 min-h-0 py-10 md:py-14 lg:py-16">
        {/* Brand block — fills the vertical space */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
            <div className="max-w-4xl">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/35 mb-5 md:mb-8">
                Studio de création
              </p>
              <h2 className="font-serif text-[clamp(3.25rem,14vw,9.5rem)] font-light uppercase tracking-tighter text-white/95 leading-[0.9]">
                {settings?.siteTitle || 'LK Archi'}
              </h2>
              <p className="mt-6 md:mt-8 font-serif text-lg md:text-2xl lg:text-3xl font-light italic text-white/45 max-w-xl leading-snug">
                &quot;
                {settings?.footerCatchphrase ||
                  "L'espace est le souffle de l'architecture."}
                &quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-8 md:gap-x-16 shrink-0 lg:pb-2">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">
                  Contact
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-xs md:text-sm uppercase tracking-[0.18em] text-white/75 hover:text-white transition-colors break-all"
                >
                  {email}
                </a>
                <a
                  href={`https://wa.me/${waDigits}`}
                  className="text-xs md:text-sm uppercase tracking-[0.18em] text-white/75 hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">
                  Socials
                </span>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] text-white/75 hover:text-white transition-colors group"
                >
                  Instagram
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
                <a
                  href={facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] text-white/75 hover:text-white transition-colors group"
                >
                  Facebook
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.18em] text-white/75 hover:text-white transition-colors group"
                >
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-white/10 pt-6 md:pt-8 mt-8 md:mt-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/45 leading-relaxed">
            {location}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/35">
            <div className="flex gap-6 md:gap-8">
              <Link
                href="/mentions-legales"
                className="hover:text-white transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="hover:text-white transition-colors"
              >
                Confidentialité
              </Link>
            </div>
            <span className="flex items-center gap-1.5">
              &copy; {new Date().getFullYear()} LK Archi Groupe
              <span className="text-white/20">|</span>
              <a href="https://studio.obeaj.me" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">By Obeaj Studio</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
