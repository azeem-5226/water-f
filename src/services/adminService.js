import axiosInstance from './axiosInstance';

export const adminService = {
  async getDashboard() {
    const response = await axiosInstance.get('/admin/dashboard');
    return response.data;
  },

  async getBookings() {
    const response = await axiosInstance.get('/admin/bookings');
    return response.data;
  },

  async updateBookingStatus(id, status) {
    const response = await axiosInstance.patch(`/admin/bookings/${id}/status`, { status });
    return response.data;
  },

  async assignTechnician(id, technicianId) {
    const response = await axiosInstance.patch(`/admin/bookings/${id}/assign`, { technicianId });
    return response.data;
  },

  async sendWhatsAppNotification(id, type = 'technician_assigned', customMessage = '') {
    const response = await axiosInstance.post(`/admin/bookings/${id}/whatsapp`, {
      type,
      customMessage,
    });
    return response.data;
  },

  async getTechnicians() {
    const response = await axiosInstance.get('/admin/technicians');
    return response.data;
  },

  async addTechnician(technicianData) {
    const response = await axiosInstance.post('/admin/technicians', technicianData);
    return response.data;
  },

  async updateTechnicianStatus(id, status) {
    const response = await axiosInstance.patch(`/admin/technicians/${id}/status`, { status });
    return response.data;
  },

  async deleteTechnician(id) {
    const response = await axiosInstance.delete(`/admin/technicians/${id}`);
    return response.data;
  },

  async getCustomers() {
    const response = await axiosInstance.get('/admin/customers');
    return response.data;
  },

  async getPricing() {
    const response = await axiosInstance.get('/admin/pricing');
    return response.data;
  },

  async updatePricing(pricingData) {
    const response = await axiosInstance.put('/admin/pricing', pricingData);
    return response.data;
  },
};
