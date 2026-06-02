# ConnectWith - Job Portal Application

A full-stack MERN application for connecting job seekers with employers.

## Project Structure

```
ConnectWith/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── layouts/          # Layout components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── services/         # API service calls
│   │   ├── context/          # React Context files
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── styles/           # CSS files
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static files
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── package.json          # Frontend dependencies
│   └── .env.example          # Example environment variables
│
├── backend/                  # Node.js + Express backend
│   ├── controllers/          # Request handlers
│   ├── routes/               # API routes
│   ├── models/               # Mongoose models
│   ├── middleware/           # Custom middleware
│   ├── utils/                # Utility functions
│   ├── config/               # Configuration files
│   ├── server.js             # Server entry point
│   ├── package.json          # Backend dependencies
│   └── .env.example          # Example environment variables
│
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ConnectWith
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.example .env.local
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd ../backend
   cp .env.example .env
   npm install
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/connectwith
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Deployment
The backend can serve the built frontend in production. Build the frontend first, then start the backend server in a production environment.

### Production build (manual)
1. Build the frontend
```bash
cd frontend
npm install
npm run build
```
2. Start the backend
```bash
cd ../backend
npm install
npm start
```
3. Open `http://localhost:5000`

### Docker deployment
Build and run the full stack in one container:
```bash
docker build -t connectwith .
docker run -p 5000:5000 --env-file backend/.env connectwith
```

The app will be available at `http://localhost:5000`.

## Features (To Be Implemented)
- [ ] User Authentication
- [ ] Job Listings
- [ ] Job Applications
- [ ] User Profiles
- [ ] Employer Dashboard
- [ ] Job Seeker Dashboard
- [ ] Search and Filter
- [ ] Email Notifications

## Contributing
Please follow best practices and create pull requests for any changes.

## License
ISC
