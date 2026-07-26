'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export function AboutClient({ data }: { data: any }) {
  // Fallbacks in case data is missing
  const heroTitle = data?.hero?.title || "LK ARCHI";
  const heroSubtitle = data?.hero?.subtitle || "STUDIO";
  
  const philosophyHeading = data?.philosophy?.heading || "Notre Philosophie";
  const philosophyText = data?.philosophy?.text || "Fondé sur une philosophie de simplicité rigoureuse, notre studio crée des lieux où la lumière et la matière s'expriment sans artifice. Nous concevons l'architecture comme un espace de silence et de justesse.";
  const philosophyImage = data?.philosophy?.image?.asset?.url || "/images/archi_project_2_1781266009957.png";
  
  const manifestoBlock1 = data?.manifesto?.block1 || "Notre architecture n'est pas dictée par la forme, mais par l'expérience du vide.";
  const manifestoBlock2 = data?.manifesto?.block2 || "Nous sculptons la lumière naturelle pour révéler la noblesse des matériaux.";
  const manifestoBlock3 = data?.manifesto?.block3 || "Chaque projet est ancré dans son contexte. Une réponse silencieuse, mais absolue.";
  const manifestoImage1 = data?.manifesto?.image1?.asset?.url || "/images/archi_project_2_1781266009957.png";
  const manifestoImage2 = data?.manifesto?.image2?.asset?.url || "/images/archi_project_3_1781266020017.png";
  
  const teamHeading = data?.teamHeading || "Le Studio";
  const team = data?.team?.length > 0 ? data.team : TEAM_FALLBACK;
  
  const closingStatement = data?.closingStatement || "L'Éloge de l'Intemporel.";

  return (
    <div className="bg-transparent text-brand-black min-h-screen font-sans selection:bg-brand-sand selection:text-white">
      {/* 1. Hero - Unique Editorial Layout */}
      <section className="relative w-full min-h-screen bg-transparent pt-40 pb-24 px-4 md:px-8 flex flex-col justify-between border-b border-brand-black/10 overflow-hidden">
        
        {/* Top: Massive Typography */}
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col z-10 mb-16 md:mb-24">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="font-serif text-[18vw] md:text-[140px] lg:text-[180px] xl:text-[220px] tracking-tighter uppercase font-light text-brand-black leading-[0.85]"
           >
             {heroTitle}<br/>
             <span className="italic text-brand-gray ml-0 md:ml-32">{heroSubtitle}</span>
           </motion.h1>
        </div>

        {/* Bottom: Side-by-Side Image and Paragraph */}
        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-end z-10">
           
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
             className="md:col-span-5 lg:col-span-4"
           >
             <h2 className="text-xs uppercase tracking-[0.4em] mb-6 font-semibold text-brand-black border-l border-brand-black pl-4">
               {philosophyHeading}
             </h2>
             <p className="text-sm md:text-base text-brand-black/70 leading-relaxed font-light pl-4">
               {philosophyText}
             </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
             className="md:col-span-7 lg:col-span-8 relative w-full aspect-[4/3] md:aspect-video overflow-hidden"
           >
              <Image 
                src={philosophyImage}
                alt={philosophyHeading}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
              />
              <div className="absolute inset-0 border border-brand-black/5 pointer-events-none" />
           </motion.div>

        </div>

      </section>

      {/* 2. Manifesto  */}
      <section className="py-32 md:py-64 flex flex-col gap-32 md:gap-64 px-4 md:px-8 max-w-screen-2xl mx-auto">
         {/* Block 1 - Left */}
         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-start"
         >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl font-light italic leading-tight max-w-4xl text-brand-black">
                {manifestoBlock1}
            </h2>
         </motion.div>

         {/* Interlude 1 */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-video md:aspect-[21/9] relative bg-[#F9F9F9]"
         >
             <Image 
                src={manifestoImage1}
                alt="Architecture minimaliste"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                referrerPolicy="no-referrer"
             />
         </motion.div>

         {/* Block 2 - Center */}
         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center text-center"
         >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl font-light italic leading-tight max-w-4xl text-brand-black">
                {manifestoBlock2}
            </h2>
         </motion.div>

         {/* Interlude 2 */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
             className="w-full aspect-video md:aspect-[21/9] relative bg-[#F9F9F9]"
         >
             <Image 
                src={manifestoImage2}
                alt="Matériaux architecture"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                referrerPolicy="no-referrer"
             />
         </motion.div>

         {/* Block 3 - Right */}
         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-end text-right"
         >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl font-light italic leading-tight max-w-4xl text-brand-black">
                {manifestoBlock3}
            </h2>
         </motion.div>
      </section>

      {/* 4. Team Grid (Premium, minimal) */}
      <section className="py-32 px-4 md:px-8 max-w-screen-2xl mx-auto border-t border-brand-black/10">
          <h3 className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-24 text-center">{teamHeading}</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
             {team.map((member: any, i: number) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center group cursor-pointer"
               >
                  <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-[#F9F9F9]">
                     <Image 
                        src={member.image?.asset?.url || member.image || "/images/portrait_1_1781266185013.png"}
                        alt={member.name}
                        fill
                        className="object-cover grayscale group-hover:scale-105 transition-transform duration-[1.5s]"
                        referrerPolicy="no-referrer"
                     />
                  </div>
                  <h4 className="font-serif text-xl italic tracking-tight mb-2 text-brand-black">{member.name}</h4>
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-gray">{member.role}</span>
               </motion.div>
             ))}
          </div>
      </section>

      {/* 5. Final Closing Statement */}
      <section className="py-48 md:py-64 flex flex-col items-center justify-center px-4 md:px-8 text-center min-h-[50vh]">
         <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2 }}
            className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-tighter uppercase font-light text-brand-black"
         >
             {closingStatement.split('<br/>').map((line: string, i: number) => (
                <span key={i}>{line}<br/></span>
             ))}
         </motion.h2>
      </section>
    </div>
  );
}

const TEAM_FALLBACK = [
  {
    name: "L. Karim",
    role: "Architecte Fondateur",
    image: "/images/portrait_3_1781266205065.png"
  },
  {
    name: "A. Bennani",
    role: "Directrice Artistique",
    image: "/images/portrait_2_1781266193925.png"
  },
  {
    name: "M. Tazi",
    role: "Architecte d'Intérieur",
    image: "/images/portrait_1_1781266185013.png"
  },
  {
    name: "S. Chraibi",
    role: "Studio Manager",
    image: "/images/portrait_2_1781266193925.png"
  }
];
