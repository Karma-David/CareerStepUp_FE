import React, { useState } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

const Lesson = ({ lesson, lessonIndex, topicIndex, courseData, setCourseData }) => {
    const [videoUrl, setVideoUrl] = useState(lesson.videoLesson?.video_url || '');
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddExercise = () => {
        setCourseData((prevCourseData) => {
            const updatedTopics = [...prevCourseData.topics];
            const currentLesson = updatedTopics[topicIndex].lessons[lessonIndex];
            if (!currentLesson.exercises) {
                currentLesson.exercises = [];
            }
            currentLesson.exercises.push({
                question: '',
                answer_A: '',
                answer_B: '',
                answer_C: '',
                answer_D: '',
                answer_True: '',
                score: 0,
            });
            return { ...prevCourseData, topics: updatedTopics };
        });
    };

    const handleVideoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            setErrorMessage('');
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('https://localhost:7127/api/Course2/UploadVideoForCourse', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const newVideoUrl = response.data.value;
                setVideoUrl(newVideoUrl);

                setCourseData((prevCourseData) => {
                    const updatedTopics = [...prevCourseData.topics];
                    const currentLesson = updatedTopics[topicIndex].lessons[lessonIndex];
                    if (!currentLesson.videoLesson) {
                        currentLesson.videoLesson = {};
                    }
                    currentLesson.videoLesson.video_url = newVideoUrl;
                    return { ...prevCourseData, topics: updatedTopics };
                });
            } catch (error) {
                setErrorMessage('Error uploading the video. Please try again.');
                console.error('Error uploading the video:', error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleDeleteLesson = () => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            setCourseData((prevCourseData) => {
                const updatedTopics = [...prevCourseData.topics];
                updatedTopics[topicIndex].lessons.splice(lessonIndex, 1);
                return { ...prevCourseData, topics: updatedTopics };
            });
        }
    };

    return (
        <div className="mb-4 bg-yellow-100 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-2xl font-bold mb-2" htmlFor={`lesson_name_${lessonIndex}`}>
                    Lesson Name
                </label>
                <div className="relative group inline-block ml-4">
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max p-2 text-xs2 text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        Delete Lesson
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 cursor-pointer group-hover:opacity-80 transition-opacity duration-300"
                        onClick={handleDeleteLesson}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
            </div>
            <input
                type="text"
                name="lesson_name"
                id={`lesson_name_${lessonIndex}`}
                value={lesson.lesson_name}
                onChange={(e) => {
                    setCourseData((prevCourseData) => {
                        const updatedTopics = [...prevCourseData.topics];
                        updatedTopics[topicIndex].lessons[lessonIndex].lesson_name = e.target.value;
                        return { ...prevCourseData, topics: updatedTopics };
                    });
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex items-start space-x-6 mt-4">
                <div className="flex-shrink-0">
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            controls
                            className="w-72 h-56 object-cover border border-gray-300 rounded-lg"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="w-72 h-56 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500">
                            No video available
                        </div>
                    )}
                </div>
                <div className="flex-1 ml-4">
                    <label
                        className="block text-gray-700 text-2lg font-bold mb-2"
                        htmlFor={`video_file_${lessonIndex}`}
                    >
                        Upload Video
                    </label>
                    <input
                        type="file"
                        id={`video_file_${lessonIndex}`}
                        onChange={handleVideoChange}
                        disabled={isUploading}
                        className="block w-full text-sm2 text-gray-500 file:mr-4 file:py-7 file:px-8 file:rounded-full file:border-0 file:text-sm2 file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                    />
                    {isUploading && <p className="text-gray-500 mt-2">Uploading...</p>}
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </div>
            </div>

            {lesson.exercises &&
                lesson.exercises.map((exercise, exerciseIndex) => (
                    <Exercise
                        key={exerciseIndex}
                        exercise={exercise}
                        exerciseIndex={exerciseIndex}
                        topicIndex={topicIndex}
                        lessonIndex={lessonIndex}
                        courseData={courseData}
                        setCourseData={setCourseData}
                    />
                ))}
            <div className="relative group inline-block">
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max p-2 text-sm2 text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add Exercise
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer mt-4 group-hover:opacity-80"
                    onClick={handleAddExercise}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>
    );
};

export default Lesson;
