import { useEffect, useState, useRef, useCallback } from 'react';
import './PageVideoLearn.css';
import { useParams } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaPlayCircle } from 'react-icons/fa';
import { CiLock } from 'react-icons/ci';
import Comment from './Comment';
import Exer from './Exer';

function PageVideoLearn() {
    const { id } = useParams();
    const CourseUserAPI = `https://localhost:7127/api/Courses/GetCourseByIdIncludeLessons?id=${id}`;
    const GetIDFromEmailAPI = 'https://localhost:7127/GetUserIDfromToken';
    const [course, setCourse] = useState(null);
    const [visibleTopics, setVisibleTopics] = useState({});
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [unlockedLessons, setUnlockedLessons] = useState({});
    const [showExercise, setShowExercise] = useState(false);
    const [showExerciseForLesson, setShowExerciseForLesson] = useState(null);
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const getUserID = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    throw new Error('Email not found in local storage');
                }
                const res = await fetch(GetIDFromEmailAPI, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(email),
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (data.statusCode === 200) {
                    setUserId(data.value);
                } else {
                    throw new Error(`API error! status: ${data.statusCode}, message: ${data.message}`);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setError(error.message);
            }
        };
        getUserID();
    }, [GetIDFromEmailAPI]);

    useEffect(() => {
        const GetCourse = async () => {
            try {
                const response = await fetch(CourseUserAPI);
                const data = await response.json();
                setCourse(data.value);
                const storedUnlockedLessons = JSON.parse(localStorage.getItem(`${userId}-unlockedLessons`)) || [];
                const initialUnlockedLessons = { [data.value.topics[0].lessons[0].id]: true };
                storedUnlockedLessons.forEach((lessonId) => {
                    initialUnlockedLessons[lessonId] = true;
                });
                setUnlockedLessons(initialUnlockedLessons);
                if (data.value.topics.length > 0 && data.value.topics[0].lessons.length > 0) {
                    setSelectedVideo(data.value.topics[0].lessons[0].videoLesson_URL);
                    setSelectedLessonId(data.value.topics[0].lessons[0].id);
                }
            } catch (error) {
                console.error('Error fetching course:', error);
                setError(error.message);
            }
        };

        if (userId) {
            GetCourse();
        }
    }, [CourseUserAPI, userId]);

    const toggleVisibility = (id) => {
        setVisibleTopics((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleLessonClick = (lesson) => {
        if (unlockedLessons[lesson.id]) {
            setSelectedVideo(lesson.videoLesson_URL);
            setSelectedLessonId(lesson.id);
            setShowExercise(false);
            setShowExerciseForLesson(null);
        }
    };

    const unlockNextLesson = useCallback(() => {
        let nextLessonId = null;

        for (let i = 0; i < course.topics.length; i++) {
            const lessons = course.topics[i].lessons;
            for (let j = 0; j < lessons.length; j++) {
                if (lessons[j].id === selectedLessonId) {
                    if (j + 1 < lessons.length) {
                        nextLessonId = lessons[j + 1].id;
                    } else if (i + 1 < course.topics.length) {
                        nextLessonId = course.topics[i + 1].lessons[0].id;
                    }
                    break;
                }
            }
            if (nextLessonId) break;
        }

        if (nextLessonId) {
            setUnlockedLessons((prev) => {
                const updated = { ...prev, [nextLessonId]: true };
                localStorage.setItem(`${userId}-unlockedLessons`, JSON.stringify(Object.keys(updated)));
                return updated;
            });
        }
    }, [course, selectedLessonId, userId]);

    const handleExerciseComplete = () => {
        unlockNextLesson();
        let nextLessonId = null;
        for (let i = 0; i < course.topics.length; i++) {
            const lessons = course.topics[i].lessons;
            for (let j = 0; j < lessons.length; j++) {
                if (lessons[j].id === selectedLessonId) {
                    if (j + 1 < lessons.length) {
                        nextLessonId = lessons[j + 1].id;
                    } else if (i + 1 < course.topics.length) {
                        nextLessonId = course.topics[i + 1].lessons[0].id;
                    }
                    break;
                }
            }
            if (nextLessonId) break;
        }

        if (nextLessonId) {
            const nextLesson = course.topics
                .flatMap((topic) => topic.lessons)
                .find((lesson) => lesson.id === nextLessonId);
            if (nextLesson) {
                setSelectedVideo(nextLesson.videoLesson_URL);
                setSelectedLessonId(nextLesson.id);
            }
        }

        setShowExercise(false);
        setShowExerciseForLesson(null);
    };

    const handleExerciseClick = (lessonId) => {
        setShowExercise(true);
        setShowExerciseForLesson(lessonId);
    };

    useEffect(() => {
        if (videoRef.current && selectedVideo) {
            videoRef.current.load();
            setVideoReady(false); // Reset ready state before loading
        }
    }, [selectedVideo]);

    const handleVideoLoaded = () => {
        setVideoReady(true);
    };

    const handleVideoError = () => {
        console.error('Error loading video');
        setVideoReady(false);
    };

    const renderIcon = (id) => {
        return visibleTopics[id] ? (
            <FaChevronDown style={{ color: 'orange' }} />
        ) : (
            <FaChevronUp style={{ color: 'orange' }} />
        );
    };

    if (!course) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <h1>Error: {error}</h1>;
    }
    return (
        <div className="form-learn">
            <div className="body-video">
                <div className="Video-course">
                    {showExercise && showExerciseForLesson === selectedLessonId ? (
                        <Exer onComplete={handleExerciseComplete} lessonID={selectedLessonId} UserID ={userId} />
                    ) : (
                        <div>
                            {!videoReady && <p>Loading video...</p>}
                            <video
                                ref={videoRef}
                                className="video"
                                src={selectedVideo || 'fallback-video-url.mp4'}
                                controls
                                onLoadedData={handleVideoLoaded}
                                onError={handleVideoError}
                            />
                        </div>
                    )}
                </div>
                <div className="description-course">
                    <Comment lessonID={selectedLessonId} />
                </div>
            </div>
            <div className="list-topic">
                <h1>Description Course</h1>
                <div>
                    {course.topics.map((topic, index) => (
                        <div key={topic.id}>
                            <div style={{ backgroundColor: '#f7f8fa' }}>
                                <h2
                                    style={{
                                        userSelect: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '5px',
                                        marginLeft: '10px',
                                        borderBottom: '1px solid #dedfe0',
                                        height: '40px',
                                    }}
                                    onClick={() => toggleVisibility(topic.id)}
                                >
                                    {index + 1}.{topic.name}
                                    {renderIcon(topic.id)}
                                </h2>
                            </div>
                            <div>
                                {visibleTopics[topic.id] && (
                                    <div style={{ marginTop: '10px', marginLeft: '30px' }}>
                                        {topic.lessons.map((lesson, index) => (
                                            <div key={lesson.id}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        height: '50px',
                                                        backgroundColor:
                                                            lesson.id === selectedLessonId
                                                                ? '#f0512333'
                                                                : 'transparent',
                                                    }}
                                                >
                                                    <FaPlayCircle
                                                        style={{
                                                            marginRight: '10px',
                                                            color: 'orange',
                                                            marginTop: '10px',
                                                        }}
                                                    />
                                                    <h4
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            userSelect: 'none',
                                                            marginTop: '10px',
                                                            width: '100%',
                                                            color: unlockedLessons[lesson.id] ? 'black' : 'gray',
                                                            pointerEvents: unlockedLessons[lesson.id] ? 'auto' : 'none',
                                                        }}
                                                        onClick={() => handleLessonClick(lesson)}
                                                    >
                                                        {index + 1}.{lesson.name}
                                                        {!unlockedLessons[lesson.id] && <CiLock />}
                                                    </h4>
                                                </div>
                                                <div
                                                    style={{
                                                        marginLeft: '40px',
                                                        marginBottom: '10px',
                                                        cursor: 'pointer',
                                                        color: 'blue',
                                                    }}
                                                    onClick={() => handleExerciseClick(lesson.id)}
                                                >
                                                    Bài tập
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PageVideoLearn;