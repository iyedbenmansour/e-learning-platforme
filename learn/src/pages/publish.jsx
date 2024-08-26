
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaTag } from 'react-icons/fa';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import NavBar from '../components/Navbar';

const categories = [
  'Programming',
  'Design',
  'Marketing',
  'Business',
  'Finance',
  'Health',
  'Personal Development'
];

const PublishPage = () => {
  const [courseName, setCourseName] = useState('');
  const [courseBanner, setCourseBanner] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('userId', userId || '');

    if (courseBanner) {
      formData.append('courseBanner', courseBanner);
    }

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Course published successfully!');
    } catch (error) {
      console.error('Error publishing course:', error);
      alert('Failed to publish course.');
    } finally {
      setIsSubmitting(false);
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create a New Course</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="course-name" className="block text-gray-700 mb-2">Course Name</label>
              <input
                type="text"
                id="course-name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
                placeholder='Enter course name'
                required
              />
            </motion.div>
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="course-banner" className="block text-gray-700 mb-2">Course Banner</label>
              <div className="relative">
                <input
                  type="file"
                  id="course-banner"
                  accept="image/*"
                  onChange={(e) => setCourseBanner(e.target.files ? e.target.files[0] : null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <motion.button 
                  type="button" 
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <FaImage className="text-gray-500 mr-2"/> Choose Banner
                </motion.button>
              </div>
            </motion.div>
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
                placeholder='Enter course description'
                rows={6}
                required
              />
            </motion.div>
            <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
              <label htmlFor="category" className="block text-gray-700 mb-2">Category</label>
              <div className="relative">
                <FaTag className="absolute top-3 left-3 text-gray-400" />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </motion.div>
            <motion.button 
              type="submit" 
              className="w-full py-3 bg-gray-800 text-white rounded-lg font-bold text-lg shadow-lg"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Course'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default PublishPage;
