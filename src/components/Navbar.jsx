import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Droplets, Phone, Menu, X, CalendarCheck } from 'lucide-react';
import { clientInfo } from '../data/siteData';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/tds-calculator', label: 'Water TDS Guide' },
    { to: '/coverage', label: 'Locations' },
    { to: '/about', label: 'Why Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-accent/15 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Water Filter Care */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary-light to-accent flex items-center justify-center text-white shadow-md shadow-accent/25 group-hover:scale-105 transition-transform duration-200">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-2xl text-primary tracking-tight">Water Filter <span className="text-accent">Care</span></span>
              </div>
              <p className="text-[10px] font-semibold text-textMuted tracking-wider uppercase">{clientInfo.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation Links (No Admin link on public header) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-accent bg-accent/10 font-bold'
                      : 'text-primary hover:text-accent hover:bg-accent/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Call Badge & Golden Book Service Button */}
          <div className="hidden sm:flex items-center gap-3.5">
            <a
              href={`tel:${clientInfo.phoneClean}`}
              className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pageBg border border-accent/20 text-primary hover:border-accent hover:text-accent transition-all text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>{clientInfo.phone}</span>
            </a>

            {/* User Requested Book Service button in #F4B942 */}
            <button
              onClick={() => onOpenBooking()}
              className="btn-book-service flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-gold"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Service</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="btn-book-service px-3 py-2 rounded-lg text-xs font-bold sm:hidden"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-primary hover:bg-pageBg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-accent/15 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'text-accent bg-accent/10 font-bold'
                    : 'text-primary hover:bg-pageBg'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-book-service w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book RO Service Now</span>
            </button>
            <a
              href={`tel:${clientInfo.phoneClean}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pageBg text-primary font-bold text-sm border border-accent/20"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call {clientInfo.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
