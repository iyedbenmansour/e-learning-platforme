import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaArrowRight, FaImage, FaGoogle, FaFacebook } from 'react-icons/fa';
import NavBar from '../components/Navbar';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword, profilePicture } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('phone', phone);
    formDataToSend.append('password', password);
    if (profilePicture) formDataToSend.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('https://e-learning-platforme.onrender.com/api/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error registering user');
      console.error(error);
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
          <div className="flex flex-col md:flex-row-reverse">
            <div className="w-full md:w-1/2 bg-cover bg-center p-12 flex flex-col justify-center"
                 style={{backgroundImage: "url('https://source.unsplash.com/random/800x600?minimal')"}}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Join Us Today!</h1>
              <p className="text-lg text-gray-600 mb-8">Create an account and start your journey with us.</p>
              <motion.div 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold flex items-center">
                  Learn More <FaArrowRight className="ml-2" />
                </button>
              </motion.div>

              <div className="my-8 border-t border-gray-300"></div>

              <div className="flex justify-center space-x-4">
                <motion.button 
                  type="button" 
                  className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-gray-100"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
                >
                  <FaGoogle className="text-red-600 mr-2" /> Connect with Google
                </motion.button>
                <motion.button 
                  type="button" 
                  className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-gray-100"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
                >
                  <FaFacebook className="text-blue-600 mr-2" /> Connect with Facebook
                </motion.button>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-12">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <FaUser className="text-gray-400 mx-3"/>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full px-3 py-3 outline-none"
                      placeholder='Enter your name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
                <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <FaEnvelope className="text-gray-400 mx-3"/>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-3 py-3 outline-none"
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
                <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <FaPhone className="text-gray-400 mx-3"/>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="w-full px-3 py-3 outline-none"
                      placeholder='Enter your phone number'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
                <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                  <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <FaLock className="text-gray-400 mx-3"/>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="w-full px-3 py-3 outline-none"
                      placeholder='Enter your password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
                <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <FaLock className="text-gray-400 mx-3"/>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="w-full px-3 py-3 outline-none"
                      placeholder='Confirm your password'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
                <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                  <label htmlFor="profilePicture" className="block text-gray-700 mb-2">Profile Picture</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <FaImage className="text-gray-400 mx-3"/>
                    <input
                      type="file"
                      name="profilePicture"
                      id="profilePicture"
                      className="w-full px-3 py-3 outline-none"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
                <motion.button 
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold flex items-center justify-center w-full"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
                >
                  Register <FaArrowRight className="ml-2" />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
