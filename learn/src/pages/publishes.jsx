import React, { useState , useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFile, FaVideo } from 'react-icons/fa';
import NavBar from '../components/Navbar';
import { useLocation , useNavigate } from 'react-router-dom';
import axios from 'axios';

const PublishLessonsPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [chapterNumber, setChapterNumber] = useState('');
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      sessionStorage.removeItem("token");
      navigate("/first");
    } else {
    }
  }, []);

  // Get courseId from the URL query parameter
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const courseId = params.get('courseId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('chapterNumber', chapterNumber);
    formData.append('courseId', courseId);  
    if (file) formData.append('file', file);
    if (video) formData.append('video', video);

    try {
      // Make a POST request to save the lesson
      const response = await axios.post(`https://e-learning-platforme.onrender.com/api/lessons/${courseId}/lessons`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Lesson saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.3 } },
    blur: { scale: 1, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <>
      <NavBar />  
      <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Upload a New Lesson</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                <label htmlFor="name" className="block text-gray-700 mb-2">Lesson Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="Enter lesson name"
                  required
                />
              </motion.div>
              <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="Enter lesson description"
                  rows={4}
                  required
                />
              </motion.div>
              <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                <label htmlFor="chapter-number" className="block text-gray-700 mb-2">Chapter Number</label>
                <input
                  type="number"
                  id="chapter-number"
                  value={chapterNumber}
                  onChange={(e) => setChapterNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="Enter chapter number"
                  required
                />
              </motion.div>
              <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                <label className="block text-gray-700 mb-2">Upload File</label>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col w-full mr-2">
                    <input
                      type="file"
                      accept="application/pdf, application/zip"
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200">
                      <FaFile className="text-gray-500 mr-2" /> Upload File (PDF/ZIP)
                    </label>
                  </div>
                  <div className="flex flex-col w-full ml-2">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200">
                      <FaVideo className="text-gray-500 mr-2" /> Upload Video
                    </label>
                  </div>
                </div>
              </motion.div>
              <motion.button 
                type="submit" 
                className="w-full py-3 bg-gray-800 text-white rounded-lg font-bold text-lg shadow-lg"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                Publish Lesson
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PublishLessonsPage;
  