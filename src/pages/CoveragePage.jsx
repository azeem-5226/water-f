import React from 'react';
import CoverageSection from '../components/CoverageSection';
import FaqSection from '../components/FaqSection';
import { MapPin, Phone, ShieldCheck, Clock } from 'lucide-react';
import { clientInfo } from '../data/siteData';

export default function CoveragePage({ onOpenBooking }) {
  return (
    <div className="py-8">
      {/* Header Banner */}
      <section className="bg-primary text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#087E8B_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent-light text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>Odisha Service Network</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Service Locations &amp; Coverage
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-base sm:text-lg">
            Rapid doorstep RO water purifier repair, maintenance and filter replacement across Bhubaneswar, Cuttack &amp; Jatni.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href={`tel:${clientInfo.phoneClean}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call Helpline: {clientInfo.phone}</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="btn-book-service inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-gold"
            >
              <Clock className="w-4 h-4" />
              <span>Book Doorstep Visit</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Coverage Component */}
      <CoverageSection onOpenBooking={onOpenBooking} />

      {/* Quality Standards Strip */}
      <section className="py-12 bg-pageBg border-y border-accent/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl border border-accent/15 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-primary mb-1">Standard ₹199 Inspection</h3>
              <p className="text-xs text-textMuted">Transparent upfront pricing with zero hidden surcharges across all cities.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-accent/15 shadow-sm">
              <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-primary mb-1">Within 2 Hours Dispatch</h3>
              <p className="text-xs text-textMuted">Local technician dispatch in Bhubaneswar, Cuttack and Jatni.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-accent/15 shadow-sm">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-primary mb-1">Genuine Spares on Wheels</h3>
              <p className="text-xs text-textMuted">Technicians carry all standard filters, membranes, SMPS, and booster pumps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection />
    </div>
  );
}
