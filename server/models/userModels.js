const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { 
    data: Buffer, // Store the file data as binary
    contentType: String // Store the file's MIME type
  }
}, { timestamps: true }); // Add this line to enable timestamps

module.exports = mongoose.model('User', userSchema);
