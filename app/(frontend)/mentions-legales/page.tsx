import { sanityFetch } from '@/sanity/lib/client';
import { pageQuery } from '@/sanity/lib/queries';
import { PortableText } from 'next-sanity';

export const revalidate = 60;

export default async function MentionsLegalesPage() {
  const data = await sanityFetch<any>(pageQuery, { slug: "mentions-legales" }, null);
  
  if (!data) {
    // Fallback static version if Sanity has no data for this page yet
    return (
      <div className="bg-transparent min-h-screen pt-40 pb-24 px-6 md:px-12 flex flex-col items-center">
        <div className="max-w-3xl w-full">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-6 block border-l border-brand-black pl-4">
            Légal
          </span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tighter uppercase font-light text-brand-black mb-16">
            Mentions <span className="italic text-brand-gray">Légales</span>
          </h1>

          <div className="space-y-12 text-brand-black font-light text-base leading-relaxed">
            <section>
              <h2 className="text-sm uppercase tracking-[0.2em] font-medium mb-4 border-b border-brand-black/10 pb-2">1. Éditeur du Site</h2>
              <p className="mb-2">Le site <strong>LK Archi Groupe</strong> est édité par la société LK Archi.</p>
              <p>Forme juridique : SARL<br/>
                 Siège social : Salé, Maroc<br/>
                 Email : lkarchigroupe@gmail.com</p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pt-40 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-6 block border-l border-brand-black pl-4">
          Légal
        </span>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tighter uppercase font-light text-brand-black mb-16">
          {data.title}
        </h1>

        <div className="space-y-12 text-brand-black font-light text-base leading-relaxed prose prose-neutral max-w-none">
          {data.content && <PortableText value={data.content} />}
        </div>
      </div>
    </div>
  );
}
