import api from './api.js';

// Auth service communicates with backend authentication endpoints.
export const authService = {
  register: async ({ name, email, password, role }) => {
    return api.post('/auth/register', { name, email, password, role });
  },
  login: async ({ email, password }) => {
    return api.post('/auth/login', { email, password });
  },
};
