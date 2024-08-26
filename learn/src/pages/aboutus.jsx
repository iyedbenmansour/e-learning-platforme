import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/Navbar";

const About = () => {   
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
    <NavBar />
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-9 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            EduVista: Redefining Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering minds, transforming futures through innovative e-learning
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              title: "Innovative Learning",
              description: "Cutting-edge technology meets expert-crafted content.",
              icon: "🚀",
            },
            {
              title: "Global Community",
              description: "Connect with learners worldwide and expand your horizons.",
              icon: "🌍",
            },
            {
              title: "Personalized Growth",
              description: "AI-driven recommendations to accelerate your progress.",
              icon: "📈",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-3xl shadow-xl p-8 transform transition duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <span className="text-6xl mb-4">{item.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-3xl shadow-xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center">
            At EduVista, we're on a mission to democratize education and make high-quality learning accessible to everyone, everywhere. We believe that knowledge is the key to unlocking human potential and driving positive change in the world. Through our innovative platform, we aim to inspire curiosity, foster critical thinking, and empower individuals to pursue lifelong learning.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Impact</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: "1M+", label: "Learners", color: "bg-blue-500" },
              { value: "500+", label: "Courses", color: "bg-green-500" },
              { value: "50+", label: "Countries", color: "bg-purple-500" },
              { value: "98%", label: "Satisfaction", color: "bg-pink-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`${stat.color} rounded-2xl p-8 w-40 h-40 flex flex-col items-center justify-center text-white shadow-lg`}
              >
                <span className="text-4xl font-bold mb-2">{stat.value}</span>
                <span className="text-sm uppercase tracking-wide">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Data Scientist",
                content: "EduVista's AI course completely transformed my career. The practical projects and expert instruction gave me the skills I needed to land my dream job.",
              },
              {
                name: "Michael Chen",
                role: "Entrepreneur",
                content: "As a busy entrepreneur, EduVista's flexible learning options allowed me to upskill at my own pace. The business courses here are world-class!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Emma Watson", role: "Founder & CEO", image: "https://i.pravatar.cc/150?img=1" },
              { name: "John Smith", role: "CTO", image: "https://i.pravatar.cc/150?img=2" },
              { name: "Lisa Chen", role: "Head of Content", image: "https://i.pravatar.cc/150?img=3" },
              { name: "Alex Johnson", role: "Lead Designer", image: "https://i.pravatar.cc/150?img=4" },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-3xl shadow-xl p-6 text-center"
              >
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h4 className="font-semibold text-gray-800 text-xl mb-2">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-3xl shadow-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Learning Revolution</h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience the future of education with EduVista. Start your learning journey today and unlock your full potential.
          </p>
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default About;
