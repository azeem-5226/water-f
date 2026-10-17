import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Droplets, Lock, Mail, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { authService } from '../services/authService';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login(credentials);
      localStorage.setItem('watercare_token', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pageBg flex flex-col justify-center items-center p-4">
      {/* Back to public link */}
      <div className="w-full max-w-md mb-4">
        <Link
          to="/"
          className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-card border border-accent/20">
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Droplets className="w-7 h-7 text-accent-light" />
          </div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-bookBtn text-primary tracking-wider">
            Protected Staff Area
          </span>
          <h1 className="font-heading text-2xl font-extrabold text-primary mt-2">
            Admin Operations Portal
          </h1>
          <p className="text-xs text-textMuted mt-1">
            Sign in to manage bookings, field technicians, and rates.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-textMuted absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                required
                value={credentials.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white text-sm font-medium focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-textMuted absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-primary/20 bg-pageBg/40 focus:bg-white text-sm font-medium focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
