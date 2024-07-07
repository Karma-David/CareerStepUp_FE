// CoursesTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { FaTimes } from 'react-icons/fa';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://localhost:7127/api/Courses/GetAllConfirmedCourse');
                if (response.data && Array.isArray(response.data.value)) {
                    setCourses(response.data.value);
                } else {
                    setCourses([]);
                    setError('No courses found');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // const handleApprove = async (courseId) => {
    //     try {
    //         await axios.put(`https://localhost:7127/api/Courses/ApproveCourse?id=${courseId}`);
    //         setCourses(courses.filter((course) => course.course_Id !== courseId));
    //     } catch (error) {
    //         console.error('Error approving course:', error);
    //     }
    // };

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`https://localhost:7127/api/Courses/DeleteCourse?id=${courseId}`);
            setCourses(courses.filter((course) => course.course_Id !== courseId));
        } catch (error) {
            console.error('Error rejecting course:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="table-container">
            <h2>Courses List</h2>
            {courses.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Course_Img</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.course_Id}>
                                <td>{course.title}</td>
                                <td>{course.lecture_id}</td>
                                <td>
                                    <img src={course.course_Img} alt="img" />
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(course.course_Id)} className="reject-btn">
                                        <FaTimes style={{ color: 'red', fontSize: '24px' }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-courses">No courses found</div>
            )}
        </div>
    );
};

export default Course;
