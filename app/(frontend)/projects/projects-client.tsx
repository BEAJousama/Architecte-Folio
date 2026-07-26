'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { CinematicSlider } from '@/components/cinematic-slider';

export function ProjectsClient({ allProjects, cinematicProjects }: { allProjects: any[], cinematicProjects: any[] }) {
  const [showSlider, setShowSlider] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tous');

  // Derive categories from all projects
  const uniqueCategories = Array.from(new Set(allProjects.map(p => p.category).filter(Boolean)));
  const categories = ['Tous', ...uniqueCategories];
  
  const filteredProjects = activeFilter === 'Tous' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 min-h-screen pb-32 md:pb-48 border-b-4 border-transparent">
        <header className="mb-24 pt-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gray block mb-4">Portfolio</span>
            <h1 className="font-serif text-5xl md:text-[80px] lg:text-[90px] tracking-tighter uppercase font-light text-brand-black leading-[0.85] mb-8">NOS PROJETS</h1>
            <p className="text-base leading-relaxed text-brand-black font-light max-w-2xl">
              Une sélection de nos réalisations récentes, illustrant notre quête de minimalisme, d&apos;intégration au site et de justesse architecturale.
            </p>
          </div>
          <button 
            onClick={() => setShowSlider(true)}
            className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] hover:text-brand-sand transition-colors font-medium border border-brand-black/20 px-8 py-4 bg-[#F9F9F9]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity">
              <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
              <line x1="8" y1="6" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="18"></line>
            </svg>
            Expérience Cinématique
          </button>
        </header>

        {/* Dynamic Filter Navigation */}
        <div className="flex flex-wrap gap-8 mb-16 text-xs uppercase tracking-[0.2em] font-medium border-b border-brand-black/10 pb-6">
          {categories.map((cat: any) => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`transition-colors ${
                activeFilter === cat 
                  ? "text-brand-black border-b border-brand-black pb-1" 
                  : "text-brand-gray hover:text-brand-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/projects/${project.id}`} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-transparent">
                    <Image
                      src={project.image || "/images/archi_project_1_1781266000472.png"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-start border-l-4 border-transparent group-hover:border-brand-sand pl-4 transition-all duration-300">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl italic mb-1 text-brand-black">{project.title}</h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-gray">{project.location}</p>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-brand-gray">{project.year}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {showSlider && (
        <CinematicSlider 
          projects={cinematicProjects.length > 0 ? cinematicProjects : allProjects} 
          onClose={() => setShowSlider(false)} 
        />
      )}
    </>
  );
}
