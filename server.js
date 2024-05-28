const express = require('express');
const app = express();
const connectDB = require('./db')
require('dotenv').config();
const cors = require('cors');
const StudentRoutes = require('./routes/studentRoutes');
const StaffRoutes = require('./routes/staffRoutes');
const InvoiceRoutes = require('./routes/InvoiceRoutes');

const corsOptions = {
    origin: ['http://localhost:3000','https://mk-library-management.vercel.app'],
    optionsSuccessStatus: 200,
    credentials: true // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/students', StudentRoutes)
app.use('/staff', StaffRoutes)
app.use('/invoices', InvoiceRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
