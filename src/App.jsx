import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingDock from './components/FloatingDock';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TdsPage from './pages/TdsPage';
import AmcPage from './pages/AmcPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CoveragePage from './pages/CoveragePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('RO Repair');

  const handleOpenBooking = (serviceName = 'RO Repair') => {
    setSelectedService(serviceName);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-pageBg text-primary font-body">
      {/* 
        ADMIN ROUTE ISOLATION:
        The customer public header, announcement bar, footer, and floating dock 
        are NOT rendered when visiting /admin or /admin/login.
        Furthermore, public navbar has NO Admin links, fulfilling:
        "and me other admin pane not show the publich pagre ok"
      */}
      {!isAdminRoute && (
        <>
          <AnnouncementBar />
          <Navbar onOpenBooking={handleOpenBooking} />
        </>
      )}

      <main className="flex-1">
        <Routes>
          {/* Public Customer Pages */}
          <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
          <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/tds-calculator" element={<TdsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/coverage" element={<CoveragePage onOpenBooking={handleOpenBooking} />} />
          <Route path="/amc-plans" element={<AmcPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/contact" element={<ContactPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/booking" element={<HomePage onOpenBooking={handleOpenBooking} />} />

          {/* Dedicated Secluded Admin Panel */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </main>

      {!isAdminRoute && (
        <>
          <Footer onOpenBooking={handleOpenBooking} />
          <FloatingDock onOpenBooking={handleOpenBooking} />
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={handleCloseBooking}
            preselectedService={selectedService}
          />
        </>
      )}
    </div>
  );
}
