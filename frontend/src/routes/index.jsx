// Route index: define route components and protected route wrappers here.
// This file documents the route architecture for the React app.

import React from 'react';

export const routes = [
  { path: '/', element: 'Home', layout: 'AppLayout' },
  { path: '/login', element: 'Login', layout: 'AuthLayout' },
  { path: '/register', element: 'Register', layout: 'AuthLayout' },
  { path: '/jobs', element: 'Jobs', layout: 'AppLayout' },
  { path: '/jobs/:id', element: 'JobDetails', layout: 'AppLayout' },
  { path: '/profile', element: 'Profile', layout: 'DashboardLayout', protected: true },
  { path: '/dashboard/recruiter', element: 'RecruiterDashboard', layout: 'DashboardLayout', protected: true, role: 'recruiter' },
  { path: '/dashboard/user', element: 'UserDashboard', layout: 'DashboardLayout', protected: true, role: 'jobseeker' },
];

export default routes;
