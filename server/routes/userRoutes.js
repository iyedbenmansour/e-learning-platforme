const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register, login, getUserById, getProfilePicture } = require('../controllers/userController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);
router.get('/:id', getUserById);
router.get('/:id/profile-picture', getProfilePicture);

module.exports = router;