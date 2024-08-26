import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import NavBar from '../components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.3 } },
    blur: { scale: 1, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.3 } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token } = response.data;

      // Save token to localStorage or sessionStorage
      sessionStorage.setItem('authToken', token);
      
      // Redirect to another page or update UI accordingly
      window.location.href = '/'; // Example redirect
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row-reverse">
            <div className="w-full md:w-1/2 bg-cover bg-center p-12 flex flex-col justify-center"
                style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600?minimal')" }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h1>
              <p className="text-lg text-gray-600 mb-8">Sign in to your account and continue your journey with us.</p>
              <motion.div 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold flex items-center">
                  Learn More <FaArrowRight className="ml-2" />
                </button>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 p-12">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={inputVariants} whileFocus="focus" animate="blur">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <FaEnvelope className="text-gray-400 mx-3"/>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-3 outline-none"
                      placeholder='Enter your email'
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
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-3 outline-none"
                      placeholder='Enter your password'
                      required
                    />
                  </div>
                </motion.div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <motion.button 
                  type="submit" 
                  className={`w-full py-3 bg-gray-800 text-white rounded-lg font-bold text-lg shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </motion.button>
              </form>
              <p className="text-center mt-8 text-gray-600">
                Don't have an account? <a href="/register" className="text-gray-800 font-bold">Register</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
