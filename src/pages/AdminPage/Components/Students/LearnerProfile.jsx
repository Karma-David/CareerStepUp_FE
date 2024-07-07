import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LearnerProfile = () => {
    const { learnerId } = useParams(); // Fetching learnerId from URL params
    const [courses, setCourses] = useState([]); // Initialize courses state as an empty array
    const [learner, setLearner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLearnerAndCourses = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7127/LearnerDetail?id=${learnerId}`,
                );
                console.log(response.data.value.user);
                console.log(response.data.value.enrolledCourses);
                setLearner(response.data.value.user);
                setCourses(response.data.value.enrolledCourses);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchLearnerAndCourses();
    }, [learnerId]); // Fetch learner when learnerId changes

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!learner) {
        return <div className="no-learner">Learner not found</div>;
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
                        value={learner.firstName}
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
                        value={learner.lastName}
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
                            value={learner.userName}
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
                            value={learner.email}
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
                            value={learner.phoneNumber}
                            aria-describedby="inputGroupPrepend"
                            required
                            disabled
                        />
                        <div className="invalid-feedback">Please choose a username.</div>
                    </div>
                </div>
            </form>

            <h4>Enrolled Courses:</h4>
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

export default LearnerProfile;
