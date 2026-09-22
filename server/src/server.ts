import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import { seedDatabase } from './seed/seedData';
import apiRoutes from './routes/apiRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server & Initialize Database
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 SoundWave Server listening on http://localhost:${PORT}`);
      console.log(`🎵 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start SoundWave server:', error);
    process.exit(1);
  }
};

startServer();
