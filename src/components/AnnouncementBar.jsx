import React from 'react';
import { Phone, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { clientInfo } from '../data/siteData';

export default function AnnouncementBar() {
  return (
    <div className="bg-primary text-white text-xs sm:text-sm py-2 border-b border-primary-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-bookBtn text-primary font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
            Service Charges Just {clientInfo.startingPrice}
          </span>
          <span className="hidden sm:inline">Doorstep RO Water Purifier Service in {clientInfo.locations}</span>
          <span className="sm:hidden">RO Service in {clientInfo.locations}</span>
        </div>

        <div className="flex items-center gap-5 text-xs text-white/90">
          <div className="flex items-center gap-1.5 hidden md:flex">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-light" />
            <span>100% Genuine Spare Parts</span>
          </div>
          <div className="flex items-center gap-1.5 hidden lg:flex">
            <Clock className="w-3.5 h-3.5 text-bookBtn" />
            <span>Same-Day Doorstep Visit</span>
          </div>
          <a
            href={`tel:${clientInfo.phoneClean}`}
            className="flex items-center gap-1.5 font-bold text-bookBtn hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{clientInfo.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
