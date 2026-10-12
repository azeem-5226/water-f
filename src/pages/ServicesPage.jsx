import React from 'react';
import ServicesSection from '../components/ServicesSection';
import BrandMarquee from '../components/BrandMarquee';
import FaqSection from '../components/FaqSection';
import { ShieldCheck, PhoneCall, CheckCircle } from 'lucide-react';

export default function ServicesPage({ onOpenBooking }) {
  return (
    <div className="pt-6">
      {/* Header Banner */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-bookBtn bg-white/10 px-3.5 py-1.5 rounded-full mb-3">
            Professional RO Solutions
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Complete RO Water Purifier Services
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Transparent pricing, 100% genuine replacement filters, same-day doorstep technician visits, and complimentary TDS testing.
          </p>
        </div>
      </div>

      <ServicesSection onOpenBooking={onOpenBooking} />
      <BrandMarquee />
      <FaqSection onOpenBooking={onOpenBooking} />
    </div>
  );
}
