import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';
import { faqs, clientInfo } from '../data/siteData';

export default function FaqSection({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            Clear answers about our doorstep RO repair, filter replacement, and technician visits.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="border border-accent/20 rounded-2xl overflow-hidden transition-all duration-200 bg-cardBg shadow-sm hover:border-accent"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-primary hover:text-accent transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-accent shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-textMuted leading-relaxed border-t border-dashed border-accent/15">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card matching client's final CTA */}
        <div className="mt-14 bg-pageBg border border-accent/20 rounded-3xl p-8 text-center sm:flex sm:items-center sm:justify-between gap-6 shadow-sm">
          <div className="text-left mb-4 sm:mb-0">
            <h3 className="font-heading font-bold text-xl text-primary">
              Need RO Service Today?
            </h3>
            <p className="text-sm text-textMuted mt-1">
              Call or WhatsApp {clientInfo.brandName} for quick and reliable doorstep service.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end">
            <a
              href={`tel:${clientInfo.phoneClean}`}
              className="px-5 py-3 rounded-xl bg-white border border-accent/30 text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-accent"
            >
              <PhoneCall className="w-4 h-4 text-accent" />
              <span>Call {clientInfo.phone}</span>
            </a>
            <a
              href={clientInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="btn-book-service px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-gold"
            >
              Book Service
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
