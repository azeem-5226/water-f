import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import { purifierBrands } from '../data/siteData';

export default function BrandMarquee() {
  return (
    <div className="py-12 bg-white border-y border-accent/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <h3 className="font-heading font-bold text-base text-primary">
              Multi-Brand Certified Service Engineers
            </h3>
          </div>
          <span className="text-xs font-semibold text-textMuted">
            Authorized spares for all leading residential & commercial purifiers
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {purifierBrands.map((brand) => (
            <div
              key={brand.name}
              className="bg-pageBg/60 hover:bg-pageBg border border-accent/20 rounded-2xl p-3 text-center transition-all hover:scale-105 shadow-sm group"
            >
              <span className="font-heading font-extrabold text-xs text-primary group-hover:text-accent block">
                {brand.name}
              </span>
              <span className="text-[10px] text-textMuted font-medium block mt-0.5">
                Genuine Spares
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
