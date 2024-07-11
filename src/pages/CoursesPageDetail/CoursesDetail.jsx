import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CoursesPageDetail.css';
import Button from '@/components/Button';
import { FaGlobe, FaInfinity, FaMinus, FaPlus } from 'react-icons/fa';

function CoursesDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [topicsAndLessons, setTopicsAndLessons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idUser, setIdUser] = useState('');
    const [lecturer, setLecturer] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [expandedTopics, setExpandedTopics] = useState({});

    const CourseAPI = `https://localhost:7127/api/Courses/GetCourseById?id=${id}`;
    const GetTopicAndLessonAPI = `https://localhost:7127/api/Courses/GetCourseByIdIncludeLessons?id=${id}`;
    const GetIDFromEmailAPI = 'https://localhost:7127/GetUserIDfromToken';
    const IsEnrolledAPI = `https://localhost:7127/api/Courses/isEnrolled`;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const getUserID = async () => {
            try {
                const email = localStorage.getItem('lecturerEmai');
                if (!email) {
                    throw new Error('Token not found in local storage');
                }
                const res = await fetch(GetIDFromEmailAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(email), // Sending email as a string
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                if (data.statusCode === 200) {
                    setIdUser(data.value); // Assuming data.value contains the user ID
                } else {
                    throw new Error(`API error! status: ${data.statusCode}`);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setError(error.message);
            }
        };

        getUserID();
    }, [GetIDFromEmailAPI]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const [courseResponse, topicsResponse] = await Promise.all([
                    fetch(CourseAPI),
                    fetch(GetTopicAndLessonAPI),
                ]);

                if (!courseResponse.ok) {
                    throw new Error(`HTTP error! status: ${courseResponse.status}`);
                }
                if (!topicsResponse.ok) {
                    throw new Error(`HTTP error! status: ${topicsResponse.status}`);
                }

                const courseData = await courseResponse.json();
                const topicsData = await topicsResponse.json();

                if (courseData.statusCode === 200) {
                    setCourse(courseData.value);
                } else {
                    throw new Error(`API error! status: ${courseData.statusCode}`);
                }

                if (topicsData.statusCode === 200) {
                    setTopicsAndLessons(topicsData.value);
                } else {
                    throw new Error(`API error! status: ${topicsData.statusCode}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getCourses();
    }, [CourseAPI, GetTopicAndLessonAPI]);

    useEffect(() => {
        const getLecturer = async () => {
            if (idUser) {
                try {
                    const GetLecturerbyID = `https://localhost:7127/api/Lecturer/GetLecturerByID?id=${idUser}`;
                    console.log(`Fetching lecturer with URL: ${GetLecturerbyID}`);
                    const lecturerResponse = await fetch(GetLecturerbyID);
                    if (!lecturerResponse.ok) {
                        throw new Error(`HTTP error! status: ${lecturerResponse.status}`);
                    }
                    const lecturerData = await lecturerResponse.json();
                    if (lecturerData.statusCode === 200) {
                        setLecturer(lecturerData.value);
                    } else {
                        throw new Error(`API error! status: ${lecturerData.statusCode} - ${lecturerData.message}`);
                    }
                } catch (error) {
                    console.error('Error fetching lecturer:', error);

                    setError(error.message);
                }
            }
        };
        getLecturer();
    }, [idUser]);

    useEffect(() => {
        const checkEnrollment = async () => {
            if (idUser) {
                try {
                    const res = await fetch(`${IsEnrolledAPI}?user_id=${idUser}&course_id=${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    const data = await res.json();
                    if (data.statusCode === 200) {
                        setIsEnrolled(data.value);
                        console.log(data.value);
                    } else {
                        throw new Error(`API error! status: ${data.statusCode}`);
                    }
                } catch (error) {
                    console.error('Error checking enrollment status:', error);
                    setError(error.message);
                }
            }
        };

        checkEnrollment();
    }, [idUser, id, IsEnrolledAPI]);

    const handleToggleTopic = (topicId) => {
        setExpandedTopics((prevState) => ({
            ...prevState,
            [topicId]: !prevState[topicId],
        }));
    };

    const renderIcon = (topicId) => {
        return expandedTopics[topicId] ? (
            <FaMinus style={{ color: 'orange' }} />
        ) : (
            <FaPlus style={{ color: 'orange' }} />
        );
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    const handleStartLearn = () => {
        return alert('You need to be logged in');
    };

    return (
        <div className="container-detail">
            <div style={{ width: '60%' }} className="content-detail">
                <div className="header-detail">
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                </div>
                <div className="list-Learn">
                    <div>
                        <h1>Course content</h1>
                    </div>
                    <div>
                        {topicsAndLessons &&
                            topicsAndLessons.topics.map((topic) => (
                                <div key={topic.id}>
                                    <div
                                        style={{
                                            border: '1px solid #b2b2b2',
                                            borderRadius: '5px',
                                            marginTop: '10px',
                                            backgroundColor: 'rgb(243 238 238)',
                                            display: 'flex',
                                        }}
                                    >
                                        <div
                                            onClick={() => handleToggleTopic(topic.id)}
                                            style={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginLeft: '10px',
                                                width: '100%',
                                            }}
                                        >
                                            {renderIcon(topic.id)}
                                            <div>
                                                <h2
                                                    style={{
                                                        marginTop: '10px',
                                                        marginBottom: '10px',
                                                        marginLeft: '10px',
                                                        userSelect: 'none',
                                                    }}
                                                >
                                                    {topic.name}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    {expandedTopics[topic.id] && (
                                        <div style={{ marginTop: '10px', marginLeft: '30px' }}>
                                            {topic.lessons.map((lesson) => (
                                                <div style={{ display: 'flex', padding: '10px 0px' }} key={lesson.id}>
                                                    <div>
                                                        <h4 style={{ userSelect: 'none' }}>{lesson.name}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>

                <div className="requirements">
                    <h2>Course Requirements</h2>
                    <ul>
                        <li>Computer with internet connection (Windows, Ubuntu or MacOS)</li>
                        <li>
                            High sense of self-study, high responsibility, perseverance and not afraid of difficulties
                        </li>
                        <li>Don't be impatient, calmly study and do homework after each lesson</li>
                        <li>
                            You don't need to know anything more, in the course I will show you what you need to know
                        </li>
                    </ul>
                </div>
                <div className="description-lecturer">
                    <h1>Lecturer information</h1>
                    <div className="information-lecturer">
                        {lecturer ? (
                            <img
                                className="img-lecturer"
                                src={
                                    lecturer.avatar_Url ||
                                    'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
                                }
                                alt={lecturer.firstName}
                            />
                        ) : (
                            <p>Loading lecturer information...</p>
                        )}

                        <span>
                            <div className="lecturer-characteristics">
                                {lecturer ? (
                                    <div>
                                        <h4>Name: {lecturer.firstName}</h4>
                                        <a
                                            style={{ color: 'orange', textDecoration: 'none' }}
                                            href={lecturer.certificate}
                                            target=" _blank"
                                        >
                                            View Certificate
                                        </a>
                                    </div>
                                ) : (
                                    <p>Loading lecturer information...</p>
                                )}
                            </div>
                            {/* <a
                             style={{ color: 'red' }}
                             href={lecturerInfo.certificateUrl}
                             target="_blank" // Opens the PDF in a new tab
                             rel="noopener noreferrer" // Security best practice
                         >
                             View certificate
                         </a> */}
                        </span>
                    </div>
                </div>
            </div>
            <div className="image-detail">
                <div className="image-course-detail">
                    <img className="image-detail-course" src={course.course_Img} alt="" />
                </div>
                <div className="box-status-courses">
                    <div className="status-courses">
                        <p>Free</p>
                    </div>
                    <div className="button-start-learn">
                        {isAuthenticated ? (
                            <Button to={`/PageVideoLearn/${id}`}>{isEnrolled ? 'Continue' : 'Learn now'}</Button>
                        ) : (
                            <>
                                <Button to={'/Login'} onClick={handleStartLearn}>
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                    {/* <div className="Course-overview">
                        <ul>
                        {topicsAndLessons && 
                            topicsAndLessons.topics.map((topic) =>(
                                topic.lessons.map((lesson) =>(
                                    <li>{lesson.length}</li>
                                ))
                            ))
                          }
                        </ul>
                    </div> */}
                </div>
                <div className="learn-anytime">
                    <div className="learn-anytime-icon">
                        <FaGlobe size={20} />
                    </div>
                    <div className="learn-anytime-text">
                        <h2>Learn Anytime, Anywhere</h2>
                        <p>Access to the course from any device, at any time.</p>
                    </div>
                </div>
                <div className="learn-anytime forever">
                    <div className="learn-anytime-icon">
                        <FaInfinity size={20} />
                    </div>
                    <div className="learn-anytime-text">
                        <h2>Learn Forever</h2>
                        <p>Lifetime access to the course material.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesDetail;
