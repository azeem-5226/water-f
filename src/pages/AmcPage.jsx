import React from 'react';
import AmcPlansSection from '../components/AmcPlansSection';
import FaqSection from '../components/FaqSection';
import { ShieldCheck, Award, Zap } from 'lucide-react';

export default function AmcPage({ onOpenBooking }) {
  return (
    <div className="pt-6">
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-bookBtn bg-white/10 px-3.5 py-1.5 rounded-full mb-3">
            Annual Maintenance Contracts
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Protect Your RO System Year-Round
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Zero surprise repair costs, unlimited free technician visits, and periodic filter replacements included.
          </p>
        </div>
      </div>

      <AmcPlansSection onOpenBooking={onOpenBooking} />
      <FaqSection onOpenBooking={onOpenBooking} />
    </div>
  );
}
