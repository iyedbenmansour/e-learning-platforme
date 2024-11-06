import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import {jwtDecode} from 'jwt-decode';

const Lessons = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      sessionStorage.removeItem("authToken");
      navigate("/first");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserIdFromToken = () => {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
        } catch (err) {
          setError('Error decoding token');
        }
      } else {
        setError('No auth token found');
      }
    };
    fetchUserIdFromToken();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`https://e-learning-platforme.onrender.com/api/lessons/${id}/lessons`);
        setLessons(response.data);
      } catch (err) {
        setError('Error fetching lessons');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [id]);

  useEffect(() => {
    if (userId) {
      const checkEnrollment = async () => {
        try {
          const response = await axios.get(`https://e-learning-platforme.onrender.com/api/enrollments/enrolled/${id}/${userId}`);
          if (response.data && response.data.enrolled !== undefined) {
            setEnrolled(response.data.enrolled);
          } else {
            console.error('Unexpected response format:', response.data);
          }
        } catch (err) {
          console.error('Error checking enrollment status:', err);
          setError('Error checking enrollment status');
        }
      };
      checkEnrollment();
    }
  }, [id, userId]);

  const handleEnroll = async () => {
    try {
      await axios.post(`https://e-learning-platforme.onrender.com/api/enrollments/enroll/${id}`, { userId });
      setEnrolled(true);
    } catch (err) {
      setError('Error enrolling in the course');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Course Details</h1>
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-700">Lessons</h2>
            {!enrolled ? (
              <button
                onClick={handleEnroll}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Enroll
              </button>
            ) : (
              <p className="text-green-600 font-semibold">You are enrolled</p>
            )}
          </div>
          {lessons.length > 0 ? (
            <ul>
              {lessons.map((lesson) => (
                <li key={lesson._id} className="mb-8 p-6 bg-gray-100 rounded-xl shadow-md border border-gray-300">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{lesson.name}</h3>
                  <p className="text-gray-600 mb-2">Description: {lesson.description}</p>
                  <p className="text-gray-600 mb-4">Chapter Number: {lesson.chapterNumber}</p>
                  <div className="flex flex-wrap gap-2">
                    {enrolled && (
                      <>
                        {lesson.file && (
                          <>
                            <a
                              href={`https://e-learning-platforme.onrender.com/api/lessons/file/${lesson._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                            >
                              View File
                            </a>
                           
                          </>
                        )}
                        {lesson.video && (
                          <>
                            <a
                              href={`https://e-learning-platforme.onrender.com/api/videos/${lesson._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                            >
                              View Video
                            </a>
                            <a
                              href={`https://e-learning-platforme.onrender.com/api/videos/download/${lesson._id}`}
                              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                            >
                              Download Video
                            </a>
                          </>
                        )}
                      </>
                    )}
                    {!enrolled && (
                      <p className="text-gray-500">Enroll to access files and videos.</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No lessons available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Lessons;