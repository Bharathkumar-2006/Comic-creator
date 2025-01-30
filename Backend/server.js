// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON requests

// Routes
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/comic_creator', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Server listening on port 4000
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
