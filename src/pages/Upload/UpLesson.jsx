import React, { useEffect, useState } from 'react';
import './Uplesson.css';
import Exercise from './Exer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function UpLesson({ topicId }) {
    const [lessons, setLessons] = useState([]);
    const [newLesson, setNewLesson] = useState('');
    const [updateLesson, setUpdateLesson] = useState(null);
    const [editLesson, setEditLesson] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [videoName, setVideoName] = useState('');
    const [editLessonID, setEditLessonID] = useState(null);
    const [showExerciseForm, setShowExerciseForm] = useState(false);

    const createLessonAPI = `https://localhost:7127/api/Lesson/CreateLesson?topic_id=${topicId}`;

    useEffect(() => {
        const getLessons = async () => {
            const lessonAPI = `https://localhost:7127/api/Lesson/GetLessonByTopic?Topic_id=${topicId}`;
            try {
                const response = await fetch(lessonAPI);
                const data = await response.json();
                setLessons(data.value || []);
            } catch (error) {
                console.error('Lỗi khi lấy bài học:', error);
                setLessons([]);
            }
        };

        getLessons();
    }, [topicId]);

    const handleAddExercise = (lessonID) => {
        setEditLessonID(lessonID);
        setShowExerciseForm((prevState) => !prevState); // Toggle form visibility
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'newLesson') {
            setNewLesson(value || '');
        } else if (name === 'editLesson') {
            setUpdateLesson((prev) => ({
                ...prev,
                lesson_name: value,
            }));
        } else if (name === 'videoFile') {
            setVideoFile(files[0]);
        } else if (name === 'videoName') {
            setVideoName(value);
        }
    };

    const handleAddLesson = () => {
        if (newLesson.trim() !== '') {
            fetch(createLessonAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lesson_name: newLesson }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to add new lesson');
                    }
                    return response.json();
                })
                .then((data) => {
                    setLessons((prevLessons) => [...prevLessons, data]);
                    setNewLesson('');
                })
                .catch((error) => {
                    console.error('Error adding new lesson:', error);
                });
        }
    };

    const handleUpdateLesson = (lesson) => {
        setUpdateLesson(lesson);
        setEditLesson(null);
        setVideoFile(null);
        setVideoName('');
    };

    const handleSaveLesson = () => {
        if (updateLesson) {
            const editLessonAPI = `https://localhost:7127/api/Lesson/PutLesson?id=${updateLesson.lesson_id}`;
            const formData = new FormData();
            formData.append('Lesson_id', updateLesson.lesson_id);
            formData.append('lesson_name', updateLesson.lesson_name);
            if (videoFile && videoName.trim() !== '') {
                formData.append('video', videoFile);
                formData.append('Video_name', videoName);
            }

            fetch(editLessonAPI, {
                method: 'PUT',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to update lesson');
                    }
                    return response.json();
                })
                .then((data) => {
                    const updatedLesson = data;
                    setLessons((prevLessons) =>
                        prevLessons.map((lesson) =>
                            lesson.lesson_id === updateLesson.lesson_id ? updatedLesson : lesson,
                        ),
                    );
                    setUpdateLesson(null);
                    setVideoFile(null);
                    setVideoName('');
                })
                .catch((error) => {
                    console.error('Error updating lesson:', error);
                });
        }
    };

    const handleDeleteLesson = (lessonId) => {
        const deleteLessonAPI = `https://localhost:7127/api/Lesson/DeleteLesson?id=${lessonId}`;
        fetch(deleteLessonAPI, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete lesson');
                }
                setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.lesson_id !== lessonId));
            })
            .catch((error) => {
                console.error('Error deleting lesson:', error);
            });
    };

    const handleEditLesson = (lesson) => {
        setEditLesson(lesson);
        setUpdateLesson(null);
        setVideoFile(null);
        setVideoName('');
    };

    const handleSaveVideo = () => {
        if (editLesson && videoFile && videoName.trim() !== '') {
            const videoAPI = `https://localhost:7127/api/VideoLesson/CreateVideoLesson`;
            const formData = new FormData();
            formData.append('Video_url', videoFile);
            formData.append('Video_name', videoName);
            formData.append('Lesson_id', editLesson.lesson_id);

            fetch(videoAPI, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to add video');
                    }
                    return response.json();
                })
                .then(() => {
                    setEditLesson(null);
                    setVideoFile(null);
                    setVideoName('');
                })
                .catch((error) => {
                    console.error('Error adding video:', error);
                });
        }
    };

    const handleCancelEdit = () => {
        setEditLesson(null);
        setVideoFile(null);
        setVideoName('');
    };

    return (
        <div className="uplesson-container">
            <h1 className="page-title">Danh sách bài học</h1>
            <h2 className="section-title">Lesson</h2>

            <div className="list-lesson-topic">
                {Array.isArray(lessons) && lessons.length > 0 ? (
                    <table className="lesson-table">
                        <thead>
                            <tr>
                                <th>Lesson Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson) => (
                                <tr key={lesson.lesson_id}>
                                    <td>{lesson.lesson_name}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => handleUpdateLesson(lesson)}>Cập nhật</button>
                                        <button onClick={() => handleDeleteLesson(lesson.lesson_id)}>Xóa</button>
                                        <button onClick={() => handleEditLesson(lesson)}>Chỉnh sửa Bài học</button>
                                        <button onClick={() => handleAddExercise(lesson.lesson_id)}>
                                            Thêm bài tập
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không có bài học nào</p>
                )}
            </div>

            <div className="new-lesson-container">
                <h2 className="section-title">New Lesson</h2>
                <div className="write-new-lesson">
                    <input
                        type="text"
                        name="newLesson"
                        placeholder="Enter lesson name"
                        value={newLesson}
                        onChange={handleInputChange}
                    />
                    <button className="add-lesson-button" onClick={handleAddLesson}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add Lesson</span>
                    </button>
                </div>
            </div>

            {updateLesson && (
                <div className="edit-lesson-container">
                    <h2 className="section-title">Edit Lesson</h2>
                    <div className="edit-lesson-form">
                        <input
                            type="text"
                            name="editLesson"
                            placeholder="Enter lesson name"
                            value={updateLesson.lesson_name}
                            onChange={handleInputChange}
                        />
                        <input type="file" name="videoFile" onChange={handleInputChange} />
                        <input
                            type="text"
                            name="videoName"
                            placeholder="Enter video name"
                            value={videoName}
                            onChange={handleInputChange}
                        />
                        <button className="save-lesson-button" onClick={handleSaveLesson}>
                            Cập nhật bài học
                        </button>
                        <button className="cancel-lesson-button" onClick={handleCancelEdit}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            {editLesson && (
                <div className="edit-lesson-video-container">
                    <h2 className="section-title">Edit Lesson Video</h2>
                    <div className="edit-video-form">
                        <input type="file" name="videoFile" onChange={handleInputChange} />
                        <input
                            type="text"
                            name="videoName"
                            placeholder="Enter video name"
                            value={videoName}
                            onChange={handleInputChange}
                        />
                        <button className="save-video-button" onClick={handleSaveVideo}>
                            Thêm Video
                        </button>
                        <button className="cancel-video-button" onClick={handleCancelEdit}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            {showExerciseForm && <Exercise lessonsID={editLessonID} />}
        </div>
    );
}

export default UpLesson;
