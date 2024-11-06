const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const mongoose = require("mongoose");
require('dotenv').config();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/parking.config");

const port = process.env.PORT || 5000;

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));

app.listen(port, () => console.log(`Listening on port ${port}`));