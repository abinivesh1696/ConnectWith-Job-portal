import api from './api.js';

// User service communicates with user profile endpoints.
export const userService = {
  getProfile: async () => {
    return api.get('/auth/me');
  },
  updateProfile: async (userId, data) => {
    return api.put(`/users/${userId}`, data);
  },
};
