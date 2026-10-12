import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { authService } from '../services/authService';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminStatCards from '../components/admin/AdminStatCards';
import AdminBookingsTable from '../components/admin/AdminBookingsTable';
import AdminTechniciansList from '../components/admin/AdminTechniciansList';
import AdminPricingEditor from '../components/admin/AdminPricingEditor';
import { Calendar, Users, IndianRupee, UserCheck, RefreshCw } from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    fetchDashboard();
  }, [navigate]);

  const fetchDashboard = async () => {
    try {
      setRefreshing(true);
      const data = await adminService.getDashboard();
      setDashboardData(data);
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleBookingUpdated = (updatedBooking) => {
    setDashboardData((prev) => {
      if (!prev) return prev;
      const updatedBookings = prev.bookings.map((b) =>
        b.id === updatedBooking.id ? updatedBooking : b
      );
      const pendingCount = updatedBookings.filter((b) => b.status === 'Pending').length;
      const completedCount = updatedBookings.filter((b) => b.status === 'Completed').length;
      return {
        ...prev,
        bookings: updatedBookings,
        summary: {
          ...prev.summary,
          pendingBookings: pendingCount,
          completedJobs: completedCount,
        },
      };
    });
  };

  const handleTechniciansUpdated = (newTechniciansList) => {
    setDashboardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        technicians: newTechniciansList,
        summary: {
          ...prev.summary,
          activeTechnicians: newTechniciansList.filter((t) => t.status !== 'Off Duty').length,
        },
      };
    });
  };

  const handlePricingSaved = (newPricing) => {
    setDashboardData((prev) => (prev ? { ...prev, pricing: newPricing } : prev));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pageBg flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-heading font-bold text-primary">Loading Operations Dashboard...</p>
        </div>
      </div>
    );
  }

  const { summary, bookings = [], technicians = [], customers = [], pricing = {} } = dashboardData || {};

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col">
      <AdminNavbar user={{ name: 'Admin Operations', email: 'admin@watercare.local' }} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Header & Refresh Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              Operations Center
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mt-1">
              Field Dispatch & Service Analytics
            </h1>
          </div>

          <button
            onClick={fetchDashboard}
            disabled={refreshing}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-primary/20 text-primary hover:border-accent text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-accent' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>

        {/* Executive Stats Cards */}
        <AdminStatCards summary={summary} />

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-primary text-white shadow-sm'
                : 'text-textMuted hover:text-primary hover:bg-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('technicians')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'technicians'
                ? 'bg-primary text-white shadow-sm'
                : 'text-textMuted hover:text-primary hover:bg-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Technicians ({technicians.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'bg-primary text-white shadow-sm'
                : 'text-textMuted hover:text-primary hover:bg-white'
            }`}
          >
            <IndianRupee className="w-4 h-4" />
            <span>Rate Card & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'customers'
                ? 'bg-primary text-white shadow-sm'
                : 'text-textMuted hover:text-primary hover:bg-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer Registry ({customers.length})</span>
          </button>
        </div>

        {/* Tab Panels */}
        {activeTab === 'bookings' && (
          <AdminBookingsTable
            bookings={bookings}
            technicians={technicians}
            onBookingUpdated={handleBookingUpdated}
          />
        )}

        {activeTab === 'technicians' && (
          <AdminTechniciansList
            technicians={technicians}
            onTechniciansUpdated={handleTechniciansUpdated}
          />
        )}

        {activeTab === 'pricing' && (
          <AdminPricingEditor initialPricing={pricing} onPricingSaved={handlePricingSaved} />
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-6 mb-8 overflow-x-auto">
            <h3 className="font-heading font-extrabold text-xl text-primary mb-4">
              Registered Customer Directory
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-pageBg/60 text-[11px] font-bold text-textMuted uppercase border-b border-primary/10">
                  <th className="py-3 px-4">Customer ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Primary Service</th>
                  <th className="py-3 px-4">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-pageBg/20">
                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-primary">{c.id}</td>
                    <td className="py-3.5 px-4 font-bold text-primary">{c.name}</td>
                    <td className="py-3.5 px-4 text-textMuted">{c.city}</td>
                    <td className="py-3.5 px-4 font-medium text-accent">{c.service}</td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-primary">{c.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
}
