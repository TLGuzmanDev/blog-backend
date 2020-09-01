require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const logger = require('morgan');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use('/', (req, res) => {
  res.send('Express App');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on Port ${process.env.PORT}`);
});
