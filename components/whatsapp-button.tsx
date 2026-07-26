'use client';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ phone }: { phone?: string }) {
  const waUrl = phone ? `https://wa.me/${phone.replace(/[^0-9]/g, '')}` : "https://wa.me/212600000000";
  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-brand-black hover:bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-500 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-4 bg-white text-brand-black text-xs px-4 py-2 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] font-semibold border border-brand-black/10">
        Discutons de votre projet
      </span>
    </a>
  );
}
