import React from 'react';
import { Wrench, Layers, Hammer, ShieldCheck, Award, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { serviceList, clientInfo } from '../data/siteData';

const iconMap = {
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Hammer: Hammer,
  Layers: Layers,
  Award: Award,
};

export default function ServicesSection({ onOpenBooking }) {
  return (
    <section id="services" className="py-20 bg-pageBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Our Water Purifier Services
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            Complete RO and water purifier support for every home, apartment and office in {clientInfo.locations}.
          </p>
        </div>

        {/* 5 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            return (
              <div
                key={service.id}
                className="bg-cardBg rounded-3xl p-6 sm:p-7 shadow-card hover:shadow-card-hover border border-accent/15 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Real Work Image Banner */}
                {service.image && (
                  <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-5 bg-pageBg border border-accent/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/10"></div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary bg-bookBtn shadow-sm px-3 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-accent shadow-sm">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white drop-shadow-md">
                        {service.tagline}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3 mb-6 flex-1">
                  <h3 className="font-heading text-xl font-bold text-primary group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-2xl font-heading font-extrabold text-primary">
                    {service.price}
                    <span className="text-xs text-textMuted font-normal ml-1.5">standard</span>
                  </div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-textMuted leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2 pt-3 border-t border-gray-100 text-xs font-medium text-primary">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons Row */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="btn-book-service flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/917537872629?text=Hello%20Water%20Filter%20Care!%20I%20want%20to%20book%20${encodeURIComponent(service.title)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                    title="Book on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
