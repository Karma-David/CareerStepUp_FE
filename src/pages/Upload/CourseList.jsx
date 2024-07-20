import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';
import './Upload.css'; // Your existing CSS file if you need it for other styles

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const CourseLecturerAPI = `https://localhost:7127/api/Courses/CourseOfALecturer?id=${userId}&isConfirmed=${true}`;
    const GetIDFromEmailAPI = 'https://localhost:7127/GetUserIDfromToken';
    const EditCourseAPI = 'https://localhost:7127/api/Courses/EditCourse';
    const DeleteCourseAPI = 'https://localhost:7127/api/Courses/DeleteCourse';

    useEffect(() => {
        const getUserID = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    throw new Error('Email not found in local storage');
                }
                const res = await fetch(GetIDFromEmailAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(email),
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (data.statusCode === 200) {
                    setUserId(data.value); // Assuming data.value contains the user ID
                    // console.log(data.value);
                } else {
                    throw new Error(`API error! status: ${data.statusCode}, message: ${data.message}`);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
        getUserID();
    }, [GetIDFromEmailAPI]);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(CourseLecturerAPI);
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data.value);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [CourseLecturerAPI]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'newCourse':
                setNewCourse(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'price':
                setPrice(value);
                break;
            default:
                break;
        }
    };

    const handleUpdateCourse = (course) => {
        navigate(`/CourseDetailForm/${course.course_id}/2`);
    };

    const handleSaveCourse = () => {
        const updatedCourse = {
            ...editingCourse,
            title: newCourse,
            description,
            price,
            course_Img: file, // Handle file update appropriately
        };

        const formData = new FormData();
        formData.append('LecturerEmail', email);
        formData.append('title', newCourse);
        formData.append('description', description);
        formData.append('price', price);
        if (file) {
            formData.append('course_Img', file);
        }

        fetch(`${EditCourseAPI}/${editingCourse.course_id}`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setCourses(
                    courses.map((course) => (course.course_id === editingCourse.course_id ? updatedCourse : course)),
                );
                setEditingCourse(null);
                setNewCourse('');
                setDescription('');
                setPrice(0);
                setFile(null);
            })
            .catch((error) => console.error('Error updating course:', error));
    };

    // const handleDeleteCourse = (index) => {
    //     const courseToDelete = courses[index];
    //     fetch(`${DeleteCourseAPI}/${courseToDelete.course_id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ course_id: courseToDelete.course_id }),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const updatedCourses = [...courses];
    //             updatedCourses.splice(index, 1);
    //             setCourses(updatedCourses);
    //         })
    //         .catch((error) => console.error('Error deleting course:', error));
    // };

    // const handleEditCourse = (id) => {
    //     navigate(`/UpTopic/${id}`);
    //     console.log('Editing course with ID:', id);
    // };

    return (
        <div className="course-list-wrapper p-4">
            <button
                className="WidthDraw-button bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => navigate('/WithDraw')}
            >
                WidthDraw
            </button>
            <div className="course-list-container mt-4">
                <div className="course-list-wrapper grid grid-cols-1 gap-4">
                    <div className="course-list-container space-y-4">
                        {courses.map((course, index) => (
                            <div key={index} className="relative">
                                <div
                                    style={{ cursor: 'pointer', height: '100px' }}
                                    onClick={() => handleUpdateCourse(course)}
                                    className="course-item bg-white shadow-md rounded p-4"
                                >
                                    <div>
                                        <img
                                            style={{ objectFit: 'contain', height: '100px', width: '150px' }}
                                            src={course.course_Img}
                                            alt={course.title}
                                            className="course-img "
                                        />
                                    </div>
                                    <div className="course-info">
                                        <h3
                                            style={{ marginRight: '450px', fontSize: '40px' }}
                                            className="text-xl font-bold  "
                                        >
                                            {course.title}
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    className={`course-additional-info p-4 rounded shadow-inner mt-2 -mt-4 pt-8`}
                                    style={{
                                        backgroundColor: course.isPremium ? '#d1fae5' : '#f3f4f6', // Green for premium, gray for non-premium
                                    }}
                                >
                                    <div className="course-subscriber">
                                        <p>Subscribers: {course.subcriber}</p>
                                    </div>
                                    <div className="course-new-action mt-2 flex items-center">
                                        {course.isPremium ? (
                                            <p className="text-green-500 mr-4">This is a premium course!</p>
                                        ) : (
                                            <button
                                                // onClick={() => handleGoToPremium(course)}
                                                className="button-go-to-premium bg-yellow-500 text-white px-4 py-2 rounded mr-4"
                                            >
                                                Go to Premium
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {editingCourse && (
                <div className="edit-course-form bg-white shadow-md rounded p-6 mt-4">
                    <h1 className="text-2xl font-bold mb-4">Update Course</h1>
                    <form onSubmit={(e) => e.preventDefault()} className="edit-course-form-content space-y-4">
                        <div className="form-group">
                            <label htmlFor="newCourse" className="block text-gray-700">
                                Course Title:
                            </label>
                            <input
                                id="newCourse"
                                type="text"
                                name="newCourse"
                                placeholder="Enter new course title"
                                value={newCourse}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="block text-gray-700">
                                Description:
                            </label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                placeholder="Enter new course description"
                                value={description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price" className="block text-gray-700">
                                Price:
                            </label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                placeholder="Enter new course price"
                                value={price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file" className="block text-gray-700">
                                Upload Image:
                            </label>
                            <input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="form-actions flex space-x-4">
                            <button
                                type="button"
                                onClick={handleSaveCourse}
                                className="button-save bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingCourse(null)}
                                className="button-cancel bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="new-course-button-container mt-4">
                <Button
                    to="/CourseDetailForm/0/1"
                    className="new-course-button bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    <span>New Course</span>
                </Button>
            </div>
        </div>
    );
};

export default CourseList;
