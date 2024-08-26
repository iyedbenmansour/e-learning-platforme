const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({

  userId : {
    type: String,
  },
 
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  banner: {
    data: Buffer, // Store the file data as binary
    contentType: String // Store the file's MIME type
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Programming',
      'Design',
      'Marketing',
      'Business',
      'Finance',
      'Health',
      'Personal Development'
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  
  },
  
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
