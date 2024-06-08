const express = require("express");
const mongoose = require('mongoose');
const app = express();
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const StudentRoutes = require("./routes/studentRoutes");
const StaffRoutes = require("./routes/staffRoutes");
const InvoiceRoutes = require("./routes/InvoiceRoutes");
const session = require('express-session');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const PORT = process.env.PORT || 8000;
require('./models/user');
require('./service/passport');


const authRoutes = require('./routes/authRoutes');
const requireAuth = require("./middleware/requireAuth");

const corsOptions = {
  origin: ["http://localhost:3000", "https://mk-library-management.vercel.app", "https://library-system-flax.vercel.app"],
  optionsSuccessStatus: 200,
  credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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


// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: false
// }));

app.use(passport.initialize());
// app.use(passport.session());


app.use(express.json());

// app.use(auth(config));


// app.use(checkJwt);



app.use('/auth', authRoutes)
app.use("/students", StudentRoutes);
app.use("/staff", StaffRoutes);
app.use("/invoices", InvoiceRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
module.exports = app;