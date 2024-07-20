import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topic from './Topic';
import { fetchCourseData, getLecturerId, uploadImage } from './api';

const CourseDetailForm = () => {
    const { course_id, action } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        isPremium: false,
        course_Img: '',
        lecturer_id: '',
        topics: [{ topic_name: '', lessons: [] }],

    const [file, setFile] = useState(null);
    const isDisabled = action === '4';

    useEffect(() => {
        const loadCourseData = async () => {
            try {
                const data = await fetchCourseData(course_id);

                const topics = data.topics.map((topic) => {
                    const lessons = topic.lessons.map((lesson) => ({
                        ...lesson,
                        VideoLesson: lesson.VideoLesson || { video_url: '', upload_Date: '' },
                    }));
                    return { ...topic, lessons };
                });

                setCourseData({
                    title: data.title,
                    description: data.description,
                    isPremium: data.isPremium,
                    course_Img: data.course_Img,
                    lecturer_id: data.lecturer_id,
                    topics: topics,
                });
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        if (action === '2' || action === '4') {

            loadCourseData();
        }
    }, [course_id, action]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {

                const response = await axios.post('https://localhost:7127/api/Course2/UploadPhotoForCourse', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const newImageUrl = response.data.value;

                setCourseData((prevData) => ({
                    ...prevData,
                    course_Img: newImageUrl,
                }));
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };

    const handleAddTopic = () => {
        setCourseData({
            ...courseData,
            topics: [...courseData.topics, { topic_name: '', lessons: [] }],
        });
    };

    const handleDeleteTopic = (index) => {
        const updatedTopics = courseData.topics.filter((_, i) => i !== index);
        setCourseData({ ...courseData, topics: updatedTopics });
    };

    const handleSave = async () => {
        try {
            const email = localStorage.getItem('email');
            if (!email) {
                throw new Error('Email not found in local storage');
            }

            const lecturer_id = await getLecturerId(email);

            let courseImgUrl = courseData.course_Img;
            if (file) {
                courseImgUrl = await uploadImage(file);
            }

            const topics = await Promise.all(
                courseData.topics.map(async (topic) => {
                    const lessons = await Promise.all(
                        topic.lessons.map(async (lesson) => {
                            lesson.videoLesson.upload_Date = new Date().toISOString();

                            const { videoFile, VideoLesson, ...lessonWithoutVideoFile } = lesson;
                            return lessonWithoutVideoFile;
                        }),
                    );
                    return { ...topic, lessons };
                }),
            );

            const requestData = {
                ...courseData,
                course_Img: courseImgUrl,
                lecturer_id: lecturer_id,
                topics: topics,
            };

            if (course_id !== '0') {
                requestData.course_id = course_id;
            }

            await axios.post('https://localhost:7127/api/Course2/AddingDataOnCourseClone', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error saving course data:', error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleIsPremiumChange = (e) => {
        setCourseData({ ...courseData, isPremium: e.target.value === 'true' });
    };

    const handleApprove = async () => {
        try {
            await axios.post(
                `https://localhost:7127/api/Course2/InspectChangingOfCourse?course_id=${course_id}&isApprove=true`,
            );
            navigate(-1);
        } catch (error) {
            console.error('Error approving course:', error);
        }
    };

    const handleReject = async () => {
        try {
            await axios.post(
                `https://localhost:7127/api/Course2/InspectChangingOfCourse?course_id=${course_id}&isApprove=false`,
            );
            navigate(-1);
        } catch (error) {
            console.error('Error rejecting course:', error);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 bg-blue-100 p-4 rounded">
                <label className="block text-gray-700 text-4xl font-bold mb-2" htmlFor="title">
                    Course Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={courseData.title}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={isDisabled}

                />
            </div>
            <div className="mb-4 bg-blue-100 p-4 rounded">
                <label className="block text-gray-700 text-3xl font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={courseData.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={isDisabled}

                ></textarea>
            </div>
            <div className="mb-4 bg-blue-100 p-4 rounded">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="isPremiumTrue"
                        name="isPremium"
                        value="true"
                        checked={courseData.isPremium === true}
                        onChange={handleIsPremiumChange}
                        className="mr-2"
                        disabled={isDisabled}

                    />
                    <label htmlFor="isPremiumTrue" className="mr-4">
                        Premium
                    </label>
                    <input
                        type="radio"
                        id="isPremiumFalse"
                        name="isPremium"
                        value="false"
                        checked={courseData.isPremium === false}
                        onChange={handleIsPremiumChange}
                        className="mr-2"
                        disabled={isDisabled}

                    />
                    <label htmlFor="isPremiumFalse">Free</label>
                </div>
            </div>
            <div className="mb-4 bg-blue-100 p-4 rounded flex items-center">
                {courseData.course_Img && (
                    <img
                        src={courseData.course_Img}
                        alt="Course"
                        className="w-fixed-150 h-fixed-150 object-cover mr-4"
                    />
                )}
                <div className="w-full">
                    <label className="block text-gray-700 text-3xl font-bold mb-2" htmlFor="file">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="block w-full text-4sm text-gray-500 file:mr-10 file:py-7 file:px-8 file:rounded-full file:border-0 file:text-1sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={isDisabled}

                    />
                </div>
            </div>

            {courseData.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="mb-4 bg-green-100 p-4 rounded">
                    <Topic
                        topic={topic}
                        topicIndex={topicIndex}
                        courseData={courseData}
                        setCourseData={setCourseData}
                        isDisabled={isDisabled}
                        handleDeleteTopic={handleDeleteTopic}
                    />
                </div>
            ))}
            <div className="flex justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleAddTopic}
                    disabled={isDisabled}
                >
                    Add Topic
                </button>
                {action !== '4' ? (
                    <>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSave}
                            disabled={isDisabled}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleReject}
                        >
                            Reject
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleApprove}
                        >
                            Approve
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default CourseDetailForm;
