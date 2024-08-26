import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const coursesResponse = await axios.get(`http://localhost:5000/courses?creatorId=${userId}`);
        setCourses(coursesResponse.data);

        // Fetch enrolled courses
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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 mt-20">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          {user && (
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4 md:mb-0 md:mr-6">
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
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <div>
                <p className="text-2xl font-semibold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                <p className="text-gray-500 mt-2">Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Courses Created</h2>
            <a
              href="/publish"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Course
            </a>
          </div>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Link to={`/course-details/${course._id}`}>
                    <img
                      src={`http://localhost:5000/courses/${course._id}/banner`}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.src = '/default-course-banner.png';
                      }}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-gray-700 mb-4">{course.description}</p>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-full">
                        {course.category}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No courses created.</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Link to={`/lessons/${course._id}`}>
                    <img
                      src={`http://localhost:5000/courses/${course._id}/banner`}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.src = '/default-course-banner.png';
                      }}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-gray-700 mb-4">{course.description}</p>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-full">
                        {course.category}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Not enrolled in any courses.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
