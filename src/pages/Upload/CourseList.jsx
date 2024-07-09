import React, { useState, useEffect } from 'react';
import './Upload.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';

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
                    body: JSON.stringify( email ),
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (data.statusCode === 200) {
                    setUserId(data.value); // Assuming data.value contains the user ID
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
        setEditingCourse(course);
        setNewCourse(course.title);
        setDescription(course.description);
        setPrice(course.price);
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
                    courses.map((course) =>
                        course.course_id === editingCourse.course_id ? updatedCourse : course
                    )
                );
                setEditingCourse(null);
                setNewCourse('');
                setDescription('');
                setPrice(0);
                setFile(null);
            })
            .catch((error) => console.error('Error updating course:', error));
    };

    const handleDeleteCourse = (index) => {
        const courseToDelete = courses[index];
        fetch(`${DeleteCourseAPI}/${courseToDelete.course_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_id: courseToDelete.course_id }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedCourses = [...courses];
                updatedCourses.splice(index, 1);
                setCourses(updatedCourses);
            })
            .catch((error) => console.error('Error deleting course:', error));
    };

    const handleEditCourse = (id) => {
        navigate(`/UpTopic/${id}`);
        console.log('Editing course with ID:', id);
    };

    return (
        <div>
            <div className="list-course-lecturer" style={{ marginLeft: '150px' }}>
                {courses.map((course, index) => (
                    <div key={course.course_id} className="course-item">
                        <div className="name-course">
                            <h3>{course.title}</h3>
                        </div>
                        <div className="button-handle-course">
                            <button onClick={() => handleUpdateCourse(course)}>Update</button>
                            <button onClick={() => handleDeleteCourse(index)}>Delete</button>
                            <button onClick={() => handleEditCourse(course.course_id)}>
                                Edit Topic - Lesson
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {editingCourse && (
                <div className="edit-course">
                    <h1>Update Course</h1>
                    <input
                        type="text"
                        name="newCourse"
                        placeholder="Enter new course title"
                        value={newCourse}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter new course description"
                        value={description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter new course price"
                        value={price}
                        onChange={handleInputChange}
                    />
                    <input type="file" onChange={handleFileChange} />
                    <button style={{ margin: '10px' }} onClick={handleSaveCourse}>
                        Save
                    </button>
                    <button style={{ margin: '10px' }} onClick={() => setEditingCourse(null)}>
                        Cancel
                    </button>
                </div>
            )}
            <div style={{ marginLeft: '615px', marginTop: '30px' }}>
                <Button to="/UpNewCourse">
                    <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faPlus} />
                    <span style={{ margin: '20px' }}>New Course</span>
                </Button>
            </div>
        </div>
    );
};

export default CourseList;
