import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplets, LogOut, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { authService } from '../../services/authService';

export default function AdminNavbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-primary text-white border-b border-primary-light sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg text-white">Water Filter Care</span>
                <span className="text-[10px] bg-bookBtn text-primary font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/80 border-r border-white/20 pr-4">
              <User className="w-3.5 h-3.5 text-accent-light" />
              <span>{user?.name || 'Administrator'}</span>
              <span className="text-white/40">({user?.email || 'admin@watercare.local'})</span>
            </div>

            {/* Back to Public Site */}
            <Link
              to="/"
              className="text-xs font-bold text-white/90 hover:text-white flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              title="Return to Public Customer Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-200 hover:text-white flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
