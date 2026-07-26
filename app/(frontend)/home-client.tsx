'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { CinematicSlider } from '@/components/cinematic-slider';
import { ServicesAwwwards } from '@/components/services-awwwards';

export function HomeClient({ data }: { data: any }) {
  const containerRef = useRef(null);
  const [showSlider, setShowSlider] = useState(false);
  const [hoveredService, setHoveredService] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Fallbacks if data is missing
  const heroTitle = data?.hero?.title || "Façonner l'espace.";
  const heroSubtitle = data?.hero?.subtitle || "Sublimer la matière.";
  const heroDesc = data?.hero?.description || "Créateurs d'espaces d'exception. Nous concevons des œuvres architecturales intemporelles où le luxe réside dans l'épure, le détail et l'harmonie absolue avec l'environnement.";
  
  const heroVideo = data?.hero?.video?.asset?.url;
  const heroImage = data?.hero?.image?.asset?.url || "/images/hero_poster_1781267139741.png";
  const philosophy = data?.philosophy || "Une approche centrée sur l'harmonie des volumes, la noblesse des matériaux et de la lumière. Nous créons des espaces intemporels, profondément ancrés dans leur contexte.";
  
  const featuredProjects = data?.featuredProjects?.length > 0 ? data.featuredProjects : FEATURED_PROJECTS_FALLBACK;
  const cinematicProjects = data?.cinematicProjects?.length > 0 ? data.cinematicProjects : featuredProjects;
  const services = data?.services?.length > 0 ? data.services : SERVICES_FALLBACK;

  return (
    <div className="bg-transparent text-brand-black font-sans selection:bg-brand-sand selection:text-white">
      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-screen w-full bg-transparent flex flex-col justify-center px-4 md:px-8 pt-32 pb-16 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content - Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base uppercase tracking-[0.4em] mb-8 font-semibold text-brand-black"
            >
              LK Archi Groupe
            </motion.h2>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-[100px] tracking-tight leading-[0.95] mb-8 font-light text-brand-black"
            >
              {heroTitle}<br />
              <span className="italic text-brand-black/60">{heroSubtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base font-light text-brand-gray max-w-md mb-12 leading-relaxed"
            >
              {heroDesc}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 text-xs uppercase tracking-[0.2em] font-medium"
            >
              <Link href="/projects" className="group relative overflow-hidden pb-2 text-brand-black">
                Découvrir nos œuvres
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-black transform origin-left scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-x-0" />
              </Link>
              <Link href="/contact" className="group relative overflow-hidden pb-2 text-brand-gray hover:text-brand-black transition-colors">
                Notre Expertise
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-black transform origin-left scale-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden"
          >
            <motion.div style={{ y: yParallax, height: "120%" }} className="absolute inset-0 -top-[10%] bg-[#EFEFEF]">
              {heroVideo ? (
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
                />
              ) : (
                <Image
                  src={heroImage}
                  alt="Hero Image"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out"
                  priority
                />
              )}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Philosophy (Very short) */}
      <section className="py-32 px-4 md:px-8 bg-transparent flex justify-center">
        <div className="max-w-4xl text-center">
          <p className="font-serif text-2xl md:text-4xl text-brand-black leading-relaxed font-light">
            {philosophy}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <ServicesAwwwards services={services} />

      {/* Featured Projects */}
      <section className="py-24 px-8 bg-transparent max-w-screen-2xl mx-auto w-full border-t border-brand-black/10 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-brand-gray">Projets Sélectifs</h2>
          <div className="flex flex-wrap gap-8 items-center">
            <button 
                onClick={() => setShowSlider(true)} 
                className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-brand-sand"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity">
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                <line x1="8" y1="6" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="18"></line>
              </svg>
              Expérience Cinématique
            </button>
            <Link href="/projects" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-brand-black pb-1 hover:text-brand-sand hover:border-brand-sand transition-colors">
              Tous les projets
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {featuredProjects.map((project: any, idx: number) => (
            <Link href={`/projects/${project.id}`} key={project.id || idx} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden mb-6 bg-[#F9F9F9]">
                <Image
                  src={project.image || "/images/archi_project_1_1781266000472.png"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-[1s] ease-out pointer-events-none" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] ease-out z-10 pointer-events-none hidden md:flex">
                   <h3 className="font-serif text-4xl italic mb-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-out delay-[50ms]">{project.title}</h3>
                   <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-out delay-[100ms] border-t border-white/20 pt-4">
                     <p className="text-xs uppercase tracking-[0.2em] text-white/90">{project.location}</p>
                     <p className="text-xs uppercase tracking-widest text-white/90">{project.year}</p>
                   </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start border-l-4 border-transparent pl-4 transition-all duration-300 md:hidden">
                <div>
                  <h3 className="font-serif text-xl italic mb-1 text-brand-black">{project.title}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-gray">{project.location}</p>
                </div>
                <span className="text-xs uppercase tracking-widest text-brand-gray">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {showSlider && (
        <CinematicSlider 
          projects={cinematicProjects} 
          onClose={() => setShowSlider(false)} 
        />
      )}
    </div>
  );
}

const FEATURED_PROJECTS_FALLBACK = [
  {
    id: "villa-horizon",
    title: "Villa Horizon",
    location: "Casablanca",
    year: "2025",
    image: "/images/archi_project_1_1781266000472.png",
  },
  {
    id: "le-cube-minimal",
    title: "Maison de Verre",
    location: "Marrakech",
    year: "2024",
    image: "/images/archi_project_2_1781266009957.png",
  },
  {
    id: "pavillon-sable",
    title: "Pavillon Sable",
    location: "Rabat",
    year: "2025",
    image: "/images/archi_project_3_1781266020017.png",
  },
  {
    id: "siege-bancaire",
    title: "Siège Administratif",
    location: "Tanger",
    year: "2023",
    image: "/images/archi_facade_abstract_1781265506209.png",
  }
];

const SERVICES_FALLBACK = [
  {
    id: "residential",
    title: "Architecture Résidentielle",
    description: "Villas d'exception, demeures privées et chalets de luxe. Une conception sur-mesure de l'habitat où le volume dicte la fonction.",
    image: "/images/archi_project_1_1781266000472.png"
  },
  {
    id: "commercial",
    title: "Design Commercial",
    description: "Sièges sociaux, boutiques de prestige et espaces de restauration. L'identité de marque traduite en architecture spatiale.",
    image: "/images/archi_facade_abstract_1781265506209.png"
  },
  {
    id: "interior",
    title: "Architecture d'Intérieur",
    description: "Sublimation des espaces intérieurs par la lumière naturelle, la texture et des finitions d'une rare exigence.",
    image: "/images/archi_project_2_1781266009957.png"
  },
  {
    id: "custom",
    title: "Design Sur Mesure",
    description: "Création de mobilier exclusif et aménagement intégré pour une harmonie totale et radicale du projet.",
    image: "/images/archi_project_3_1781266020017.png"
  }
];
