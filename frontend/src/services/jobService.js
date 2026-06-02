import api from './api.js';

// Job service communicates with backend job endpoints.
export const jobService = {
  createJob: async (data) => {
    return api.post('/jobs', data);
  },
  getJobs: async (params) => {
    return api.get('/jobs', { params });
  },
  getJobById: async (jobId) => {
    return api.get(`/jobs/${jobId}`);
  },
  updateJob: async (jobId, data) => {
    return api.put(`/jobs/${jobId}`, data);
  },
  deleteJob: async (jobId) => {
    return api.delete(`/jobs/${jobId}`);
  },
};
