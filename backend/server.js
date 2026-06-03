import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/users.js';
import companyRoutes from './routes/companies.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';

// Load environment variables from .env file into process.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before handling requests
// Log whether a Mongo URI is available (redact credentials) to aid debugging
const rawMongoUri = process.env.MONGODB_URI;
const redactedUri = rawMongoUri
  ? rawMongoUri.replace(/(mongodb(\+srv)?:\/\/)(.*@)/, '$1****@')
  : null;
console.log('MONGODB_URI set:', !!rawMongoUri, 'Using:', redactedUri || '(none)');

connectDB();

// ====== Middleware ======

// Secure HTTP headers
app.use(helmet());

// Response compression to reduce bandwidth
app.use(compression());

// Enable CORS for API (configure origin in production)
const corsOptions = {
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
};
app.use(cors(corsOptions));

// Parse JSON bodies (req.body)
app.use(express.json());

// Parse urlencoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (development-friendly)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ====== Basic Routes (Step 1) ======

// Health check endpoint for uptime monitoring
app.get('/api/health', (req, res) => {
  return res.status(200).json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Mount authentication routes under /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', applicationRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const staticPath = path.join(__dirname, '../frontend/dist');

  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (env=${process.env.NODE_ENV || 'development'})`);
});
