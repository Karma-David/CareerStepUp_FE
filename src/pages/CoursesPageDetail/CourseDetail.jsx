import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@/components/Button';
import './CoursesPageDetail.css';
import { TiTick } from 'react-icons/ti';

function CourseDetail({
    title,
    description,
    targets,
    imageUrl,
    isAuthenticated,
    buttonText,
    onButtonClick,
    courseOverview,
    lecturerInfo,
}) {
    const { course_id } = useParams(); // Fetch course_id from URL
    const [userId, setUserId] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        console.log(course_id);
        const fetchUserId = async () => {
            try {
                const email = localStorage.getItem('email');
                if (email) {
                    const response = await axios.post('https://localhost:7127/GetUserIDfromToken', { email });
                    setUserId(response.data);
                    console.log(response.data);
                } else {
                    console.error('Email not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId && course_id) {
            const checkEnrollment = async () => {
                try {
                    const response = await axios.get(
                        `https://localhost:7127/api/Courses/isEnrolled?user_id=${userId}&course_id=${course_id}`,
                    );
                    setIsEnrolled(response.data);
                } catch (error) {
                    console.error('Error checking enrollment status:', error);
                }
            };

            checkEnrollment();
        }
    }, [userId, course_id]);

    return (
        <div className="container-detail">
            <div className="content-detail">
                <div className="header-detail">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className="content-target-detail">
                    <h3>What will you learn?</h3>
                    <div className="list-target">
                        <ul>
                            {targets.map((target, index) => (
                                <li key={index}>
                                    <TiTick />
                                    <span>{target}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="description-lecturer">
                    <h1>Thông tin giảng viên</h1>
                    <div className="information-lecturer">
                        <img className="img-lecturer" src={lecturerInfo.imageUrl} alt="Lecturer" />
                        <span>
                            {lecturerInfo.description}
                            <div className="lecturer-characteristics">
                                <ul>
                                    {lecturerInfo.characteristics.map((characteristic, index) => (
                                        <li key={index}>
                                            <TiTick style={{ color: '#f05123' }} />
                                            <span>{characteristic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                style={{ color: 'red' }}
                                href={lecturerInfo.certificateUrl}
                                target="_blank" // Opens the PDF in a new tab
                                rel="noopener noreferrer" // Security best practice
                            >
                                View certificate
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div className="image-detail">
                <div className="image-course-detail">
                    <img className="image-detail-course" src={imageUrl} alt="Course" />
                </div>
                <div className="box-status-courses">
                    <div className="status-courses">
                        <p>Free</p>
                    </div>
                    <div className="button-start-learn">
                        {isAuthenticated ? (
                            <Button to={'/PageVideoLearn'}>{isEnrolled ? 'Continue' : 'Learn'}</Button>
                        ) : (
                            <>
                                <Button to={'/Login'} onClick={onButtonClick}>
                                    {buttonText}
                                </Button>
                            </>
                        )}
                    </div>
                    <div className="Course-overview">
                        <ul>
                            {courseOverview.map((overview, index) => (
                                <li key={index}>
                                    {overview.icon}
                                    <span>{overview.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
