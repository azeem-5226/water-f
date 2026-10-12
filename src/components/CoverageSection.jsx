import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { serviceAreas, clientInfo } from '../data/siteData';

export default function CoverageSection({ onOpenBooking }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const filteredAreas = serviceAreas.filter(
    (item) =>
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.areas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 6) {
      setPincodeStatus({
        covered: true,
        text: `Great news! Pincode ${pincode} in Odisha is covered with Same-Day Doorstep Technician Service.`,
      });
    } else {
      setPincodeStatus({
        covered: false,
        text: 'Please enter a valid 6-digit postal pincode.',
      });
    }
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Coverage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            We Serve Near You
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-3">
            Doorstep RO water purifier service available across major residential, apartment and commercial areas in Bhubaneswar, Cuttack &amp; Jatni.
          </p>
        </div>

        {/* Quick Check Form */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="bg-pageBg border border-accent/20 rounded-3xl p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-primary mb-3 text-center">
              Check Instant Doorstep Availability
            </h3>
            
            <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-5 h-5 text-accent absolute left-4 top-3.5" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 751024, 753001, 752050)"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ''));
                    setPincodeStatus(null);
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-primary/20 bg-white focus:outline-none focus:border-accent text-sm font-semibold"
                />
              </div>

              <button
                type="submit"
                className="btn-book-service px-6 py-3 rounded-2xl font-bold text-sm shrink-0 flex items-center justify-center gap-2 shadow-gold"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {pincodeStatus && (
              <div
                className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                  pincodeStatus.covered
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{pincodeStatus.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* 3 Core Hubs Grid: Bhubaneswar, Cuttack, Jatni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredAreas.map((hub) => (
            <div
              key={hub.city}
              className="bg-cardBg rounded-3xl p-8 border border-accent/15 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-primary group-hover:text-accent transition-colors">
                      {hub.city}
                    </h3>
                    <span className="text-xs text-textMuted font-semibold">Same-Day Service Hub</span>
                  </div>
                </div>

                <p className="text-sm text-textMuted leading-relaxed mb-6">
                  {hub.areas}
                </p>
              </div>

              <button
                onClick={() => onOpenBooking(`RO Service in ${hub.city}`)}
                className="btn-book-service w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold"
              >
                <span>Book Technician in {hub.city}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
