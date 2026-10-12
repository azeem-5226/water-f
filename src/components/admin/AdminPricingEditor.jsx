import React, { useState } from 'react';
import { IndianRupee, Save, CheckCircle2 } from 'lucide-react';
import { adminService } from '../../services/adminService';

export default function AdminPricingEditor({ initialPricing = {}, onPricingSaved }) {
  const [pricing, setPricing] = useState({
    startingCharge: initialPricing.startingCharge ?? 199,
    installation: initialPricing.installation ?? 1499,
    repair: initialPricing.repair ?? 799,
    maintenance: initialPricing.maintenance ?? 1299,
    amc: initialPricing.amc ?? 2499,
    filterReplacement: initialPricing.filterReplacement ?? 999,
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricing((prev) => ({ ...prev, [name]: Number(value) }));
    setSavedSuccess(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await adminService.updatePricing(pricing);
      setSavedSuccess(true);
      if (onPricingSaved) onPricingSaved(response.pricing);
    } catch (err) {
      alert('Failed to update pricing: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { name: 'startingCharge', label: 'Starting Inspection Charge' },
    { name: 'repair', label: 'Standard RO Repair' },
    { name: 'filterReplacement', label: 'Filter & Membrane Change' },
    { name: 'maintenance', label: 'Periodic Maintenance Service' },
    { name: 'installation', label: 'RO Installation / Setup' },
    { name: 'amc', label: 'Annual AMC Protection Plan' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-extrabold text-xl text-primary">
            Service Rate Card Configuration
          </h3>
          <p className="text-xs text-textMuted mt-0.5">
            Modify baseline standard pricing applied across booking estimates.
          </p>
        </div>
        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Updated Live
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <label className="block text-xs font-bold text-primary uppercase tracking-wider">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-textMuted font-bold text-sm">₹</span>
                <input
                  type="number"
                  name={field.name}
                  value={pricing[field.name]}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white text-sm font-bold text-primary focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="btn-book-service px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Pricing Updates'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
