import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Phone,
  Calendar,
  MapPin,
  X,
  CheckCircle2,
  MessageCircle,
  Send,
  UserCheck,
  Shield,
  Copy,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';
import { adminService } from '../../services/adminService';

export default function AdminBookingsTable({
  bookings = [],
  technicians = [],
  onBookingUpdated,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // WhatsApp Modal State
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [targetBooking, setTargetBooking] = useState(null);
  const [waMessageType, setWaMessageType] = useState('technician_assigned');
  const [customWaMessage, setCustomWaMessage] = useState('');
  const [waSending, setWaSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const statuses = ['ALL', 'Pending', 'Assigned', 'In Progress', 'Completed'];

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      (b.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.phone || '').includes(searchTerm) ||
      (b.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.serviceType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.address || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdatingId(bookingId);
    try {
      const res = await adminService.updateBookingStatus(bookingId, newStatus);
      if (onBookingUpdated) onBookingUpdated(res.booking);
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAssignTechnician = async (bookingId, technicianId) => {
    if (!technicianId) return;
    setUpdatingId(bookingId);
    try {
      const res = await adminService.assignTechnician(bookingId, technicianId);
      if (onBookingUpdated) onBookingUpdated(res.booking);
      
      // Prompt admin to immediately notify via WhatsApp
      const chosenBooking = bookings.find((b) => b.id === bookingId);
      if (chosenBooking) {
        setTargetBooking({
          ...chosenBooking,
          assignedTechnician: res.booking.assignedTechnician,
          status: 'Assigned',
        });
        setWaMessageType('technician_assigned');
        setWhatsappModalOpen(true);
      }
    } catch (err) {
      alert('Failed to assign technician: ' + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingId(null);
    }
  };

  const openWhatsAppModal = (booking, defaultType = 'technician_assigned') => {
    setTargetBooking(booking);
    setWaMessageType(defaultType);
    setCustomWaMessage('');
    setCopied(false);
    setWhatsappModalOpen(true);
  };

  const generatePreviewText = () => {
    if (!targetBooking) return '';
    const techName = targetBooking.assignedTechnician?.name || 'Assigned Technician';
    const techPhone = targetBooking.assignedTechnician?.phone || '+91 75378 72629';

    switch (waMessageType) {
      case 'booking_confirmed':
        return `*Water Filter Care - Booking Confirmed*\n\nDear ${targetBooking.customerName},\nYour request for ${targetBooking.serviceType} is confirmed!\n\n📍 Address: ${targetBooking.address || 'Bhubaneswar'}\n💰 Inspection Fee: Just ₹199/-\n\nDoorstep Technician helpline: +91 75378 72629.`;
      case 'technician_assigned':
        return `*Water Filter Care - Technician Dispatched!*\n\nDear ${targetBooking.customerName},\nTechnician *${techName}* (${techPhone}) is assigned to your ${targetBooking.serviceType}.\n\nArrival: Expected today within 45-60 mins.\nHelpline: +91 75378 72629.`;
      case 'notify_technician':
        return `*Water Filter Care - New Job Assigned*\n\nHi ${techName},\nYou have a new doorstep service job:\n\n👤 Customer: ${targetBooking.customerName}\n📞 Phone: ${targetBooking.phone}\n🛠️ Service: ${targetBooking.serviceType}\n📍 Address: ${targetBooking.address}\n\nPlease contact customer immediately.`;
      case 'job_completed':
        return `*Water Filter Care - Service Completed*\n\nDear ${targetBooking.customerName},\nYour RO service (${targetBooking.serviceType}) is completed successfully.\n\n🛡️ 30-Day Service Guarantee Activated.\nTDS Verification Passed.\nHelpline: +91 75378 72629.`;
      case 'custom':
        return customWaMessage || `*Water Filter Care Update*\n\nDear ${targetBooking.customerName}, regarding booking ${targetBooking.id}.`;
      default:
        return '';
    }
  };

  const handleSendWhatsApp = async () => {
    if (!targetBooking) return;
    setWaSending(true);
    try {
      const res = await adminService.sendWhatsAppNotification(
        targetBooking.id,
        waMessageType,
        customWaMessage
      );

      // Open WhatsApp Web / App
      window.open(res.waLink, '_blank');

      if (onBookingUpdated && res.logEntry) {
        const updatedBooking = {
          ...targetBooking,
          whatsappLogs: [res.logEntry, ...(targetBooking.whatsappLogs || [])],
        };
        onBookingUpdated(updatedBooking);
      }
      setWhatsappModalOpen(false);
    } catch (err) {
      alert('Error preparing WhatsApp message: ' + (err.response?.data?.message || err.message));
    } finally {
      setWaSending(false);
    }
  };

  const handleCopyMessage = () => {
    const text = generatePreviewText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-primary/10 shadow-sm overflow-hidden mb-8">
      {/* Top Filter Bar */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-extrabold text-xl text-primary">
              Live Customer Bookings
            </h3>
            <span className="text-xs bg-accent/10 text-accent font-extrabold px-2.5 py-0.5 rounded-full">
              {filtered.length} Bookings
            </span>
          </div>
          <p className="text-xs text-textMuted mt-0.5">
            Assign field technicians, trigger WhatsApp dispatch alerts, and track status.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-textMuted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search name, phone, city, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white text-xs font-medium focus:outline-none focus:border-accent"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-pageBg p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-textMuted hover:text-primary'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pageBg/60 border-b border-primary/10 text-[11px] font-bold text-textMuted uppercase tracking-wider">
              <th className="py-3.5 px-6">ID &amp; Date</th>
              <th className="py-3.5 px-6">Customer &amp; Location</th>
              <th className="py-3.5 px-6">Service Type</th>
              <th className="py-3.5 px-6">Assigned Technician</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">WhatsApp &amp; Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-textMuted text-sm">
                  No bookings found matching current filters.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="hover:bg-pageBg/30 transition-colors">
                  {/* ID & Date */}
                  <td className="py-4 px-6 font-mono text-xs">
                    <strong className="text-primary font-bold block">{b.id}</strong>
                    <span className="text-textMuted text-[11px]">
                      {b.preferredDate || new Date(b.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                    {b.warrantyStatus && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
                        {b.warrantyStatus}
                      </span>
                    )}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-6">
                    <strong className="text-primary block font-bold">{b.customerName}</strong>
                    <div className="flex items-center gap-1.5 text-xs text-textMuted">
                      <span>{b.phone}</span>
                    </div>
                    <p className="text-[11px] text-textMuted truncate max-w-xs mt-0.5">
                      📍 {b.address || 'Address not specified'}
                    </p>
                  </td>

                  {/* Service Required */}
                  <td className="py-4 px-6">
                    <span className="font-semibold text-primary block">{b.serviceType}</span>
                    <span className="text-xs text-textMuted truncate max-w-xs block">
                      {b.problem || b.notes || 'Routine checkup requested'}
                    </span>
                  </td>

                  {/* Technician Assignment */}
                  <td className="py-4 px-6">
                    {b.assignedTechnician ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                          <UserCheck className="w-3.5 h-3.5 text-accent" />
                          <span>{b.assignedTechnician.name}</span>
                        </div>
                        <span className="text-[11px] text-textMuted block font-mono">
                          {b.assignedTechnician.phone}
                        </span>
                        <select
                          disabled={updatingId === b.id}
                          value={b.assignedTechnician.id || ''}
                          onChange={(e) => handleAssignTechnician(b.id, e.target.value)}
                          className="text-[11px] text-accent font-semibold underline bg-transparent cursor-pointer focus:outline-none"
                        >
                          <option value="">Re-assign...</option>
                          {technicians.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} ({t.city} - {t.status})
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <select
                        disabled={updatingId === b.id}
                        defaultValue=""
                        onChange={(e) => handleAssignTechnician(b.id, e.target.value)}
                        className="text-xs font-semibold bg-pageBg border border-accent/30 text-primary rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-accent cursor-pointer hover:border-accent"
                      >
                        <option value="" disabled>
                          + Assign Technician
                        </option>
                        {technicians.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} • {t.city} ({t.status})
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-6">
                    <select
                      value={b.status}
                      disabled={updatingId === b.id}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className={`text-xs font-bold border rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer ${getStatusBadge(
                        b.status
                      )}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Actions & WhatsApp button */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* WhatsApp trigger */}
                      <button
                        onClick={() => openWhatsAppModal(b)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all"
                        title="Send WhatsApp update to customer or technician"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>

                      {/* View Details */}
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-2 rounded-xl bg-pageBg text-primary hover:bg-accent hover:text-white transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* WHATSAPP UPDATE MODAL */}
      {whatsappModalOpen && targetBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-emerald-100">
            <button
              onClick={() => setWhatsappModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-pageBg flex items-center justify-center text-textMuted hover:text-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary">
                Send WhatsApp Update
              </h3>
            </div>
            <p className="text-xs text-textMuted">
              Booking: <strong className="text-primary">{targetBooking.id}</strong> • Customer:{' '}
              <strong className="text-primary">{targetBooking.customerName}</strong> ({targetBooking.phone})
            </p>

            {/* Template Selection */}
            <div className="mt-5 space-y-2">
              <label className="text-xs font-bold text-primary block">Select Message Template:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setWaMessageType('technician_assigned')}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                    waMessageType === 'technician_assigned'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-gray-200 hover:bg-pageBg text-textMuted'
                  }`}
                >
                  🚗 Technician Dispatched
                </button>
                <button
                  type="button"
                  onClick={() => setWaMessageType('booking_confirmed')}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                    waMessageType === 'booking_confirmed'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-gray-200 hover:bg-pageBg text-textMuted'
                  }`}
                >
                  📋 Booking Confirmed
                </button>
                <button
                  type="button"
                  onClick={() => setWaMessageType('notify_technician')}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                    waMessageType === 'notify_technician'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-gray-200 hover:bg-pageBg text-textMuted'
                  }`}
                >
                  🛠️ Send Job To Technician
                </button>
                <button
                  type="button"
                  onClick={() => setWaMessageType('job_completed')}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                    waMessageType === 'job_completed'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-gray-200 hover:bg-pageBg text-textMuted'
                  }`}
                >
                  ✅ Job Done &amp; Warranty
                </button>
              </div>
            </div>

            {/* Custom Input if needed */}
            {waMessageType === 'custom' && (
              <div className="mt-3">
                <label className="text-xs font-bold text-textMuted block mb-1">Custom Message:</label>
                <textarea
                  rows={3}
                  value={customWaMessage}
                  onChange={(e) => setCustomWaMessage(e.target.value)}
                  placeholder="Enter custom note for customer..."
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-accent"
                />
              </div>
            )}

            {/* Live Message Preview */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-textMuted uppercase tracking-wider">
                  Live Message Preview:
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 font-mono whitespace-pre-line leading-relaxed max-h-44 overflow-y-auto">
                {generatePreviewText()}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setWhatsappModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-textMuted font-bold text-xs uppercase hover:bg-pageBg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                disabled={waSending}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{waSending ? 'Opening...' : 'Send on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL BOOKING DETAILS MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-pageBg flex items-center justify-center text-textMuted hover:text-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
              Booking Overview
            </span>
            <h3 className="font-heading text-xl font-bold text-primary mt-2">
              {selectedBooking.id}
            </h3>

            <div className="space-y-4 my-6 text-sm">
              <div className="bg-pageBg p-4 rounded-2xl">
                <span className="text-xs font-bold text-textMuted block">Customer</span>
                <strong className="text-base text-primary block">{selectedBooking.customerName}</strong>
                <div className="flex items-center gap-3 text-xs text-textMuted mt-1">
                  <span>📞 {selectedBooking.phone}</span>
                  {selectedBooking.email && <span>✉️ {selectedBooking.email}</span>}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-textMuted block">Service Requested</span>
                <span className="text-base font-semibold text-primary">{selectedBooking.serviceType}</span>
                {selectedBooking.warrantyStatus && (
                  <span className="ml-2 text-xs font-bold text-accent">({selectedBooking.warrantyStatus})</span>
                )}
              </div>

              <div>
                <span className="text-xs font-bold text-textMuted block">Problem Details</span>
                <p className="text-sm text-primary bg-yellow-50/60 p-3 rounded-xl border border-yellow-100">
                  {selectedBooking.problem || selectedBooking.notes || 'No description provided'}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-textMuted block">Doorstep Address</span>
                <p className="text-sm text-primary flex items-start gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{selectedBooking.address || 'Address pending verification'}</span>
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-textMuted block">Assigned Technician</span>
                {selectedBooking.assignedTechnician ? (
                  <div className="mt-1 p-3 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-between">
                    <div>
                      <strong className="text-sm text-primary block">
                        {selectedBooking.assignedTechnician.name}
                      </strong>
                      <span className="text-xs text-textMuted">{selectedBooking.assignedTechnician.phone}</span>
                    </div>
                    <span className="text-[10px] font-bold text-accent uppercase bg-white px-2.5 py-1 rounded-full border border-accent/20">
                      On Job
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-textMuted italic">No technician assigned yet</span>
                )}
              </div>

              {/* WhatsApp Logs History */}
              {selectedBooking.whatsappLogs && selectedBooking.whatsappLogs.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-textMuted block mb-1">WhatsApp Logs</span>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {selectedBooking.whatsappLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2 rounded-lg bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-100 flex items-center justify-between"
                      >
                        <span>{log.type.replace('_', ' ').toUpperCase()}</span>
                        <span className="text-[10px] text-emerald-700">
                          {new Date(log.sentAt).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedBooking(null);
                  openWhatsAppModal(selectedBooking);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Customer</span>
              </button>

              <button
                onClick={() => setSelectedBooking(null)}
                className="btn-book-service px-6 py-3 rounded-xl font-bold text-xs uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
