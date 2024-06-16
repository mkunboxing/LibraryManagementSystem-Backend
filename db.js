const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected ');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
  