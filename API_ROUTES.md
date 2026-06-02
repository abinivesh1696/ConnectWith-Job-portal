# API Routes - ConnectWith

Base path: `/api`

Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login and receive JWT
- `GET  /api/auth/me` - Get current user profile (protected)

Users
- `GET    /api/users/:id` - Get user by id (protected)
- `PUT    /api/users/:id` - Update user profile (protected)

Companies
- `POST   /api/companies` - Create company (recruiter)
- `GET    /api/companies` - List companies
- `GET    /api/companies/:id` - Company details
- `PUT    /api/companies/:id` - Update company (recruiter)
- `DELETE /api/companies/:id` - Delete company (recruiter)

Jobs
- `POST   /api/jobs` - Create job (recruiter)
- `GET    /api/jobs` - List/search jobs
- `GET    /api/jobs/:id` - Job details
- `PUT    /api/jobs/:id` - Update job (recruiter)
- `DELETE /api/jobs/:id` - Delete job (recruiter)

Applications
- `POST   /api/jobs/:id/apply` - Apply to a job (jobseeker)
- `GET    /api/users/:id/applications` - View applied jobs for user
- `GET    /api/jobs/:id/applicants` - View applicants for a job (recruiter)

Notes
- Protected routes require `Authorization: Bearer <token>` header.
- Role checks will be enforced in middleware (recruiter vs jobseeker).
