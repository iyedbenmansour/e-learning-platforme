// models/Lesson.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  chapterNumber: {
    type: Number,
    required: true
  },
  file: {
    data: Buffer,   // Binary data for the file
    contentType: String // MIME type of the file (e.g., application/pdf)
  },
  video: {
    data: Buffer,   // Binary data for the video
    contentType: String // MIME type of the video (e.g., video/mp4)
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
