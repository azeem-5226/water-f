import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Phone, User, MapPin, Wrench, Shield, MessageCircle } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { clientInfo } from '../data/siteData';

export default function BookingModal({ isOpen, onClose, preselectedService = 'RO Repair Service' }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    warranty: 'No',
    serviceType: preselectedService,
    problem: '',
    address: '',
    preferredDate: new Date().toISOString().slice(0, 10),
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '', bookingId: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '', bookingId: '' });

    try {
      const data = await bookingService.createBooking({
        ...formData,
        email: `${formData.phone.replace(/[^0-9]/g, '')}@waterfiltercare.in`,
        problem: `[Warranty: ${formData.warranty}] ${formData.problem || formData.serviceType}`,
      });
      setStatusMessage({
        type: 'success',
        text: 'Thank you! Your service request has been received. Our technician will contact you shortly.',
        bookingId: data.booking?.id || 'BK-' + Date.now().toString().slice(-6),
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit booking. Please call or WhatsApp us directly.',
        bookingId: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-accent/20 relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-pageBg hover:bg-red-50 text-textMuted hover:text-red-500 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-2">
            Fast Doorstep Service
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
            Book RO Service
          </h3>
          <p className="text-sm text-textMuted mt-1">
            Service charges just <strong className="text-accent font-bold">{clientInfo.startingPrice}</strong> in {clientInfo.locations}.
          </p>
        </div>

        {/* Success State */}
        {statusMessage.type === 'success' ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold text-emerald-900">Booking Confirmed!</h4>
              <p className="text-sm text-emerald-700 mt-1">{statusMessage.text}</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-emerald-200 inline-block">
              <span className="text-xs text-textMuted block">Your Booking Reference ID</span>
              <strong className="text-lg font-heading text-primary">{statusMessage.bookingId}</strong>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={`https://wa.me/917537872629?text=Hello%20Water%20Filter%20Care!%20My%20Booking%20ID%20is%20${statusMessage.bookingId}.%20Please%20confirm%20technician%20visit.`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setStatusMessage({ type: '', text: '', bookingId: '' });
                  onClose();
                }}
                className="btn-book-service px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {statusMessage.type === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3.5 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{statusMessage.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-textMuted absolute left-3.5 top-3.5" />
                  <input
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white focus:outline-none focus:border-accent text-sm font-medium text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-textMuted absolute left-3.5 top-3.5" />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white focus:outline-none focus:border-accent text-sm font-medium text-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Exact client field: Warranty Status */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                  Warranty Status *
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-textMuted absolute left-3.5 top-3.5" />
                  <select
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white focus:outline-none focus:border-accent text-sm font-medium text-primary"
                  >
                    <option value="No">No (Out of Warranty)</option>
                    <option value="Yes">Yes (Under Warranty)</option>
                    <option value="AMC">AMC (Annual Maintenance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                  Service Type *
                </label>
                <div className="relative">
                  <Wrench className="w-4 h-4 text-textMuted absolute left-3.5 top-3.5" />
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white focus:outline-none focus:border-accent text-sm font-medium text-primary"
                  >
                    <option value="RO Repair Service">RO Repair Service</option>
                    <option value="RO Regular Service">RO Regular Service & Maintenance</option>
                    <option value="RO Installation">RO Installation</option>
                    <option value="RO Uninstallation & Shifting">RO Uninstallation & Shifting</option>
                    <option value="Filter & Membrane Replacement">Filter & Membrane Replacement</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                Service Address (Bhubaneswar, Cuttack or Jatni) *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-textMuted absolute left-3.5 top-3.5" />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Locality, Flat / House No, Area"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white focus:outline-none focus:border-accent text-sm font-medium text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                Issue Description / RO Brand (Optional)
              </label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. Low water flow, leakage, unusual noise, bad taste"
                className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white focus:outline-none focus:border-accent text-sm font-medium text-primary"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-book-service w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-gold"
              >
                {loading ? 'Submitting Service Request...' : 'Get Quick Service'}
              </button>
            </div>
            
            <p className="text-center text-[11px] text-textMuted">
              Quick response • Transparent service • Expert technicians
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
