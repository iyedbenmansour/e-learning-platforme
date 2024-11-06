const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadCourse, getCourses, getCourseBanner } = require('../controllers/courseController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('courseBanner'), uploadCourse);
router.get('/', getCourses);
router.get('/:id/banner', getCourseBanner);

module.exports = router;