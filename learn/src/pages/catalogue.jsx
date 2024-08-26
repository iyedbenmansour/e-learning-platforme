import NavBar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Programming',
  'Design',
  'Marketing',
  'Business',
  'Finance',
  'Health',
  'Personal Development'
];

const Cour = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Apply filters
    setFilteredCourses(
      courses.filter(course =>
        (nameFilter === '' || course.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (categoryFilter === '' || course.category === categoryFilter)
      )
    );
  }, [nameFilter, categoryFilter, courses]);

  const handleCourseClick = (id) => {
    navigate(`/lessons/${id}`); // Navigate to course details page
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">All Courses</h1>
        <div className="flex flex-col md:flex-row md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <label htmlFor="name-filter" className="block text-gray-700 mb-2">Filter by Name</label>
            <div className="relative">
              <input
                type="text"
                id="name-filter"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
                placeholder="Search by course name"
              />
            </div>
          </div>
          <div className="mb-4 md:mb-0">
            <label htmlFor="category-filter" className="block text-gray-700 mb-2">Filter by Category</label>
            <div className="relative">
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div
                key={course._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleCourseClick(course._id)}
              >
                <img 
                  src={`http://localhost:5000/courses/${course._id}/banner`} 
                  alt={course.name} 
                  className="w-full h-40 object-cover" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">No courses found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cour;
