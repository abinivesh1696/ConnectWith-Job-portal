import api from './api.js';

// Company service communicates with backend company endpoints.
export const companyService = {
  createCompany: async (data) => {
    return api.post('/companies', data);
  },
  getCompanies: async (params) => {
    return api.get('/companies', { params });
  },
  getCompany: async (companyId) => {
    return api.get(`/companies/${companyId}`);
  },
  updateCompany: async (companyId, data) => {
    return api.put(`/companies/${companyId}`, data);
  },
  deleteCompany: async (companyId) => {
    return api.delete(`/companies/${companyId}`);
  },
};
