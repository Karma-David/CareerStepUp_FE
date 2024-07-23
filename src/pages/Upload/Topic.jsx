import React from 'react';
import Lesson from './Lesson';

const Topic = ({ topic, topicIndex, courseData, setCourseData, isDisabled }) => {
    const handleAddLesson = () => {
        const updatedTopics = [...courseData.topics];
        if (!updatedTopics[topicIndex].lessons) {
            updatedTopics[topicIndex].lessons = [];
        }

        updatedTopics[topicIndex].lessons.push({
            lesson_name: '',
            VideoLesson: {
                video_url: '',
                upload_Date: '',
            },
            exercises: [],
            videoFile: null,
        });

        setCourseData({ ...courseData, topics: updatedTopics });
    };

    const handleDeleteTopic = () => {
        const updatedTopics = courseData.topics.filter((_, index) => index !== topicIndex);

        setCourseData({ ...courseData, topics: updatedTopics });
    };

    return (
        <div className="mb-4 bg-green-100 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-3xl font-bold mb-2" htmlFor={`topic_name_${topicIndex}`}>
                    Topic Name
                </label>
                <div className="relative group">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max p-2 text-sm2 text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Delete Topic
                    </div>

                    {/* SVG Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-20 h-20 cursor-pointer group-hover:opacity-80 ${isDisabled ? 'hidden' : ''}`}
                        onClick={() => handleDeleteTopic(topicIndex)}
                        style={isDisabled ? { pointerEvents: 'none' } : {}}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </div>
            </div>
            <input
                type="text"
                name="topic_name"
                id={`topic_name_${topicIndex}`}
                value={topic.topic_name}
                disabled={isDisabled}
                onChange={(e) => {
                    const updatedTopics = [...courseData.topics];
                    updatedTopics[topicIndex].topic_name = e.target.value;
                    setCourseData({ ...courseData, topics: updatedTopics });
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            {topic.lessons.map((lesson, lessonIndex) => (
                <Lesson
                    key={lessonIndex}
                    lesson={lesson}
                    lessonIndex={lessonIndex}
                    topicIndex={topicIndex}
                    courseData={courseData}
                    setCourseData={setCourseData}
                    isDisabled={isDisabled}
                />
            ))}
            <div className="relative group inline-flex items-center mt-8">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max p-2 text-sm2 text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add Lesson
                </div>

                {/* SVG Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 cursor-pointer group-hover:opacity-80"
                    onClick={handleAddLesson}
                    style={isDisabled ? { pointerEvents: 'none' } : {}}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Topic;
