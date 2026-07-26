'use client';
import { useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function ServicesAwwwards({ services }: { services: any[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  
  // Cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Center the image on cursor (image is 400x500 -> offset by 200 and 250)
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 250);
  };

  return (
    <section 
      className="relative py-32 bg-[#F9F9F9] text-brand-black overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIdx(null)}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-16 md:mb-24 border-l border-brand-black/20 pl-4">Nos Expertises</h2>
        
        <div className="flex flex-col w-full">
          {services.map((srv, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              className="group relative border-t border-brand-black/10 last:border-b py-8 md:py-16 flex flex-col"
            >
              {/* Desktop Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
                <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[100px] leading-none transition-all duration-700 ease-[0.16,1,0.3,1] tracking-tight"
                    style={{ 
                        color: activeIdx === idx ? '#000' : 'rgba(0,0,0,0.3)',
                        transform: activeIdx === idx ? 'translateX(20px)' : 'translateX(0px)'
                    }}
                >
                  {srv.title}
                </h3>
              </div>
              
              {/* Accordion content */}
              <motion.div
                initial={false}
                animate={{ height: activeIdx === idx ? 'auto' : 0, opacity: activeIdx === idx ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-8 md:pt-12 max-w-2xl">
                  {/* Mobile only image */}
                  <div className="md:hidden w-full aspect-[4/5] relative mb-8 overflow-hidden bg-[#EFEFEF]">
                    <Image 
                      src={srv.image?.asset?.url || srv.image || "/images/archi_project_1_1781266000472.png"} 
                      alt={srv.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <p className="text-base md:text-xl font-light text-brand-gray leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image Tracker (Desktop only) */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none overflow-hidden bg-[#EFEFEF] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-0"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: activeIdx !== null ? 1 : 0,
          scale: activeIdx !== null ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      >
        <AnimatePresence mode="popLayout">
            {activeIdx !== null && (
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                    <Image
                      src={services[activeIdx]?.image?.asset?.url || services[activeIdx]?.image || "/images/archi_project_1_1781266000472.png"}
                      alt={services[activeIdx]?.title || "Service"}
                      fill
                      className="object-cover"
                    />
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
