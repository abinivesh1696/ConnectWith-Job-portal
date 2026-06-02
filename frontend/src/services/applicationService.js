import api from './api.js';

// Application service communicates with job application endpoints.
export const applicationService = {
  applyJob: async (jobId, data) => {
    return api.post(`/jobs/${jobId}/apply`, data);
  },
  getUserApplications: async (userId) => {
    return api.get(`/users/${userId}/applications`);
  },
  getJobApplicants: async (jobId) => {
    return api.get(`/jobs/${jobId}/applicants`);
  },
};
