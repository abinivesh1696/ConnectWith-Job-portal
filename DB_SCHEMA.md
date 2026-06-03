# Database Schema Design (Mongoose)

Models and important fields (high level):

## User
- `name`: String, required
- `email`: String, required, unique, lowercase
- `password`: String, required (hashed)
- `role`: String, enum ['jobseeker','recruiter','admin'], default 'jobseeker'
- `profile`: Object (bio, location, skills, resume link, experience[])
- `createdAt`, `updatedAt`

## Company
- `name`: String, required
- `slug`: String, unique
- `website`: String
- `description`: String
- `location`: String
- `owner`: ObjectId -> User (recruiter)
- `jobs`: [ObjectId] -> Job
- `createdAt`, `updatedAt`

## Job
- `title`: String, required
- `company`: ObjectId -> Company
- `location`: String
- `type`: String enum ['full-time','part-time','contract','internship']
- `salaryRange`: String or { min, max }
- `description`: String
- `requirements`: [String]
- `postedBy`: ObjectId -> User (recruiter)
- `applications`: [ObjectId] -> Application
- `status`: String enum ['open','closed']
- `createdAt`, `updatedAt`

## Application
- `job`: ObjectId -> Job
- `applicant`: ObjectId -> User
- `coverLetter`: String
- `resumeUrl`: String
- `status`: String enum ['applied','reviewed','interview','rejected','hired']
- `createdAt`, `updatedAt`

Indexes
- Unique index on `User.email`, `Company.slug`.
- Text index on `Job.title` and `Job.description` for search.
