const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL // Replace 'mydatabase' with your database name
const mongoURL = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit process with failure
    }
  };
  
  module.exports = connectDB;