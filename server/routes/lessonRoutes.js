const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createLesson, getLessons, getLessonFile, getLessonVideo } = require('../controllers/lessonController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/:courseId/lessons', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), createLesson);

router.get('/:courseId/lessons', getLessons);
router.get('/file/:id', getLessonFile);
router.get('/video/:id', getLessonVideo);

module.exports = router;