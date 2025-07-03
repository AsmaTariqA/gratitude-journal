require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; 
const mongoURL = process.env.MONGO_URI; 

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    
  }
};

connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`GratitudeJournal backend listening at http://localhost:${port}`);
});

