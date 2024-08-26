import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/Navbar';

const CourseDetails = () => {
  const { id } = useParams(); // Extract the course ID from the URL parameters
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${id}/lessons`);
        setLessons(response.data);
      } catch (err) {
        setError('Error fetching lessons');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold mb-6">Course Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Lessons</h2>
            <Link
              to={`/publishes?courseId=${id}`}  // Pass the course ID to the publish page
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Lesson
            </Link>
          </div>
          {lessons.length > 0 ? (
            <ul>
              {lessons.map((lesson) => (
                <li key={lesson._id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-xl font-semibold">{lesson.name}</h3>
                  <p className="text-gray-700 mb-2">Description: {lesson.description}</p>
                  <p className="text-gray-700 mb-4">Chapter Number: {lesson.chapterNumber}</p>
                  {lesson.file && (
                    <div className="flex items-center mb-2">
                      <a
                        href={`http://localhost:5000/file/view/${lesson._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        View File
                      </a>
                      <a
                        href={`http://localhost:5000/file/download/${lesson._id}`}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Download File
                      </a>
                    </div>
                  )}
                  {lesson.video && (
                    <div className="flex items-center mb-2">
                      <a
                        href={`http://localhost:5000/video/view/${lesson._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        View Video
                      </a>
                      <a
                        href={`http://localhost:5000/video/download/${lesson._id}`}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Download Video
                      </a>
                    </div>
                  )}
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

export default CourseDetails;
