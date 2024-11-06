const User = require("../models/userModels");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const profilePicture = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype
    } : null;

    const newUser = new User({ name, email, phone, password, profilePicture });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && password === user.password) {
      const token = jwt.sign({
        id: user._id,
        role: user.role,
        nom: user.name
      }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });

      res.json({ token, message: "User authenticated successfully" });
    } else {
      res.status(401).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

exports.getProfilePicture = async (req, res) => {
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
};