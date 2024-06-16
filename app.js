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
const passport = require('passport');
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

app.use(passport.initialize());
app.use(express.json());

// * Routes
app.use('/auth', authRoutes)
app.use("/students", requireAuth, StudentRoutes);
app.use("/staff", requireAuth,  StaffRoutes);
app.use("/invoices", requireAuth, InvoiceRoutes);

module.exports = app;
