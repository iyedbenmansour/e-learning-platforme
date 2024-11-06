const Course = require("../models/course");

exports.uploadCourse = async (req, res) => {
  try {
    const { courseName, description, category, userId } = req.body;
    const courseBanner = req.file;

    if (!courseName || !description || !category || !courseBanner) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCourse = new Course({
      courseName,
      description,
      category,
      userId,
      banner: {
        data: courseBanner.buffer,
        contentType: courseBanner.mimetype
      }
    });

    await newCourse.save();
    res.status(200).json({ message: 'Course published successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCourseBanner = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !course.banner || !course.banner.data) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', course.banner.contentType);
    res.send(course.banner.data);
  } catch (err) {
    res.status(500).send('Server error');
  }
};