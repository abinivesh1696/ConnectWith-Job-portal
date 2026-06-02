# ConnectWith - Architecture Overview

This document describes the high-level architecture for the ConnectWith job portal.

- Frontend: React (Vite), React Router DOM, Axios
- Backend: Node.js, Express.js
- Database: MongoDB via Mongoose
- Auth: JWT-based authentication
- Roles: `jobseeker`, `recruiter` (and `admin` optional)

Folders
- `frontend/` - React application
- `backend/` - Express API server

Design principles
- Separation of concerns (controllers, services, models)
- Small, focused components on frontend
- API-first design: endpoints mapped to backend controllers
- Secure defaults: JWT, helmet, input validation (to add later)

Frontend skeleton
- `src/assets/` — static assets
- `src/components/common/` — shared UI primitives
- `src/components/auth/` — auth-related widgets
- `src/components/jobs/` — job list/detail UI
- `src/components/company/` — company cards and lists
- `src/components/dashboard/` — dashboard widgets
- `src/pages/` — top-level route pages
- `src/layouts/` — page wrappers for public/auth/dashboard pages
- `src/routes/` — route definitions and protected wrappers
- `src/services/` — API client and service calls
- `src/context/` — global state providers
- `src/hooks/` — reusable hooks
- `src/utils/` — helper functions

Backend skeleton
- `config/` — DB connection and environment config
- `controllers/` — request handlers for each domain
- `middleware/` — auth and role guards
- `models/` — mongoose schemas
- `routes/` — route definitions grouped by resource
- `services/` — business logic and data orchestration
- `utils/` — helpers, logging, responses
