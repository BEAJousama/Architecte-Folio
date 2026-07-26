'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function Navigation({ settings }: { settings?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isImageHeader = (pathname?.startsWith('/projects/') && pathname !== '/projects');
  
  // Force text colors when on top of hero image, else use dark colors
  const isDarkBg = !scrolled && isImageHeader;
  const textColor = isDarkBg ? 'text-white' : 'text-brand-black';
  const mutedColor = isDarkBg ? 'text-white/70' : 'text-brand-gray';
  const hoverColor = isDarkBg ? 'hover:text-white' : 'hover:text-brand-black';
  const bgColorClassName = scrolled ? 'bg-white/95 backdrop-blur-md border-b border-brand-black/10 pb-5 pt-5 shadow-sm' : 'bg-transparent border-brand-black/0 pb-6 pt-10';

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[1s] ease-[0.16,1,0.3,1] ${bgColorClassName}`}>
      <div className={`max-w-screen-2xl mx-auto px-4 md:px-8 flex items-baseline justify-between transition-colors duration-[1s] ease-[0.16,1,0.3,1] ${menuOpen ? 'text-brand-black' : textColor}`}>
        <div className="flex flex-col">
          <Link href="/" className="flex flex-col items-start gap-1 md:gap-2 group">
            <div className="flex items-center gap-3">
              {settings?.logo?.asset?.url && (
                <div className="relative h-6 md:h-8 w-6 md:w-8 transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                   <Image 
                     src={settings.logo.asset.url} 
                     alt="Logo" 
                     fill 
                     className={`object-contain object-center transition-all duration-[1s] ease-[0.16,1,0.3,1] ${isDarkBg && !menuOpen ? 'brightness-0 invert opacity-90' : 'opacity-100'}`}
                     priority
                   />
                </div>
              )}
              <span className="font-serif text-2xl font-bold tracking-tight group-hover:opacity-80 transition-opacity">
                {settings?.siteTitle || "LK ARCHI GROUPE"}
              </span>
            </div>
            <span className={`text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] transition-colors duration-[1s] ease-[0.16,1,0.3,1] ${mutedColor}`}>
               Architecture & Design Studio
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.2em] font-medium">
          <Link href="/" className={`relative ${pathname === '/' ? textColor : mutedColor} ${hoverColor} transition-colors duration-500`}>
            Accueil
            {pathname === '/' && (
              <motion.span layoutId="navDot" className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isDarkBg ? 'bg-white' : 'bg-brand-black'}`} />
            )}
          </Link>
          <Link href="/projects" className={`relative ${pathname.startsWith('/projects') ? textColor : mutedColor} ${hoverColor} transition-colors duration-500`}>
            Projets
            {pathname.startsWith('/projects') && (
              <motion.span layoutId="navDot" className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isDarkBg ? 'bg-white' : 'bg-brand-black'}`} />
            )}
          </Link>
          <Link href="/about" className={`relative ${pathname === '/about' ? textColor : mutedColor} ${hoverColor} transition-colors duration-500`}>
            À Propos
            {pathname === '/about' && (
              <motion.span layoutId="navDot" className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isDarkBg ? 'bg-white' : 'bg-brand-black'}`} />
            )}
          </Link>
          <Link href="/contact" className={`relative ${pathname === '/contact' ? textColor : mutedColor} ${hoverColor} transition-colors duration-500`}>
            Contact
            {pathname === '/contact' && (
              <motion.span layoutId="navDot" className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isDarkBg ? 'bg-white' : 'bg-brand-black'}`} />
            )}
          </Link>
        </nav>
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 z-[60] w-10 h-10 relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-[1px] transition-all duration-300 ${menuOpen ? 'bg-brand-black rotate-45 absolute' : isDarkBg && !scrolled ? 'bg-white' : 'bg-brand-black'} block`}></span>
          <span className={`w-6 h-[1px] transition-all duration-300 ${menuOpen ? 'opacity-0' : isDarkBg && !scrolled ? 'bg-white' : 'bg-brand-black'} block`}></span>
          <span className={`w-6 h-[1px] transition-all duration-300 ${menuOpen ? 'bg-brand-black -rotate-45 absolute' : isDarkBg && !scrolled ? 'bg-white' : 'bg-brand-black'} block`}></span>
        </button>
      </div>
    </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-12 text-3xl font-serif tracking-tight font-light text-brand-black">
              <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
              <Link href="/projects" onClick={() => setMenuOpen(false)}>Projets</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>À Propos</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>
            <div className="absolute bottom-12 flex gap-8 text-xs uppercase tracking-widest text-brand-gray">
              <a href={settings?.contact?.instagram || "https://instagram.com"} target="_blank" rel="noreferrer">Instagram</a>
              <a href={`mailto:${settings?.contact?.email || "contact@lkarchigroupe.com"}`}>Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
