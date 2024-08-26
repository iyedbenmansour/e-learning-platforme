import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [createdCourses, setCreatedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    const fetchUserAndCourses = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(userResponse.data);

        const coursesResponse = await axios.get(`http://localhost:5000/courses`);
        const userCourses = coursesResponse.data.filter(course => course.userId === userId);
        setCreatedCourses(userCourses);

        const enrolledCoursesResponse = await axios.get(`http://localhost:5000/enrolled-courses/${userId}`);
        setEnrolledCourses(enrolledCoursesResponse.data);

      } catch (err) {
        setError('Error fetching user or courses');
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndCourses();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-100"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;
  if (error) return <div className="text-center p-4 text-gray-700 bg-gray-100 h-screen flex items-center justify-center">{error}</div>;

  const CourseCard = ({ course, linkTo }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <Link to={linkTo}>
        <div className="relative h-48">
          <img
            src={`http://localhost:5000/courses/${course._id}/banner`}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/default-course-banner.png';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">View Course</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-full">
            {course.category}
          </span>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4 pt-24">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="relative h-48 md:h-64">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">Profile</h1>
            </div>
          </div>
          {user && (
            <div className="bg-white p-6 md:p-8 -mt-12 md:-mt-16 relative z-10 rounded-t-3xl">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center overflow-hidden mb-4 md:mb-0 md:mr-8 ring-4 ring-white shadow-lg transform hover:scale-105 transition duration-300">
                  {user.profilePicture ? (
                    <img
                      src={`http://localhost:5000/users/${user._id}/profile-picture`}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.src = '/default-profile.png';
                      }}
                    />
                  ) : (
                    <span className="text-4xl text-white">{user.name[0].toUpperCase()}</span>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h2>
                  <p className="text-lg text-gray-600 mb-1">
                    <i className="fas fa-envelope mr-2 text-gray-500"></i>{user.email}
                  </p>
                  <p className="text-lg text-gray-600 mb-1">
                    <i className="fas fa-phone mr-2 text-gray-500"></i>{user.phone}
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    <i className="fas fa-calendar-alt mr-2 text-gray-500"></i>
                    Joined on: {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center">
                  <i className="fas fa-edit mr-2"></i> Edit Profile
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center">
                  <i className="fas fa-cog mr-2"></i> Settings
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="space-x-4">
              <button
                onClick={() => setActiveTab('enrolled')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'enrolled' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Enrolled Courses
              </button>
              <button
                onClick={() => setActiveTab('created')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'created' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Created Courses
              </button>
            </div>
            {activeTab === 'created' && (
              <Link
                to="/publish"
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Add Course
              </Link>
            )}
          </div>

          {activeTab === 'created' ? (
            createdCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdCourses.map((course) => (
                  <CourseCard key={course._id} course={course} linkTo={`/course-details/${course._id}`} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No courses created. Start creating your first course!</p>
            )
          ) : (
            enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course._id} course={course} linkTo={`/lessons/${course._id}`} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Not enrolled in any courses. Explore our course catalog!</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;