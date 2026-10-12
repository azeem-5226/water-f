import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Phone, MessageCircle, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { clientInfo } from '../data/siteData';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-accent relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-md">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white">Water Filter <span className="text-accent-light">Care</span></span>
                <p className="text-[10px] font-semibold text-white/60 tracking-wider uppercase">{clientInfo.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              Fast, reliable RO water purifier repair, regular servicing, installation, and genuine filter replacement across Bhubaneswar, Cuttack & Jatni. Service charges just ₹199/-.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-xs font-semibold text-accent-light">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Spare Parts
              </span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-heading font-bold text-base tracking-wide text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-bookBtn">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <button onClick={() => onOpenBooking('RO Repair Service')} className="hover:text-bookBtn transition-colors text-left">
                  RO Repair Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('RO Regular Service')} className="hover:text-bookBtn transition-colors text-left">
                  RO Regular Service & Maintenance
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('RO Installation')} className="hover:text-bookBtn transition-colors text-left">
                  RO Purifier Installation
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('RO Uninstallation & Shifting')} className="hover:text-bookBtn transition-colors text-left">
                  RO Uninstallation & Shifting
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking('Filter & Membrane Replacement')} className="hover:text-bookBtn transition-colors text-left">
                  Filter & Membrane Replacement
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-heading font-bold text-base tracking-wide text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-bookBtn">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link to="/" className="hover:text-bookBtn transition-colors">Home Page</Link></li>
              <li><Link to="/services" className="hover:text-bookBtn transition-colors">Our Services</Link></li>
              <li><Link to="/tds-calculator" className="hover:text-bookBtn transition-colors">Water TDS Health Meter</Link></li>
              <li><Link to="/coverage" className="hover:text-bookBtn transition-colors">Service Areas</Link></li>
              <li><Link to="/about" className="hover:text-bookBtn transition-colors">Why Families Trust Us</Link></li>
              <li><Link to="/contact" className="hover:text-bookBtn transition-colors">Call & WhatsApp Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-bold text-base tracking-wide text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-bookBtn">
              Doorstep Service
            </h4>
            <div className="space-y-3 text-sm text-white/75">
              <a href={`tel:${clientInfo.phoneClean}`} className="flex items-start gap-3 hover:text-bookBtn transition-colors">
                <Phone className="w-4 h-4 text-bookBtn mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold text-white">{clientInfo.phone}</span>
                  <span className="text-xs text-white/60">Direct Helpline</span>
                </div>
              </a>
              <a href={clientInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-emerald-400 transition-colors">
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold text-white">WhatsApp Booking</span>
                  <span className="text-xs text-white/60">Instant Reply</span>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bookBtn mt-0.5 shrink-0" />
                <span>Serving {clientInfo.locations}</span>
              </div>
            </div>
            
            <div className="mt-5">
              <button
                onClick={() => onOpenBooking()}
                className="btn-book-service w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                Book Doorstep Visit
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} {clientInfo.brandName}. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <span>Fast &amp; Reliable RO Service in {clientInfo.locations}</span>
            <Link
              to="/admin/login"
              className="hover:text-white/80 transition-colors inline-flex items-center gap-1 opacity-30 hover:opacity-100"
              title="Staff Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
