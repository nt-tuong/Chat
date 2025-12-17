const mongoose = require('mongoose');
const { connectPostgres } = require('./postgres');

// MongoDB connection (for conversations and messages)
const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat', {
      // MongoDB connection options
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Connect both databases
const connectDB = async () => {
  try {
    // Connect to PostgreSQL first (for user data)
    await connectPostgres();
    
    // Then connect to MongoDB (for conversations and messages)
    await connectMongoDB();
    
    console.log('All databases connected successfully');
  } catch (error) {
    console.error('Error connecting to databases:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

