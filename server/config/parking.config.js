const mongoose = require("mongoose");

// MongoDB Atlas connection string (replace <db_password> with the actual password)
const mongoURI = `mongodb+srv://learn:Aeakmi123@learn.bv6p0.mongodb.net/learn?retryWrites=true&w=majority&appName=learn`;

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to learn database on MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
