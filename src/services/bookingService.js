import axiosInstance from './axiosInstance';

export const bookingService = {
  async createBooking(bookingData) {
    const response = await axiosInstance.post('/bookings', bookingData);
    return response.data;
  },

  async getBookings() {
    const response = await axiosInstance.get('/bookings');
    return response.data;
  },

  async updateBookingStatus(id, status) {
    const response = await axiosInstance.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },
};
