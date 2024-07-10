import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpTopic.css';
import UpLesson from './UpLesson';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function UpTopic() {
    const { id } = useParams(); // Lấy ID khóa học từ URL
    const TopicUserAPI = `https://localhost:7127/api/Courses/GetCourseByIdIncludeLessons/?id=${id}`;
    const CreateTopicAPI = `https://localhost:7127/api/Topic/${id}`;
    const EditTopicAPI = `https://localhost:7127/api/Topic`;
    const DeleteTopicAPI = `https://localhost:7127/api/Topic`;
    const [topics, setTopics] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [editingTopicId, setEditingTopicId] = useState(null); // Trạng thái để theo dõi ID của topic đang chỉnh sửa
    const [newTopic, setNewTopic] = useState('');
    const [editTopic, setEditTopic] = useState(null);

    useEffect(() => {
        const getTopic = async () => {
            try {
                const response = await fetch(TopicUserAPI);
                const data = await response.json();
                if (data && data.value) {
                    setTopics(data.value.topics || []);
                    setCourseName(data.value.courseName || '');
                }
            } catch (error) {
                console.error('Lỗi khi lấy khóa học:', error);
            }
        };

        getTopic(); // Initial fetch
    }, [id, TopicUserAPI]);

    const handleEditLesson = (topicId) => {
        setEditingTopicId(topicId); // Đặt ID của topic đang được chỉnh sửa
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newTopic') {
            setNewTopic(value || '');
        }
    };

    const handleAddTopic = () => {
        if (!courseName) {
            alert('Please add a course first.');
            return;
        }

        if (newTopic.trim() !== '') {
            fetch(CreateTopicAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic_Name: newTopic }), // Assuming TopicForm structure
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to add new topic');
                    }
                    return response.json();
                })
                .then((data) => {
                    setNewTopic('');
                    setTopics((prevTopics) => [...prevTopics, data]); // Add new topic to the state
                })
                .catch((error) => {
                    console.error('Error adding new topic:', error);
                });
        }
    };

    const handleUpdateTopic = (topic) => {
        setEditTopic(topic);
        setNewTopic(topic.topic_Name);
    };

    const handleSaveTopic = () => {
        if (editTopic) {
            const updatedTopic = {
                ...editTopic,
                topic_Name: newTopic,
            };

            fetch(`${EditTopicAPI}/${editTopic.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTopic),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    setTopics(topics.map((t) => (t.id === editTopic.id ? updatedTopic : t)));
                    setEditTopic(null);
                    setNewTopic('');
                    alert('Edit successfully');
                })
                .catch((error) => console.error('Error updating topic:', error));
        }
    };

    const handleDeleteCourse = (index) => {
        const topicToDelete = topics[index];
        fetch(`${DeleteTopicAPI}/${topicToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic_Id: topicToDelete.id }), // Thay đổi tên key thành topic_Id
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedTopics = [...topics];
                updatedTopics.splice(index, 1);
                setTopics(updatedTopics);
            })
            .catch((error) => console.error('Error deleting topic:', error));
    };

    useEffect(() => {
        console.log('Topics updated, re-rendering UpTopic');
    }, [topics]);

    return (
        <div className="up-topic-container">
            <h1 className="course-name">Course Name: {courseName}</h1>
            <h2 className="topic-header">Topic</h2>
            <div className="list-topic-course">
                {topics.map((topic, index) => (
                    <div key={topic.id} className="topic-item">
                        <div className="name-topic">
                            <h3>{topic.topic_Name}</h3> {/* Hiển thị tên của topic */}
                        </div>
                        <div className="button-handle-topic">
                            <button className="edit-button" onClick={() => handleUpdateTopic(topic)}>
                                Update
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteCourse(index)}>
                                Delete
                            </button>
                            <button className="edit-lesson-button" onClick={() => handleEditLesson(topic.id)}>
                                Edit Lesson
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {editTopic && (
                <div className="edit-topic">
                    <h1>Update Topic</h1>
                    <div className="write-new-topic">
                        <input
                            type="text"
                            name="newTopic"
                            placeholder="Enter new topic name"
                            value={newTopic}
                            onChange={handleInputChange}
                        />
                        <button className="save-button" onClick={handleSaveTopic}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={() => setEditTopic(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div className="new-topic-up">
                <h1>New Topic</h1>
                <div className="write-new-topic">
                    <input
                        type="text"
                        name="newTopic"
                        placeholder="Enter topic name"
                        value={newTopic}
                        onChange={handleInputChange}
                    />
                    <button className="add-topic-button" onClick={handleAddTopic}>
                        <FontAwesomeIcon style={{ marginLeft: '10px', marginRight: '10px' }} icon={faPlus} />
                        <span>Add Topic</span>
                    </button>
                </div>
            </div>
            <div className="lesson-area">{editingTopicId && <UpLesson topicId={editingTopicId} />}</div>
        </div>
    );
}

export default UpTopic;
