import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListChangingCourse = () => {
    const [courses, setCourses] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses(pageIndex);
    }, [pageIndex]);

    const fetchCourses = async (pageIndex) => {
        try {
            const response = await axios.get(
                `https://localhost:7127/api/Course2/ListChangingOfCourse?pageIndex=${pageIndex}`,
            );
            setCourses(response.data.value.items); // Assuming the API response has a `courses` array and `totalPages` number
            setTotalPages(response.data.value.totalPages);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 1 && newPageIndex <= totalPages) {
            setPageIndex(newPageIndex);
        }
    };

    const handleRedirect = (course_id) => {
        navigate(`/CourseDetailForm/${course_id}/4`);
    };

    return (
        <div className="course-list-container mt-4">
            <div className="course-list-wrapper grid grid-cols-1 gap-4">
                <div className="course-list-container space-y-4">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="relative"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRedirect(course.course_id)}
                        >
                            <div className="course-item bg-white shadow-md rounded p-4">
                                <div className="course-info">
                                    <h3 className="text-xl font-bold">{course.title}</h3>
                                </div>
                                {course.status === 1 && (
                                    <div className="status-adding bg-yellow-100 text-yellow-800 p-2 rounded mt-2">
                                        Adding Request
                                    </div>
                                )}
                                {course.status === 2 && (
                                    <div className="status-updating bg-blue-100 text-blue-800 p-2 rounded mt-2">
                                        Updating Request
                                    </div>
                                )}
                                {course.status === 3 && (
                                    <div className="status-deleting bg-red-100 text-red-800 p-2 rounded mt-2">
                                        Deleting Request
                                    </div>
                                )}
                            </div>
                            <div
                                className={`course-additional-info p-4 rounded shadow-inner mt-2 -mt-4 pt-8`}
                                style={{
                                    backgroundColor: course.isPremium ? '#d1fae5' : '#f3f4f6', // Green for premium, gray for non-premium
                                }}
                            >
                                <div className="course-new-action mt-2 flex items-center">
                                    {course.isPremium ? (
                                        <p className="text-green-500 mr-4">Premium Course!</p>
                                    ) : (
                                        <p className="text-green-500 mr-4">Standard Course!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination text-center mt-4">
                <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 1}>
                    Previous
                </button>
                <span>Page {pageIndex}</span>
                <button onClick={() => handlePageChange(pageIndex + 1)} disabled={pageIndex === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ListChangingCourse;
