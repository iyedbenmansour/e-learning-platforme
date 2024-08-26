const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const mongoose = require("mongoose");
const multer = require('multer'); // Add multer for file handling
const path = require('path'); // Add path for file handling
const jwt = require('jsonwebtoken');

app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you're using HTTPS
}));

app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require("./models/userModels");
const Course = require("./models/course");
const Lesson = require("./models/lessons");
const Enrollment = require("./models/enroll");

require('dotenv').config();
const port = process.env.PORT || 5000;

require("./config/parking.config");

// Use memory storage for multer to handle files in memory
const storage = multer.memoryStorage();

const upload = multer({ storage });


// POST route for user registration
app.post('/register', upload.single('profilePicture'), async (req, res) => {
  try {
    console.log('Received registration request:', req.body);

    const { name, email, phone, password } = req.body;
    const profilePicture = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype
    } : null;

    const newUser = new User({
      name,
      email,
      phone,
      password,
      profilePicture
    });

    await newUser.save();
    console.log('User registered successfully:', newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && password === user.password) { 
      const token = jwt.sign({
        id: user._id,
        role: user.role,
        nom: user.name
      }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });

      res.json({
        token,
        message: "User authenticated successfully"
      });
    } else {
      res.status(401).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



// Fetch a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch user by ID
    if (user) {
      res.status(200).json(user); // Send the user data as JSON
    } else {
      res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

// Route to serve profile picture
app.get('/users/:id/profile-picture', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.profilePicture || !user.profilePicture.data) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', user.profilePicture.contentType);
    res.send(user.profilePicture.data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// Endpoint to handle file upload
app.post('/upload', upload.single('courseBanner'), async (req, res) => {
  try {
    const { courseName, description, category , userId } = req.body;
    const courseBanner = req.file;

    // Validate and process data
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
    console.error('Error uploading course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/coursesa', async (req, res) => {
  try {
    const { creatorId } = req.query;
    let courses;

    if (creatorId) {
      courses = await Course.find({ creatorId });
    } else {
      courses = await Course.find();
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/courses/:id/banner', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !course.banner || !course.banner.data) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', course.banner.contentType);
    res.send(course.banner.data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Server error');
  }
});


app.post('/:courseId/lessons', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description, chapterNumber } = req.body;

    const lesson = new Lesson({
      name,
      description,
      chapterNumber,
      courseId,
      file: req.files['file'] ? {
        data: req.files['file'][0].buffer,
        contentType: req.files['file'][0].mimetype
      } : undefined,
      video: req.files['video'] ? {
        data: req.files['video'][0].buffer,
        contentType: req.files['video'][0].mimetype
      } : undefined,
    });

    await lesson.save();

    res.status(201).json({ message: 'Lesson created successfully', lesson });
  } catch (error) {
    res.status(500).json({ message: 'Error creating lesson', error });
  }
});

app.get('/:courseId/lessons', async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ courseId });

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lessons', error });
  }
});

// Route to serve lesson file
app.get('/file/view/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || !lesson.file) {
      return res.status(404).send('File not found');
    }
    res.set('Content-Type', lesson.file.contentType);
    res.send(lesson.file.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to serve lesson video
app.get('/video/view/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || !lesson.video) {
      return res.status(404).send('Video not found');
    }
    res.set('Content-Type', lesson.video.contentType);
    res.send(lesson.video.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
  
// Route to serve lesson file
app.get('/file/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || !lesson.file) {
      return res.status(404).send('File not found');
    }
    res.set('Content-Type', lesson.file.contentType);
    res.send(lesson.file.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to serve lesson video
app.get('/video/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || !lesson.video) {
      return res.status(404).send('Video not found');
    }
    res.set('Content-Type', lesson.video.contentType);
    res.send(lesson.video.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Enroll in a course
app.post('/api/enrollments/enroll/:courseId', async (req, res) => {
  const { userId } = req.body; // Assume user ID comes from the request body
  const { courseId } = req.params;

  try {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) return res.status(400).json({ error: 'Already enrolled' });

    // Create new enrollment
    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();

    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/enrolled/:courseId/:userId', async (req, res) => {
  try {
    const { courseId, userId } = req.params;
    const user = userId ; 
    const course = courseId;
    const enrollment = await Enrollment.findOne({ course, user });
    if (!enrollment) {
      return res.json({ enrolled: false });
    }
    res.json({ enrolled: true });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Error checking enrollment status' });
  }
});

// Route to get all courses the user is enrolled in
app.get('/enrolled-courses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const enrollments = await Enrollment.find({ user: userId }).populate('course');
    const courses = enrollments.map(enrollment => enrollment.course);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving enrolled courses' });
  }
});




app.listen(port, () => console.log(`Listening on port ${port}`));
