const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace with your local MongoDB connection string
    await mongoose.connect('mongodb://localhost:27017/comic_creator', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
