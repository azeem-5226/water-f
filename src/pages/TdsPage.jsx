import React from 'react';
import TdsCalculator from '../components/TdsCalculator';
import { Droplet, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TdsPage({ onOpenBooking }) {
  return (
    <div className="py-12 bg-pageBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Water Purity Science
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Understanding Your Drinking Water TDS
          </h1>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            TDS stands for <strong>Total Dissolved Solids</strong> (measured in Parts Per Million - PPM). Find out whether your purifier output is providing safe and balanced minerals.
          </p>
        </div>

        {/* The Interactive Lab Tool */}
        <TdsCalculator onOpenBooking={onOpenBooking} />

        {/* Detailed Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-sm space-y-4">
            <h3 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Why High TDS is Dangerous</span>
            </h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Water exceeding 300 PPM contains excessive inorganic salts, carbonates, chlorides, and potentially toxic heavy metals such as arsenic, fluoride, and lead. Long-term consumption leads to kidney strain and gastrointestinal issues.
            </p>
            <ul className="text-xs space-y-2 text-primary font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" /> High scale build-up inside plumbing & cookware
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Salty, bitter, or chemical taste
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Health risks for infants & elderly
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-sm space-y-4">
            <h3 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Why Too Low TDS (&lt;50 PPM) is Not Ideal</span>
            </h3>
            <p className="text-sm text-textMuted leading-relaxed">
              When standard purifiers over-strip water down below 50 PPM, it loses all essential Calcium and Magnesium. Our certified Water Filter Care technicians install copper/alkaline mineralizer cartridges to maintain the healthy sweet spot (80–140 PPM).
            </p>
            <ul className="text-xs space-y-2 text-primary font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Acidic water leaching natural body electrolytes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Flat, tasteless drinking water
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Mineralizer cartridge adds natural alkaline pH
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
