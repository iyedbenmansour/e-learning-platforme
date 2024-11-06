const express = require('express');
const router = express.Router();
const { enroll, checkEnrollment, getEnrolledCourses } = require('../controllers/enrollmentController');

router.post('/enroll/:courseId', enroll);
router.get('/enrolled/:courseId/:userId', checkEnrollment);
router.get('/enrolled-courses/:userId', getEnrolledCourses);

module.exports = router;