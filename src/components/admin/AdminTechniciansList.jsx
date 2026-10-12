import React, { useState } from 'react';
import {
  UserCheck,
  Phone,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  MapPin,
  Star,
  MessageCircle,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { adminService } from '../../services/adminService';

export default function AdminTechniciansList({
  technicians = [],
  onTechniciansUpdated,
}) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newTech, setNewTech] = useState({
    name: '',
    phone: '',
    city: 'Bhubaneswar',
    specialty: 'RO Repair & Pump Expert',
    status: 'Available',
  });

  const availableCount = technicians.filter((t) => t.status === 'Available').length;
  const onDutyCount = technicians.filter((t) => t.status === 'On Duty').length;

  const handleStatusChange = async (techId, newStatus) => {
    try {
      const res = await adminService.updateTechnicianStatus(techId, newStatus);
      const updatedList = technicians.map((t) =>
        t.id === techId ? { ...t, status: newStatus } : t
      );
      if (onTechniciansUpdated) onTechniciansUpdated(updatedList);
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteTechnician = async (techId, techName) => {
    if (!window.confirm(`Are you sure you want to remove ${techName} from the field roster?`)) {
      return;
    }
    try {
      await adminService.deleteTechnician(techId);
      const updatedList = technicians.filter((t) => t.id !== techId);
      if (onTechniciansUpdated) onTechniciansUpdated(updatedList);
    } catch (err) {
      alert('Failed to delete technician: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newTech.name.trim() || !newTech.phone.trim()) {
      alert('Please provide technician name and mobile number.');
      return;
    }

    setSaving(true);
    try {
      const res = await adminService.addTechnician(newTech);
      if (onTechniciansUpdated) {
        onTechniciansUpdated([...technicians, res.technician]);
      }
      setAddModalOpen(false);
      setNewTech({
        name: '',
        phone: '',
        city: 'Bhubaneswar',
        specialty: 'RO Repair & Pump Expert',
        status: 'Available',
      });
    } catch (err) {
      alert('Failed to add technician: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-6 mb-8">
      {/* Header with Stats & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-heading font-extrabold text-xl text-primary">
              Field Technician Team Control
            </h3>
            <span className="text-xs font-bold bg-accent/10 text-accent px-2.5 py-0.5 rounded-full">
              {technicians.length} Technicians
            </span>
          </div>
          <p className="text-xs text-textMuted mt-0.5">
            Manage field service engineers across Bhubaneswar, Cuttack &amp; Jatni hubs.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {availableCount} Available
            </span>
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              {onDutyCount} On Duty
            </span>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="btn-book-service flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-gold shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Technician</span>
          </button>
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {technicians.map((tech) => {
          const cleanPhone = (tech.phone || '').replace(/\D/g, '');
          const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;

          return (
            <div
              key={tech.id}
              className="p-5 rounded-2xl bg-pageBg/40 border border-accent/20 hover:border-accent shadow-sm transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Hub & Status Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-md">
                    <MapPin className="w-3 h-3" />
                    <span>{tech.city || 'Odisha'}</span>
                  </span>

                  {/* Status Dropdown */}
                  <select
                    value={tech.status}
                    onChange={(e) => handleStatusChange(tech.id, e.target.value)}
                    className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                      tech.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : tech.status === 'On Duty'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                    }`}
                  >
                    <option value="Available">Available</option>
                    <option value="On Duty">On Duty</option>
                    <option value="Off Duty">Off Duty</option>
                  </select>
                </div>

                {/* Name & Specialty */}
                <strong className="font-heading font-extrabold text-base text-primary block group-hover:text-accent transition-colors">
                  {tech.name}
                </strong>
                <span className="text-xs text-textMuted font-medium block mt-0.5">
                  {tech.specialty}
                </span>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs font-semibold text-textMuted mt-3 pt-3 border-t border-gray-200/60">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{tech.completedJobs || 24} jobs done</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{tech.rating || '4.9'}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons Row: Call, WhatsApp, Delete */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200/60">
                <a
                  href={`tel:${tech.phone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-white border border-accent/20 hover:border-accent text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  title="Call Technician"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                    `Hi ${tech.name}, dispatch update from Water Filter Care Head Office.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                  title="WhatsApp Technician"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <button
                  onClick={() => handleDeleteTechnician(tech.id, tech.name)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors"
                  title="Remove Technician"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD TECHNICIAN MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-accent/20">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-pageBg flex items-center justify-center text-textMuted hover:text-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
              Roster Expansion
            </span>
            <h3 className="font-heading text-xl font-bold text-primary mt-2">
              Add New Field Technician
            </h3>
            <p className="text-xs text-textMuted mt-1 mb-5">
              Enter technician details for doorstep assignment across Odisha hubs.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="text-primary block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subhashree Dash"
                  value={newTech.name}
                  onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-primary block mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98610 XXXXX"
                  value={newTech.phone}
                  onChange={(e) => setNewTech({ ...newTech, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-primary block mb-1">City Hub</label>
                  <select
                    value={newTech.city}
                    onChange={(e) => setNewTech({ ...newTech, city: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Cuttack">Cuttack</option>
                    <option value="Jatni">Jatni</option>
                  </select>
                </div>

                <div>
                  <label className="text-primary block mb-1">Initial Status</label>
                  <select
                    value={newTech.status}
                    onChange={(e) => setNewTech({ ...newTech, status: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="Available">Available</option>
                    <option value="On Duty">On Duty</option>
                    <option value="Off Duty">Off Duty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-primary block mb-1">Specialization / Expertise</label>
                <select
                  value={newTech.specialty}
                  onChange={(e) => setNewTech({ ...newTech, specialty: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-accent"
                >
                  <option value="RO Repair & Pump Expert">RO Repair &amp; Pump Expert</option>
                  <option value="Installation & Piping Specialist">Installation &amp; Piping Specialist</option>
                  <option value="Membrane & Filter Master">Membrane &amp; Filter Master</option>
                  <option value="Deep Sanitization & AMC">Deep Sanitization &amp; AMC</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-textMuted font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-book-service flex-1 py-3 rounded-xl font-bold text-xs uppercase shadow-gold"
                >
                  {saving ? 'Adding...' : 'Save Technician'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
