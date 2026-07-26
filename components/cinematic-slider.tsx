'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export type CinematicProject = {
  id: string;
  title: string;
  location: string;
  year: string;
  type?: string;
  image?: string;
  images?: string[];
};

export function CinematicSlider({ projects, audioUrl, onClose }: { projects: CinematicProject[], audioUrl?: string, onClose: () => void }) {
  const [pIndex, setPIndex] = useState(0);
  const [sIndex, setSIndex] = useState(0);
  const [phase, setPhase] = useState<'title' | 'slide'>('title');
  const [isMuted, setIsMuted] = useState(false);

  const currentProject = projects[pIndex];
  const projectImages = currentProject.images?.length ? currentProject.images : [currentProject.image || ""];
  const currentImage = projectImages[sIndex] || projectImages[0];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'title') {
      timer = setTimeout(() => {
        setPhase('slide');
      }, 2500);
    } else {
      timer = setTimeout(() => {
        if (sIndex < projectImages.length - 1) {
          setSIndex(s => s + 1);
        } else {
          setPIndex(p => (p + 1) % projects.length);
          setSIndex(0);
          setPhase('title');
        }
      }, 6500);
    }

    return () => clearTimeout(timer);
  }, [pIndex, sIndex, phase, projects.length, projectImages.length]);

  const handleNext = () => {
    if (phase === 'title') return;
    if (sIndex < projectImages.length - 1) {
      setSIndex(s => s + 1);
    } else {
      setPIndex(p => (p + 1) % projects.length);
      setSIndex(0);
      setPhase('title');
    }
  };

  const handlePrev = () => {
    if (phase === 'title') return;
    if (sIndex > 0) {
      setSIndex(s => s - 1);
    } else {
      const prevPIndex = pIndex === 0 ? projects.length - 1 : pIndex - 1;
      setPIndex(prevPIndex);
      const prevProjectImages = projects[prevPIndex].images?.length ? projects[prevPIndex].images : [projects[prevPIndex].image || ""];
      setSIndex(prevProjectImages!.length - 1);
      setPhase('title');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-black text-white flex flex-col overflow-hidden">
       {/* Audio Track */}
       <audio
         src={audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"}
         autoPlay
         loop
         muted={isMuted}
         className="hidden"
       />

       {/* Top Status */}
       <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
          <div className="text-xs uppercase tracking-[0.3em] text-white/50 flex items-center gap-6">
            <span>Expérience Cinématique</span>
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className="flex items-center gap-2 hover:text-white transition-colors"
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              )}
            </button>
          </div>
          <button onClick={onClose} className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-sand transition-colors">
            Fermer ✕
          </button>
       </div>

       {/* Background Image Slide */}
       <AnimatePresence mode="wait">
         {phase === 'slide' && (
           <motion.div
             key={`slide-bg-${currentProject.id}-${sIndex}`}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
             className="absolute inset-0 z-30"
           >
             <motion.div
                initial={{ scale: 1, x: 10 }}
                animate={{ scale: 1.02, x: 0 }}
                transition={{ duration: 8, ease: "linear" }}
                className="w-full h-full"
             >
               <Image
                 src={currentImage}
                 alt={currentProject.title}
                 fill
                 className="object-cover"
                 priority
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-[#0B0B0C]/20" />
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Centered Title */}
       <AnimatePresence mode="wait">
         {phase === 'title' && (
           <motion.div
             key={`title-${currentProject.id}`}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="absolute inset-0 flex flex-col items-center justify-center bg-brand-black z-40"
           >
             <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-xs uppercase tracking-[0.3em] text-brand-sand mb-6"
             >
                Film {String(pIndex + 1).padStart(2, '0')}
             </motion.span>
             <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="font-serif text-4xl md:text-6xl tracking-tight uppercase font-light"
             >
                {currentProject.title}
             </motion.h2>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Bottom Left Info */}
       <AnimatePresence mode="wait">
         {phase === 'slide' && (
           <motion.div
             key={`slide-info-${currentProject.id}`}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 10 }}
             transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="absolute bottom-16 left-8 md:left-16 flex flex-col justify-end max-w-2xl z-40 pointer-events-none"
           >
             <div className="mb-2">
               <h3 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-6">{currentProject.title}</h3>
               <div className="flex gap-4 items-center text-sm uppercase tracking-[0.2em] font-medium text-white/80">
                 <span>{currentProject.location}</span>
                 <span className="w-[1px] h-3 bg-white/30"></span>
                 <span>{currentProject.year}</span>
                 <span className="w-[1px] h-3 bg-white/30"></span>
                 <span className="text-brand-sand">{currentProject.type}</span>
               </div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Controls */}
       <div className="absolute bottom-8 right-8 md:right-16 z-50 flex gap-8 items-center text-xs uppercase tracking-[0.2em] text-white/50">
          <button onClick={handlePrev} className="hover:text-white transition-colors flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Précédent
          </button>
          
          <div className="flex gap-2 items-center">
            {projects.map((p, i) => (
              <div key={p.id} className="w-8 md:w-16 h-[1px] bg-white/20 relative overflow-hidden">
                 {i === pIndex && (
                     <motion.div 
                       className="absolute top-0 left-0 h-full bg-white"
                       initial={{ width: phase === 'title' ? '0%' : `${(sIndex / (p.images?.length || 1)) * 100}%` }}
                       animate={{ width: phase === 'title' ? '0%' : `${((sIndex + 1) / (p.images?.length || 1)) * 100}%` }}
                       transition={{ duration: phase === 'title' ? 0 : 6.5, ease: "linear" }}
                     />
                 )}
                 {i < pIndex && <div className="absolute top-0 left-0 h-full w-full bg-white" />}
             </div>
            ))}
          </div>

          <button onClick={handleNext} className="hover:text-white transition-colors flex items-center gap-2">
            Suivant
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
       </div>
    </div>
  )
}
