const express = require('express');
const app = express();
const connectDB = require('./db')
require('dotenv').config();
const cors = require('cors');
const StudentRoutes = require('./routes/studentRoutes');
const StaffRoutes = require('./routes/staffRoutes');
const InvoiceRoutes = require('./routes/InvoiceRoutes');
const passport = require('passport');
const passportSetup = require('./passport');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth');
const requireAuth = require('./middleware/requireAuth');
const session = require('express-session');



const corsOptions = {
    origin: ['http://localhost:3000','https://mk-library-management.vercel.app'],
    optionsSuccessStatus: 200,
    credentials: true // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(cookieSession({
    name: 'lms-session',
    keys: ['LMS'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//       secure: process.env.NODE_ENV === 'production', // use HTTPS in production
//       httpOnly: true,
//       sameSite: 'none'
//   }
// }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/auth', authRoutes)
app.use('/students', requireAuth, StudentRoutes)
app.use('/staff', requireAuth, StaffRoutes)
app.use('/invoices', requireAuth, InvoiceRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
