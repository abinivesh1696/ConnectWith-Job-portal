# Frontend Structure & Component Hierarchy

Source: `frontend/src`

Folders
- `assets/` - images, icons, fonts
- `components/` - reusable UI components
  - `common/` - Button, Input, Modal, Spinner, Layout primitives
  - `auth/` - LoginForm, RegisterForm, OAuthButtons
  - `jobs/` - JobCard, JobList, JobFilters, JobSearch
  - `company/` - CompanyCard, CompanyList
  - `dashboard/` - Nav, Sidebar, StatsCard, ApplicationsList
- `pages/` - top-level route pages
  - `Home/`, `Login/`, `Register/`, `Jobs/`, `JobDetails/`, `Profile/`, `RecruiterDashboard/`, `UserDashboard/`
- `layouts/` - AppLayout, AuthLayout, DashboardLayout
- `routes/` - route definitions and protected route wrappers
- `services/` - API wrappers using `axios` (auth, users, jobs, companies, applications)
- `context/` - React Contexts (AuthContext, ToastContext)
- `hooks/` - custom hooks (`useAuth`, `useFetch`, `useDebounce`)
- `utils/` - helpers, validators, formatters

Component hierarchy (example for Jobs page):
- `JobsPage`
  - `JobFilters`
  - `JobSearch`
  - `JobList`
    - `JobCard` (for each job)

Routing (high level)
- `/` -> `Home`
- `/login` -> `Login`
- `/register` -> `Register`
- `/jobs` -> `Jobs`
- `/jobs/:id` -> `JobDetails`
- `/profile` -> `Profile` (protected)
- `/dashboard/recruiter` -> `RecruiterDashboard` (protected, role=recruiter)
- `/dashboard/user` -> `UserDashboard` (protected, role=jobseeker)

State management
- Minimal state with `useState` / `useReducer` for local UI
- `AuthContext` provides `user`, `token`, `login`, `logout`
- Data fetching via `services/api.js` (axios instance)
