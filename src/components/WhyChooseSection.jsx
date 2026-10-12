import React from 'react';
import { CheckCircle2, Phone, ShieldCheck, Clock, Award, Droplets } from 'lucide-react';
import { whyChoosePoints, clientInfo } from '../data/siteData';

export default function WhyChooseSection({ onOpenBooking }) {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5">
            <div className="bg-pageBg border border-accent/20 rounded-3xl p-8 relative overflow-hidden shadow-card">
              <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-accent bg-white px-3 py-1 rounded-full border border-accent/20">
                Doorstep Reliability
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-primary mt-3">
                Expert RO Purifier Care
              </h3>
              <p className="text-sm text-textMuted mt-2 leading-relaxed">
                Certified field service technicians attending breakdown, routine servicing, and installation calls on the same day.
              </p>

              {/* Callout Strip */}
              <div className="mt-8 p-4 rounded-2xl bg-primary text-white space-y-1">
                <span className="text-xs text-white/70 block">Need urgent RO repair?</span>
                <a
                  href={`tel:${clientInfo.phoneClean}`}
                  className="font-heading font-extrabold text-lg text-bookBtn hover:underline block"
                >
                  Call us now: {clientInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Why Points Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
                Why Us
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                Why Families Trust <br />
                <span className="text-accent">{clientInfo.brandName}</span>
              </h2>
            </div>

            <ul className="space-y-3.5">
              {whyChoosePoints.map((point) => (
                <li key={point} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-base font-semibold text-primary">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="btn-book-service px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-gold"
              >
                Schedule Doorstep Service
              </button>
              
              <a
                href={`tel:${clientInfo.phoneClean}`}
                className="px-6 py-3.5 rounded-xl bg-pageBg hover:bg-pageBg/70 border border-primary/20 text-primary font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>Call {clientInfo.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
