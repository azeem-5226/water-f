import React from 'react';
import HeroSection from '../components/HeroSection';
import BrandMarquee from '../components/BrandMarquee';
import ServicesSection from '../components/ServicesSection';
import WhyChooseSection from '../components/WhyChooseSection';
import TdsCalculator from '../components/TdsCalculator';
import ProcessSection from '../components/ProcessSection';
import CoverageSection from '../components/CoverageSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';

export default function HomePage({ onOpenBooking }) {
  return (
    <div>
      <HeroSection onOpenBooking={onOpenBooking} />
      <BrandMarquee />
      <ServicesSection onOpenBooking={onOpenBooking} />
      <WhyChooseSection onOpenBooking={onOpenBooking} />
      
      {/* Interactive Water TDS Meter Section */}
      <section className="py-16 bg-pageBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TdsCalculator onOpenBooking={onOpenBooking} />
        </div>
      </section>

      <ProcessSection onOpenBooking={onOpenBooking} />
      <CoverageSection onOpenBooking={onOpenBooking} />
      <TestimonialsSection />
      <FaqSection onOpenBooking={onOpenBooking} />
    </div>
  );
}
