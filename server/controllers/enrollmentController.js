const Enrollment = require("../models/enroll");
const User = require("../models/userModels");
const Course = require("../models/course");

exports.enroll = async (req, res) => {
  const { userId } = req.body;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) return res.status(400).json({ error: 'Already enrolled' });

    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();

    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.checkEnrollment = async (req, res) => {
  try {
    const { courseId, userId } = req.params;
    const enrollment = await Enrollment.findOne({ course: courseId, user: userId });
    res.json({ enrolled: !!enrollment });
  } catch (err) {
    res.status(500).json({ error: 'Error checking enrollment status' });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const enrollments = await Enrollment.find({ user: userId }).populate('course');
    const courses = enrollments.map(enrollment => enrollment.course);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving enrolled courses' });
  }
};