import React, { useState } from 'react';
import { ShieldCheck, Clock, Zap, Phone, ArrowRight, CheckCircle2, MessageCircle, MapPin } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { clientInfo } from '../data/siteData';

export default function HeroSection({ onOpenBooking }) {
  const [quickForm, setQuickForm] = useState({
    customerName: '',
    phone: '',
    warranty: 'No',
    address: '',
    serviceType: 'RO Repair Service',
  });

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState('');

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessId('');

    try {
      const data = await bookingService.createBooking({
        ...quickForm,
        email: `${quickForm.phone.replace(/[^0-9]/g, '')}@waterfiltercare.in`,
        problem: `[Warranty: ${quickForm.warranty}] Quick service request`,
      });
      setSuccessId(data.booking?.id || 'BK-' + Date.now().toString().slice(-5));
      setQuickForm({
        customerName: '',
        phone: '',
        warranty: 'No',
        address: '',
        serviceType: 'RO Repair Service',
      });
    } catch (err) {
      alert('Could not submit booking: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-8 pb-16 lg:py-20 overflow-hidden bg-mesh-water">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Client's Authentic Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-accent" />
              <span>Fast &amp; Reliable RO Service</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.12]">
              RO Water Purifier Service <br />
              at <span className="text-accent underline decoration-accent/30 decoration-wavy underline-offset-8">
                Your Doorstep
              </span>
            </h1>

            <p className="text-textMuted text-base sm:text-lg leading-relaxed max-w-xl">
              Expert RO repair, installation, servicing and filter replacement for homes and offices. <strong className="text-accent font-extrabold">Service charges just {clientInfo.startingPrice}</strong>
            </p>

            <div className="flex items-center gap-2 text-sm font-bold text-primary bg-white/80 px-4 py-2.5 rounded-2xl border border-accent/20 w-fit shadow-sm">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Serving {clientInfo.locations}</span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-accent/20 shadow-sm text-xs font-bold text-primary">
                <Clock className="w-4 h-4 text-accent" />
                <span>Same Day Service</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-accent/20 shadow-sm text-xs font-bold text-primary">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Genuine Spare Parts</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-accent/20 shadow-sm text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Expert Technicians</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={clientInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2.5 shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Book Service on WhatsApp</span>
              </a>

              <a
                href={`tel:${clientInfo.phoneClean}`}
                className="btn-book-service px-7 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-gold transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now ({clientInfo.phone})</span>
              </a>
            </div>

          </div>

          {/* Right Column: Enquiry Form Matching Client's Reference Form */}
          <div className="lg:col-span-5">
            <div className="bg-cardBg rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover border border-accent/20 relative">
              <div className="absolute -top-3 right-6 bg-bookBtn text-primary font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                Doorstep Visit
              </div>

              <div className="mb-5">
                <h3 className="font-heading text-xl font-bold text-primary">
                  Book Your RO Service Today
                </h3>
                <p className="text-xs text-textMuted mt-0.5">
                  Doorstep service in Bhubaneswar, Cuttack &amp; Jatni
                </p>
              </div>

              {successId ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-heading font-bold text-emerald-900">Thank you!</h4>
                  <p className="text-xs text-emerald-700">
                    Our team will contact you shortly. Booking ID: <strong className="text-primary font-bold">{successId}</strong>
                  </p>
                  <button
                    onClick={() => setSuccessId('')}
                    className="btn-book-service text-xs px-4 py-2 rounded-lg font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={quickForm.customerName}
                      onChange={(e) => setQuickForm({ ...quickForm, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/30 focus:bg-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={quickForm.phone}
                      onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/30 focus:bg-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  {/* Client's exact warranty dropdown */}
                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                      Warranty Status *
                    </label>
                    <select
                      value={quickForm.warranty}
                      onChange={(e) => setQuickForm({ ...quickForm, warranty: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-primary/20 bg-pageBg/30 focus:bg-white focus:outline-none focus:border-accent text-xs font-semibold"
                    >
                      <option value="No">No (Out of Warranty)</option>
                      <option value="Yes">Yes (Under Warranty)</option>
                      <option value="AMC">AMC (Annual Maintenance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                      Service Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Area / Locality (Bhubaneswar, Cuttack or Jatni)"
                      value={quickForm.address}
                      onChange={(e) => setQuickForm({ ...quickForm, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/30 focus:bg-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-book-service w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-gold transition-all"
                  >
                    {loading ? 'Submitting...' : 'Get Quick Service'}
                  </button>

                  <p className="text-center text-[11px] text-textMuted pt-1">
                    Quick response • Transparent service • Expert technicians
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
