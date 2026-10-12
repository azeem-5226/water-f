import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/siteData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-pageBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Customer Reviews
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            Trusted by households and offices for reliable water purifier service across Odisha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-cardBg rounded-3xl p-8 border border-accent/15 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex text-bookBtn mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-bookBtn" />
                  ))}
                </div>

                <p className="text-base text-primary/85 leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-base shadow-sm">
                  {item.initial}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-primary flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </h4>
                  <span className="text-xs text-textMuted font-medium">{item.loc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-textMuted font-semibold mt-10">
          ⭐ 4.9/5 Average Rating based on verified local customer feedback in Bhubaneswar, Cuttack &amp; Jatni.
        </p>

      </div>
    </section>
  );
}
