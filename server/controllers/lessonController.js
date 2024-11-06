const Lesson = require("../models/lessons");

exports.createLesson = async (req, res) => {
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
};

exports.getLessons = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ courseId });

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lessons', error });
  }
};

exports.getLessonFile = async (req, res) => {
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
};

exports.getLessonVideo = async (req, res) => {
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
};