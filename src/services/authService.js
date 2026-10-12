import axiosInstance from './axiosInstance';

export const authService = {
  async login(credentials) {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  async getMe() {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('watercare_token');
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('watercare_token'));
  },
};
