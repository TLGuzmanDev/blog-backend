require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const logger = require('morgan');
const cors = require('cors');

const router = require('./routes/api');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use('/api/', router);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on Port ${process.env.PORT}`);
});
