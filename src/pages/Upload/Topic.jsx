import React from 'react';
import Lesson from './Lesson';

const Topic = ({ topic, topicIndex, courseData, setCourseData, isDisabled, handleDeleteTopic }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedTopics = [...courseData.topics];
        updatedTopics[topicIndex] = { ...updatedTopics[topicIndex], [name]: value };
        setCourseData({ ...courseData, topics: updatedTopics });
    };

    const handleAddLesson = () => {
        const updatedTopics = [...courseData.topics];
        updatedTopics[topicIndex].lessons.push({ lesson_name: '', videoLesson: { video_url: '', upload_Date: '' } });
        setCourseData({ ...courseData, topics: updatedTopics });
    };

    const handleDeleteLesson = (lessonIndex) => {
        const updatedTopics = [...courseData.topics];
        updatedTopics[topicIndex].lessons = updatedTopics[topicIndex].lessons.filter((_, i) => i !== lessonIndex);
        setCourseData({ ...courseData, topics: updatedTopics });
    };

    return (
        <div>
            <div className="mb-4 bg-green-100 p-4 rounded">
                <label className="block text-gray-700 text-3xl font-bold mb-2" htmlFor={`topic_name_${topicIndex}`}>
                    Topic Name
                </label>
                <input
                    type="text"
                    name="topic_name"
                    id={`topic_name_${topicIndex}`}
                    value={topic.topic_name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={isDisabled}
                />
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                    type="button"
                    onClick={() => handleDeleteTopic(topicIndex)}
                    disabled={isDisabled}
                >
                    Delete Topic
                </button>
            </div>
            {topic.lessons.map((lesson, lessonIndex) => (
                <Lesson
                    key={lessonIndex}
                    lesson={lesson}
                    lessonIndex={lessonIndex}
                    topicIndex={topicIndex}
                    courseData={courseData}
                    setCourseData={setCourseData}
                    isDisabled={isDisabled}
                    handleDeleteLesson={handleDeleteLesson}
                />
            ))}
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                type="button"
                onClick={handleAddLesson}
                disabled={isDisabled}
            >
                Add Lesson
            </button>
        </div>
    );
};

export default Topic;
