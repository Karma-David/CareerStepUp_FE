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
                setLessons(data.value);
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
        if (name === 'newTopic') {
            setNewLesson(value || '');
        } else if (name === 'editLesson') {
            setUpdateLesson({ ...updateLesson, lesson_name: value });
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
                    setLessons([...lessons, data]);
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
                    setLessons(
                        lessons.map((lesson) => (lesson.lesson_id === updateLesson.lesson_id ? updatedLesson : lesson)),
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
                setLessons(lessons.filter((lesson) => lesson.lesson_id !== lessonId));
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
                .then((data) => {
                    setEditLesson(null);
                    setVideoFile(null);
                    setVideoName('');
                })
                .catch(() => {
                    alert('Success');
                });
        }
    };

    const handleCancelEdit = () => {
        setEditLesson(null);
        setVideoFile(null);
        setVideoName('');
    };

    return (
        <div>
            <h1>Danh sách bài học</h1>
            <h2 style={{ backgroundColor: 'orangered', color: 'white' }}>Lesson</h2>

            <div className="list-lesson-topic">
                {Array.isArray(lessons) && lessons.length > 0 ? (
                    lessons.map((lesson, index) => (
                        <div key={index} className="lesson-item">
                            <div className="name-lesson">
                                <h2>{lesson.lesson_name}</h2>
                            </div>
                            <div className="button-handle-lesson">
                                <button onClick={() => handleUpdateLesson(lesson)}>Cập nhật</button>
                                <button onClick={() => handleDeleteLesson(lesson.lesson_id)}>Xóa</button>
                                <button onClick={() => handleEditLesson(lesson)}>Chỉnh sửa Bài học</button>
                                <button onClick={() => handleAddExercise(lesson.lesson_id)}>Thêm bài tập</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có bài học nào</p>
                )}
            </div>

            <div style={{ marginTop: '50px' }} className="new-topic-up">
                <div>
                    <h1>New Lesson</h1>
                </div>
                <div className="write-new-topic">
                    <div>
                        <input
                            type="text"
                            name="newTopic"
                            placeholder="Enter lesson name"
                            value={newLesson}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button
                            style={{ height: '50px', marginLeft: '50px', marginTop: '10px', borderRadius: '10px' }}
                            onClick={handleAddLesson}
                        >
                            <FontAwesomeIcon style={{ marginLeft: '10px', marginRight: '10px' }} icon={faPlus} />
                            <span style={{ marginRight: '10px' }}>Add Lesson</span>
                        </button>
                    </div>
                </div>
            </div>

            {updateLesson && (
                <div style={{ marginTop: '50px' }} className="edit-lesson-up">
                    <div>
                        <h1>Edit Lesson</h1>
                    </div>
                    <div className="write-edit-lesson">
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
                        <button style={{ margin: '10px' }} onClick={handleSaveLesson}>
                            Cập nhật bài học
                        </button>
                        <button
                            style={{ margin: '10px' }}
                            onClick={() => {
                                setUpdateLesson(null);
                                setVideoFile(null);
                                setVideoName('');
                            }}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            {editLesson && (
                <div style={{ marginTop: '50px' }} className="edit-lesson-up">
                    <div>
                        <h1>Edit Lesson Video</h1>
                    </div>
                    <div className="write-edit-lesson">
                        <input type="file" name="videoFile" onChange={handleInputChange} />
                        <input
                            type="text"
                            name="videoName"
                            placeholder="Enter video name"
                            value={videoName}
                            onChange={handleInputChange}
                        />
                        <button style={{ margin: '10px' }} onClick={handleSaveVideo}>
                            Cập nhật Video
                        </button>
                        <button style={{ margin: '10px' }} onClick={handleCancelEdit}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            {showExerciseForm && (
                <div>
                    <Exercise lessonsID={editLessonID} />
                </div>
            )}
        </div>
    );
}

export default UpLesson;
