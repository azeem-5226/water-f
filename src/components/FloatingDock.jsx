import React from 'react';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { clientInfo } from '../data/siteData';

export default function FloatingDock({ onOpenBooking }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* WhatsApp Quick Chat with Client Phone */}
      <a
        href={clientInfo.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Support"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Direct Call Button (Mobile & Desktop) */}
      <a
        href={`tel:${clientInfo.phoneClean}`}
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary-light text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 sm:hidden"
        title="Call Now"
        aria-label="Call Now"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating Golden Book Service Button */}
      <button
        onClick={() => onOpenBooking()}
        className="btn-book-service flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm tracking-wide shadow-gold hover:scale-105 transition-all"
      >
        <CalendarCheck className="w-4 h-4" />
        <span className="hidden sm:inline">Book Service</span>
        <span className="sm:hidden">Book</span>
      </button>
    </div>
  );
}
