import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, CalendarCheck } from 'lucide-react';
import { clientInfo } from '../data/siteData';

export default function ContactPage({ onOpenBooking }) {
  return (
    <div className="py-16 bg-pageBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Get Quick Service
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Contact {clientInfo.brandName}
          </h1>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            Quick response • Transparent service • Expert technicians in {clientInfo.locations}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Direct Phone Helpline */}
          <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary">Direct Helpline</h3>
            <p className="text-sm text-textMuted">Call us directly to schedule a technician visit.</p>
            <div className="pt-2">
              <a href={`tel:${clientInfo.phoneClean}`} className="text-xl font-extrabold text-primary hover:text-accent block">
                {clientInfo.phone}
              </a>
              <span className="text-xs text-textMuted">Same-day service available</span>
            </div>
          </div>

          {/* WhatsApp Direct Helpdesk */}
          <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary">WhatsApp Booking</h3>
            <p className="text-sm text-textMuted">Send your issue, address and name for quick response.</p>
            <div className="pt-2">
              <a
                href={clientInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xl font-extrabold text-emerald-600 hover:underline block"
              >
                {clientInfo.phone}
              </a>
              <span className="text-xs text-textMuted">Average response: under 5 minutes</span>
            </div>
          </div>

          {/* Service Area */}
          <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary">Service Coverage</h3>
            <p className="text-sm text-textMuted">Serving across Odisha metro &amp; suburban localities.</p>
            <div className="pt-2">
              <strong className="text-base text-primary block">
                {clientInfo.locations}
              </strong>
              <span className="text-xs text-textMuted">Doorstep visit within a few hours</span>
            </div>
          </div>

        </div>

        {/* Action Banner */}
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold mb-3">
            Service Charges Just {clientInfo.startingPrice}
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Book online in under 60 seconds. Our certified technician reaches your doorstep for quick diagnosis and repair.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="btn-book-service px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-gold"
            >
              Book Service Now
            </button>
            <a
              href={`tel:${clientInfo.phoneClean}`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
            >
              Call {clientInfo.phone}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
