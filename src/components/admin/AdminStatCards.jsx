import React from 'react';
import { Calendar, Clock, CheckCircle2, Users, IndianRupee } from 'lucide-react';

export default function AdminStatCards({ summary }) {
  const cards = [
    {
      label: 'Total Bookings',
      value: summary?.totalBookings ?? 0,
      icon: Calendar,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Pending Requests',
      value: summary?.pendingBookings ?? 0,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
    {
      label: 'Completed Jobs',
      value: summary?.completedJobs ?? 0,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      label: 'Active Technicians',
      value: summary?.activeTechnicians ?? 0,
      icon: Users,
      color: 'text-accent',
      bg: 'bg-accent/15',
    },
    {
      label: 'Monthly Revenue',
      value: `₹${(summary?.monthlyRevenue ?? 18450).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 border border-primary/10 shadow-sm flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-textMuted uppercase tracking-wider block">
                {card.label}
              </span>
              <strong className="font-heading text-xl font-extrabold text-primary">
                {card.value}
              </strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}
