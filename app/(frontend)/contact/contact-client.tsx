'use client';
import { ArrowRight, Instagram, Mail, MapPin } from 'lucide-react';

export function ContactClient({ data, globalSettings }: { data: any, globalSettings: any }) {
  // Use specific contact info if override is enabled, else fallback to global
  const contactInfo = data?.overrideContact && data?.contactInfo 
    ? data.contactInfo 
    : globalSettings?.contact || {};

  const heading = data?.heading || "PARLONS";
  const subheading = data?.subheading || "PROJET.";
  const address = contactInfo.address || "24 Blvd d'Anfa, Quartier Racine, Casablanca, Maroc";
  const email = contactInfo.email || "contact@lkarchigroupe.com";
  const instagram = contactInfo.instagram || "https://instagram.com";
  const coordinates = contactInfo.mapCoordinates || "33°35'36\"N 7°39'38\"W";

  return (
    <div className="bg-transparent min-h-screen pt-32 pb-12 flex flex-col">
      <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* 1. Left Column: Elegant Header & Info */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full border-r border-brand-black/10 pr-8 pb-8">
           <div>
             <span className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-6 block border-l border-brand-black pl-4">Studio</span>
             <h1 className="font-serif text-5xl md:text-[80px] lg:text-[90px] tracking-tighter uppercase font-light text-brand-black leading-[0.85]">
               {heading}<br/>
               <span className="italic text-brand-gray font-serif">{subheading}</span>
             </h1>
           </div>
           
           <div className="space-y-8">
             <div>
               <h2 className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-3 border-b border-brand-black/10 pb-2">Bureau</h2>
               <div className="flex gap-3 font-light text-base leading-relaxed text-brand-black items-start">
                 <MapPin className="w-3.5 h-3.5 shrink-0 mt-1" />
                 <p>{address}</p>
               </div>
             </div>
             <div>
               <h2 className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-3 border-b border-brand-black/10 pb-2">Contact Direct</h2>
               <ul className="space-y-3 font-light text-base">
                 <li>
                   <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-brand-sand transition-colors">
                     <Mail className="w-3.5 h-3.5 shrink-0" /> {email}
                   </a>
                 </li>
                 <li>
                   <a href={instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-brand-sand transition-colors">
                     <Instagram className="w-3.5 h-3.5 shrink-0" /> Instagram
                   </a>
                 </li>
               </ul>
             </div>
           </div>
        </div>

        {/* 2. Center Column: Contact Form */}
        <div className="lg:col-span-4 flex flex-col justify-center h-full px-4 lg:px-8 border-r border-brand-black/10">
          <form className="space-y-10 w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-transparent border-b border-brand-black/20 py-3 text-base font-light focus:outline-none focus:border-brand-black transition-colors peer placeholder-transparent"
                placeholder="Nom complet"
              />
              <label htmlFor="name" className="absolute left-0 top-3 text-brand-gray text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brand-black uppercase tracking-[0.2em] pointer-events-none">
                Nom complet
              </label>
            </div>
            
            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-transparent border-b border-brand-black/20 py-3 text-base font-light focus:outline-none focus:border-brand-black transition-colors peer placeholder-transparent"
                placeholder="Adresse Email"
              />
              <label htmlFor="email" className="absolute left-0 top-3 text-brand-gray text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brand-black uppercase tracking-[0.2em] pointer-events-none">
                Adresse Email
              </label>
            </div>
            
            <div className="relative group">
              <textarea 
                id="message" 
                required
                rows={3}
                className="w-full bg-transparent border-b border-brand-black/20 py-3 text-base font-light focus:outline-none focus:border-brand-black transition-colors peer placeholder-transparent resize-none leading-relaxed"
                placeholder="Détails de votre projet"
              />
              <label htmlFor="message" className="absolute left-0 top-3 text-brand-gray text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brand-black uppercase tracking-[0.2em] pointer-events-none">
                Détails de votre projet
              </label>
            </div>
            
            <button type="submit" className="px-8 py-3 bg-brand-black text-white text-xs uppercase tracking-widest hover:bg-brand-sand transition-colors duration-300 w-full md:w-fit mt-4">
              Envoyer la demande
            </button>
          </form>
        </div>

        {/* 3. Right Column: Fully Interactive Map */}
        <div className="lg:col-span-4 relative min-h-[400px] h-[400px] lg:h-full border border-brand-black/10 overflow-hidden bg-brand-black group">
          <div className="absolute inset-0 grayscale contrast-[1.1] opacity-80 group-hover:grayscale-[30%] transition-all duration-[1s]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.56000570778!2d-7.6601446!3d33.572404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d284f3c7e7cb%3A0x2dbcd9d7d962a98c!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, pointerEvents: 'auto' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 pointer-events-none flex justify-between items-center z-10 border border-brand-black/10">
             <p className="text-xs uppercase tracking-widest font-semibold text-brand-black">{coordinates}</p>
             <a href="https://maps.google.com/?q=Casablanca" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-brand-black border-b border-brand-black hover:border-transparent pb-0.5 transition-colors pointer-events-auto inline-flex items-center gap-2">
               Ouvrir dans Maps <ArrowRight className="w-3 h-3" />
             </a>
          </div>
        </div>

      </div>
    </div>
  );
}
