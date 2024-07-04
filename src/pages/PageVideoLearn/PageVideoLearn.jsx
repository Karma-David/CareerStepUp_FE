import { useEffect, useState } from 'react';
import './PageVideoLearn.css';

function PageVideoLearn() {
    const CourseUserAPI = 'http://localhost:3000/courses';
    const [Courses, setCourses] = useState([]);
    const [visibleTopics, setVisibleTopics] = useState({});
    const [visibleLessons, setVisibleLessons] = useState({});
    const [selectedVideo, setSelectedVideo] = useState('');

    const toggleVisibility = (id, isTopic) => {
        if (isTopic) {
            setVisibleTopics((prev) => ({ ...prev, [id]: !prev[id] }));
        } else {
            setVisibleLessons((prev) => ({ ...prev, [id]: !prev[id] }));
        }
    };

    const handleLessonClick = (lesson) => {
        setSelectedVideo(lesson.video);
        toggleVisibility(lesson.id, false);
    };

    useEffect(() => {
        GetCourses().then(setCourses);
    }, []);

    const GetCourses = async () => {
        const response = await fetch(CourseUserAPI);
        const data = await response.json();
        return data;
    };

    return (
        <div className="form-learn">
            <div className="body-video">
                <div className="Video-course">
                    <img
                        className="video"
                        src={
                            selectedVideo ||
                            'https://th.bing.com/th/id/OIF.NHASF4BiTqlwrC9qmeTUjg?w=303&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                        }
                        alt="Video thumbnail"
                    />
                </div>
                <div className="description-course">
                    <h1>Description</h1>
                </div>
            </div>
            <div className="list-topic">
                <h1>Description Course</h1>
                <div>
                    {Courses.map((course) => (
                        <div key={course.id}>
                            <h2>{course.course}</h2>
                            {Array.isArray(course.topic) && course.topic.map((topic) => (
                                <div key={topic.id}>
                                    <h3 onClick={() => toggleVisibility(topic.id, true)}>{topic.name}</h3>
                                    {visibleTopics[topic.id] && (
                                        <ul>
                                            {topic.lesson.map((lesson) => (
                                                <li key={lesson.id} onClick={() => handleLessonClick(lesson)}>
                                                    {lesson.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PageVideoLearn;
