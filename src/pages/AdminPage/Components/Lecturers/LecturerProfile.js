import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LecturerProfile = () => {
    const { lecturerId } = useParams(); // Fetching lecturerId from URL params
    const [courses, setCourses] = useState([]); // Initialize courses state as an empty array
    const [lecturer, setLecturer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false); // State for isConfirmed checkbox
    const [showApproveButton, setShowApproveButton] = useState(false);

    useEffect(() => {
        const fetchLecturerAndCourses = async () => {
            try {
                const lectureResponse = await axios.get(
                    `https://localhost:7127/api/Lecturer/GetLecturerByID?id=${lecturerId}`,
                );
                setLecturer(lectureResponse.data.value);

                const courseResponse = await axios.get(
                    `https://localhost:7127/api/Courses/CourseOfALecturer?id=${lecturerId}&isConfirmed=${isConfirmed}`,
                );
                console.log(courseResponse.data.value);
                setCourses(courseResponse.data.value);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturerAndCourses();
    }, [lecturerId, isConfirmed]); // Fetch lecturer when lecturerId or isConfirmed changes

    const handleRadioChange = (e) => {
        const isConfirmed = e.target.id === 'flexRadioDefault1';
        setIsConfirmed(isConfirmed);
        setShowApproveButton(!isConfirmed);
    };

    const handleApproveCourse = async (courseId) => {
        try {
            // Call API to approve course
            await axios.put(`https://localhost:7127/api/Courses/ApproveCourse?id=${courseId}`);

            // After successful approval, update the course list
            const courseResponse = await axios.get(
                `https://localhost:7127/api/Courses/CourseOfALecturer?id=${lecturerId}&isConfirmed=${isConfirmed}`,
            );

            setCourses(courseResponse.data.value);
        } catch (error) {
            console.error('Error approving course:', error);
            // Handle error when approving course
        }
    };

    const handleLockCourse = async (courseId) => {
        try {
            // Call API to lock course
            await axios.put(`https://localhost:7127/api/Courses/HideCourseAsync?id=${courseId}`);

            // After successful lock, update the course list
            const courseResponse = await axios.get(
                `https://localhost:7127/api/Courses/CourseOfALecturer?id=${lecturerId}&isConfirmed=${isConfirmed}`,
            );

            setCourses(courseResponse.data.value);
        } catch (error) {
            console.error('Error locking course:', error);
            // Handle error when locking course
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!lecturer) {
        return <div className="no-lecturer">Lecturer not found</div>;
    }

    return (
        <div className="container py-4">
            <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                        First name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        value={lecturer.firstName}
                        required
                        disabled
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">
                        Last name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        value={lecturer.lastName}
                        required
                        disabled
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">
                        Username
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">
                            @
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="validationCustomUsername"
                            value={lecturer.userName}
                            aria-describedby="inputGroupPrepend"
                            required
                            disabled
                        />
                        <div className="invalid-feedback">Please choose a username.</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">
                        Email
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">
                            @
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="validationCustomUsername"
                            value={lecturer.email}
                            aria-describedby="inputGroupPrepend"
                            required
                            disabled
                        />
                        <div className="invalid-feedback">Please choose a username.</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">
                        PhoneNumber
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">
                            @
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="validationCustomUsername"
                            value={lecturer.phoneNumber}
                            aria-describedby="inputGroupPrepend"
                            required
                            disabled
                        />
                        <div className="invalid-feedback">Please choose a username.</div>
                    </div>
                </div>
            </form>
            <div className="col-md-3 d-flex align-items-center justify-content-end">
                {lecturer.isApprove ? (
                    <button
                        className="btn btn-primary"
                        onClick={() => handleApproveLecturer(lecturer.lecturerId)} // Define this handler to approve the lecturer
                    >
                        Approve
                    </button>
                ) : (
                    <button
                        className="btn btn-danger"
                        onClick={() => handleBanLecturer(lecturer.lecturerId)} // Define this handler to ban the lecturer
                    >
                        Ban
                    </button>
                )}
            </div>
            <div className="form-check-group">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={handleRadioChange}
                        checked={isConfirmed}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Confirmed Course
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onChange={handleRadioChange}
                        checked={!isConfirmed}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Not Confirmed Course
                    </label>
                </div>
            </div>

            <h4>Courses:</h4>
            <div className="list-group">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.course_id} className="list-group-item">
                            <div className="row">
                                <div className="col-md-3">
                                    <img src={course.course_Img} alt={course.title} className="img-fluid rounded-0" />
                                </div>
                                <div className="col-md-6">
                                    <h5 className="mb-1">{course.title}</h5>
                                    <p className="mb-1">{course.description}</p>
                                    {course.isPremium && <p className="mb-1">VIP</p>}
                                    <p className="mb-1">Subcriber: {course.subcriber}</p>
                                    {course.isConfirmed ? (
                                        <p className="text-success mb-0">Confirmed</p>
                                    ) : (
                                        <p className="text-warning mb-0">Not Confirmed</p>
                                    )}
                                </div>
                                <div className="col-md-3 d-flex align-items-center justify-content-end">
                                    {showApproveButton ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleApproveCourse(course.course_id)}
                                        >
                                            Approve Course
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleLockCourse(course.course_id)}
                                        >
                                            Hide Course
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-courses alert alert-info" role="alert">
                        No courses found
                    </div>
                )}
            </div>
        </div>
    );
};

export default LecturerProfile;
