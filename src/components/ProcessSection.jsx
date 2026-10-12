import React from 'react';
import { PhoneCall, Truck, Droplet, ArrowRight, MessageCircle } from 'lucide-react';
import { processSteps, statCards, clientInfo } from '../data/siteData';

const stepIcons = [PhoneCall, Truck, Droplet];

export default function ProcessSection({ onOpenBooking }) {
  return (
    <section className="py-20 bg-pageBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            The Process
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Get Your RO Serviced in 3 Simple Steps
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            Fast, hassle-free doorstep water purifier service in {clientInfo.locations}.
          </p>
        </div>

        {/* 3 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {processSteps.map((item, index) => {
            const Icon = stepIcons[index] || PhoneCall;
            return (
              <div
                key={item.step}
                className="bg-cardBg rounded-3xl p-8 border border-accent/15 shadow-card hover:shadow-card-hover transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-pageBg border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="w-10 h-10 rounded-full bg-accent/10 font-heading font-extrabold text-accent text-lg flex items-center justify-center">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-textMuted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Strip Banner */}
        <div className="bg-gradient-to-r from-primary via-primary-light to-primary rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/15">
            {statCards.map((stat) => (
              <div key={stat.label} className="pt-4 lg:pt-0">
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-bookBtn mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-sm font-medium text-white/90">
              Need immediate RO repair in Bhubaneswar, Cuttack or Jatni?
            </span>
            <div className="flex items-center gap-3">
              <a
                href={clientInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="btn-book-service px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                Book Service
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
