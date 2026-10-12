import React from 'react';
import WhyChooseSection from '../components/WhyChooseSection';
import BrandMarquee from '../components/BrandMarquee';
import FaqSection from '../components/FaqSection';
import { clientInfo } from '../data/siteData';

export default function AboutPage({ onOpenBooking }) {
  return (
    <div className="pt-6">
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-bookBtn bg-white/10 px-3.5 py-1.5 rounded-full mb-3">
            Why Us
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Families Trust {clientInfo.brandName}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Fast doorstep RO service across {clientInfo.locations} with genuine spare parts, transparent service charges, and expert technicians.
          </p>
        </div>
      </div>

      <WhyChooseSection onOpenBooking={onOpenBooking} />
      <BrandMarquee />
      <FaqSection onOpenBooking={onOpenBooking} />
    </div>
  );
}
