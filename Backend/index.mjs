import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import connectToMongo from './config/db.mjs';
import authRoutes from './api/auth.mjs';
import noteRoutes from './api/notes.mjs';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// ✅ Apply CORS middleware BEFORE routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow your React app
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB
connectToMongo();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
