import React, { useState } from 'react';
import { Droplet, AlertTriangle, CheckCircle, Info, Sparkles, ArrowRight } from 'lucide-react';
import { tdsGuide } from '../data/siteData';

export default function TdsCalculator({ onOpenBooking }) {
  const [tdsValue, setTdsValue] = useState(110);

  // find matching TDS range
  const currentGuide = tdsGuide.find((item) => tdsValue >= item.min && tdsValue <= item.max) || tdsGuide[tdsGuide.length - 1];

  const getPurityCategory = (val) => {
    if (val <= 50) return { label: 'Low Mineral Water', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent' };
    if (val <= 150) return { label: 'Optimal Drinking Water (Ideal)', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500' };
    if (val <= 300) return { label: 'Acceptable Hardness', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-500' };
    if (val <= 500) return { label: 'High Hardness (RO Needed)', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-500' };
    return { label: 'Critical / Unsafe Drinking Water', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-500' };
  };

  const statusMeta = getPurityCategory(tdsValue);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-accent/20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Lab Tool
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
            Water Purity & TDS Health Meter
          </h2>
          <p className="text-textMuted text-sm sm:text-base mt-1">
            Drag the slider to your home tap or purifier TDS reading (PPM) to evaluate mineral safety.
          </p>
        </div>

        {/* Live TDS Display Value */}
        <div className="bg-pageBg border border-accent/25 rounded-2xl px-6 py-3 flex items-baseline gap-2 self-start md:self-auto shadow-sm">
          <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Your Water TDS:</span>
          <span className="font-heading text-3xl font-extrabold text-primary">{tdsValue}</span>
          <span className="text-xs font-bold text-accent">PPM</span>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="space-y-4 mb-8">
        <input
          type="range"
          min="10"
          max="950"
          step="5"
          value={tdsValue}
          onChange={(e) => setTdsValue(Number(e.target.value))}
          className="tds-slider"
        />

        <div className="flex justify-between text-[11px] font-bold text-textMuted uppercase tracking-wider px-1">
          <span>0 PPM (Pure)</span>
          <span className="text-emerald-600">50 - 150 (Sweet & Healthy)</span>
          <span className="text-blue-600">300 (Moderate)</span>
          <span className="text-red-500">500+ (Dangerous)</span>
        </div>
      </div>

      {/* Analysis Result Card */}
      <div className={`rounded-2xl p-6 border-l-8 ${statusMeta.border} ${statusMeta.bg} transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Droplet className={`w-5 h-5 ${statusMeta.color}`} />
            <h3 className={`font-heading text-lg sm:text-xl font-bold ${statusMeta.color}`}>
              {currentGuide.status}
            </h3>
          </div>
          <p className="text-sm text-primary/80 max-w-2xl leading-relaxed">
            {currentGuide.desc}
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <button
            onClick={() => onOpenBooking()}
            className="btn-book-service w-full md:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-gold"
          >
            <span>Book Free TDS Home Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Educational Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-pageBg/60">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="block font-bold text-primary mb-0.5">WHO Certified Standards</strong>
            <span className="text-textMuted">TDS between 80-150 PPM retains essential natural Calcium & Magnesium.</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-pageBg/60">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="block font-bold text-primary mb-0.5">Membrane Wear Indicator</strong>
            <span className="text-textMuted">If output TDS exceeds 200 PPM, your RO membrane requires urgent replacement.</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-pageBg/60">
          <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="block font-bold text-primary mb-0.5">Alkaline Mineral Boost</strong>
            <span className="text-textMuted">We install remineralization cartridges to restore ideal 7.5 to 8.5 pH drinking water.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
