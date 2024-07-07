import { useEffect, useState } from 'react';
import './PageVideoLearn.css';
import { useParams } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaPlayCircle } from 'react-icons/fa';

function PageVideoLearn() {
    const { id } = useParams();
    const CourseUserAPI = `https://localhost:7127/api/Courses/GetCourseByIdIncludeLessons?id=${id}`;
    const [course, setCourse] = useState(null);
    const [visibleTopics, setVisibleTopics] = useState({});
    const [selectedVideo, setSelectedVideo] = useState('');

    const toggleVisibility = (id) => {
        setVisibleTopics((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleLessonClick = (lesson) => {
        setSelectedVideo(lesson.videoLesson_URL);
    };

    useEffect(() => {
        const GetCourse = async () => {
            const response = await fetch(CourseUserAPI);
            const data = await response.json();
            setCourse(data.value);
        };

        GetCourse();
    }, [CourseUserAPI]);

    const renderIcon = (id) => {
        return visibleTopics[id] ? (
            <FaChevronDown style={{ color: 'orange', marginLeft: '155px' }} />
        ) : (
            <FaChevronUp style={{ color: 'orange', marginLeft: '155px' }} />
        );
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-learn">
            <div className="body-video">
                <div className="Video-course">
                    <video
                        className="video"
                        src={
                            selectedVideo ||
                            'https://th.bing.com/th/id/OIF.NHASF4BiTqlwrC9qmeTUjg?w=303&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                        }
                        controls
                    />
                </div>
                <div className="description-course">
                    <h1>Description</h1>
                    <p>{course.courseName}</p>
                </div>
            </div>
            <div className="list-topic">
                <h1>Description Course</h1>
                <div>
                    {course.topics.map((topic, index) => (
                        <div key={topic.id}>
                            <div>
                                <h2
                                    style={{
                                        userSelect: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: '20px',
                                        marginBottom: '20px',
                                        marginLeft: '10px',
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
                                        {topic.lessons.map((lesson) => (
                                            <div key={lesson.id} style={{ margin: '20px 0px', display: 'flex' }}>
                                                <FaPlayCircle style={{ marginRight: '10px', color: 'orange' }} />
                                                <h4
                                                    style={{ userSelect: 'none' }}
                                                    onClick={() => handleLessonClick(lesson)}
                                                >
                                                    {lesson.name}
                                                </h4>
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
