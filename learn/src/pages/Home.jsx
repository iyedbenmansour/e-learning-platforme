import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../App.css'; 
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTools,
  FaGlobe,

  FaLaptop,
  FaBook,

  FaGraduationCap,
  FaCertificate,
  FaCode,
  FaPalette,
  FaStar,
} from "react-icons/fa";

import NavBar from "../components/Navbar";

const HomePage = () => {
  const courseItems = [
    {
      title: "Trusted By Learners",
      description: "Connect with like-minded individuals.",
      buttonText: "Enroll Now",
      icon: <FaUserGraduate className="w-12 h-12 text-indigo-500" />,
    },
    {
      title: "Featured Instructors",
      description: "Learn from industry experts.",
      buttonText: "View Profiles",
      icon: <FaChalkboardTeacher className="w-12 h-12 text-pink-500" />,
    },
    {
      title: "Explore Our Platform",
      description: "Cutting-edge learning tools.",
      buttonText: "Learn More",
      icon: <FaTools className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Global Community",
      description: "Connect with learners worldwide.",
      buttonText: "Join Now",
      icon: <FaGlobe className="w-12 h-12 text-green-500" />,
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Software Developer",
      content:
        "This platform has transformed my career. The courses are top-notch and the instructors are amazing!",
    },
    {
      name: "Jane Smith",
      role: "Marketing Specialist",
      content:
        "I've learned so much in such a short time. The flexibility of online learning is perfect for my busy schedule.",
    },
    {
      name: "Mike Johnson",
      role: "Data Scientist",
      content:
        "The quality of content and the community support have exceeded my expectations. Highly recommended!",
    },
  ];

  const AnimatedSection = ({ children }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  const FloatingIcon = ({ icon, delay, top, left }) => {
    return (
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={{ 
          y: [0, -10, 0],
          x: [-5, 5, -5]
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          x: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          delay,
        }}
        className="absolute z-10"
        style={{ top, left }}
      >
        {icon}
      </motion.div>
    );
  };

  return (
    <>
    <NavBar />
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0">
          <img
            src="./bg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-800 opacity-90"></div>
        </div>
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-12 md:mb-0"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Unlock Your Potential with Online Learning
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Discover a world of knowledge and advance your career with our
                cutting-edge courses.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-full transform transition duration-300 ease-in-out"
              >
                Get Started Today
              </motion.button>
            </motion.div>
            <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="md:w-1/2 relative"
>
  <img
    src="./bg.png"
    alt="Online Learning"
    className="rounded-lg"
  />
  <FloatingIcon icon={<FaGraduationCap className="w-12 h-12 text-yellow-400" />} delay={0} top="120%" left="-100%" />
  <FloatingIcon icon={<FaLaptop className="w-12 h-12 text-green-400" />} delay={0.5} top="110%" left="-50%" />
  <FloatingIcon icon={<FaBook className="w-12 h-12 text-red-400" />} delay={1} top="100%" left="0%" />
  <FloatingIcon icon={<FaCode className="w-12 h-12 text-blue-400" />} delay={1.5} top="110%" left="50%" />
  <FloatingIcon icon={<FaPalette className="w-12 h-12 text-pink-400" />} delay={2} top="120%" left="90%" />
</motion.div>
          </div>
        </div>
        <svg
          className="absolute bottom-0 w-full h-24 -mb-1 text-gray-50"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            fill="currentColor"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          ></path>
        </svg>
      </header>

      <AnimatedSection>
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
              Discover Our Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {courseItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300"
                >
                  <div className="p-8">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-center">{item.title}</h3>
                    <p className="text-gray-600 mb-6 text-center">{item.description}</p>
                  </div>
                  <div className="px-8 pb-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                      {item.buttonText}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-4xl font-bold mb-6">
                Unleash Your Potential
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Embark on a journey of discovery with our innovative online
                courses.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600">
                Stay ahead of the curve: Embrace the future of online education.
              </p>
            </div>
            <div className="lg:w-1/2 lg:pl-20">
              <img
                src="./rev.png"
                alt="Online Learning"
                className="rounded-lg "
              />
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
              What Our Learners Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <FaStar className="text-yellow-400 w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold">{testimonial.name}</p>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 mb-8 lg:mb-0"
              >
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Start Learning?
                </h2>
                <p className="text-xl mb-6">
                  Join thousands of students and start your journey today!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full transform transition duration-300 ease-in-out"
                >
                  Sign Up Now
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-1/2 flex justify-center"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: FaGraduationCap,
                      title: "10,000+",
                      subtitle: "Graduates",
                    },
                    { icon: FaBook, title: "500+", subtitle: "Courses" },
                    {
                      icon: FaChalkboardTeacher,
                      title: "100+",
                      subtitle: "Expert Instructors",
                    },
                    {
                      icon: FaCertificate,
                      title: "99%",
                      subtitle: "Satisfaction Rate",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="bg-indigo-500 rounded-lg p-6 text-center shadow-lg"
                    >
                      <item.icon className="w-12 h-12 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

    </div>
    </>
  );
};

export default HomePage;