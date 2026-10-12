import React from 'react';
import { Check, X, Shield, Star, Award, Zap } from 'lucide-react';
import { amcPlans } from '../data/siteData';

export default function AmcPlansSection({ onOpenBooking }) {
  return (
    <section id="amc-plans" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            365-Day Peace of Mind
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            All-Inclusive AMC Protection Plans
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            Never worry about unexpected purifier breakdown expenses. Free routine servicing, free filter replacements, and priority same-day response.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {amcPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-pageBg/50 border-2 border-accent shadow-xl scale-105 z-10'
                  : 'bg-cardBg border border-accent/15 shadow-card hover:shadow-card-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-bookBtn text-primary font-heading font-extrabold text-xs uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    {plan.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-accent/20 text-accent">
                    {plan.duration}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-heading font-extrabold text-primary">{plan.price}</span>
                  <span className="text-xs text-textMuted block mt-1">Ideal for: {plan.ideal}</span>
                </div>

                <div className="w-full h-px bg-accent/10 my-6" />

                <ul className="space-y-3.5 text-sm mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat.text} className="flex items-start gap-3">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      )}
                      <span className={feat.included ? 'text-primary font-medium' : 'text-gray-400 line-through'}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenBooking(`AMC Plan - ${plan.name}`)}
                className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                  plan.popular
                    ? 'btn-book-service shadow-gold'
                    : 'bg-primary hover:bg-primary-light text-white'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
