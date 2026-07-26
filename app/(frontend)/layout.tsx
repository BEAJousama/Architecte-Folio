import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '../globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { sanityFetch } from '@/sanity/lib/client';
import { globalSettingsQuery } from '@/sanity/lib/queries';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-playfair', // mapped to our css variable
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'LK Archi Studio | Espace, Lumière, Matière, Précision',
  description: 'Studio d\'architecture marocain. Fondé sur une philosophie de simplicité rigoureuse, notre studio crée des lieux où la lumière et la matière s\'expriment sans artifice.',
  keywords: 'architecture, design, minimalisme, luxe, brutaliste, maroc, casablanca, studio architecture, design intérieur',
};

import { SmoothScroll } from '@/components/smooth-scroll';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch(globalSettingsQuery, {}, {});
  return (
    <html lang="fr" className={`${inter.variable} ${cormorantGaramond.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-brand-black text-brand-black font-sans" suppressHydrationWarning>
        <SmoothScroll>
          <div className="relative z-10 w-full min-h-screen bg-[#F9F9F9] flex flex-col mb-[100dvh] md:mb-[75vh] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            
            {/* Sticky Watermark Container */}
            <div className="absolute inset-0 z-0 pointer-events-none">
               <div className="sticky top-0 w-full h-screen opacity-[0.05]">
                  <img src="/images/bg_sculpture.png" alt="" className="w-full h-full object-cover grayscale contrast-125 mix-blend-darken" />
               </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col flex-1">
              <Navigation settings={settings} />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 w-full z-0 h-[100dvh] md:h-[75vh]">
            <Footer settings={settings} />
          </div>
          <WhatsAppButton phone={settings?.contact?.phone} />
        </SmoothScroll>
      </body>
    </html>
  );
}
