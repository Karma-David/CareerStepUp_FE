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
                // Handle error, e.g., set state to empty or show error message
            }
        };

        getTopic(); // Initial fetch
    }, [id, TopicUserAPI]);

    const handleEditLesson = (topicId) => {
        setEditingTopicId(topicId); // Đặt ID của topic đang được chỉnh sửa
    };

    //Lỗi Input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newTopic') {
            // Ensure value is always a string, default to empty string if undefined or null
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
                    'Content-Type': 'application/json', // Ensure correct content type
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
                    console.log('New topic added successfully:', data);
                    setNewTopic('');
                    // Update topics state with new topic added
                    setTopics((prevTopics) => [...prevTopics, data]); // Add new topic to the state
                })
                .catch((error) => {
                    console.error('Error adding new topic:', error);
                    // Handle error, e.g., show error message to user
                });
        }
    };

    const handleUpdateTopic = (topic) => {
        setEditTopic(topic);
        setNewTopic(topic.topic_Name);
    };

    const handleSaveTopic = () => {
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
                // Update topics state locally
                setTopics(topics.map((t) => (t.id === editTopic.id ? updatedTopic : t)));
                setEditTopic(null);
                setNewTopic('');
                alert('Edit successfully');
                // getTopic();
            })
            .catch((error) => console.error('Error updating topic:', error));
    };

    const handleDeleteCourse = (index) => {
        const topicToDelete = topics[index];
        fetch(`${DeleteTopicAPI}/${topicToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ course_id: topicToDelete.id }), // Thêm dữ liệu nếu cần thiết
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedTopics = [...topics];
                updatedTopics.splice(index, 1);
                setTopics(updatedTopics);
            })
            .catch((error) => console.error('Error deleting course:', error));
    };

    // Render lại toàn bộ component khi topics thay đổi
    useEffect(() => {
        // Các tác vụ cần thực hiện khi topics thay đổi, ví dụ như fetch lại dữ liệu
        console.log('Topics updated, re-rendering UpTopic');
    }, [topics]);

    return (
        <div>
            <h1>Course Name: {courseName}</h1>
            <h2 style={{ backgroundColor: 'orangered', color: 'white' }}>Topic</h2>
            <div style={{ marginLeft: '150px' }} className="list-topic-course">
                {topics.map((topic, index) => (
                    <div key={topic.id} className="topic-item">
                        <div className="name-topic">
                            <h3>{topic.name}</h3>
                        </div>
                        <div className="button-handle-topic">
                            <button onClick={() => handleUpdateTopic(topic)}>Update</button>
                            <button onClick={() => handleDeleteCourse(index)}>Delete</button>
                            <button onClick={() => handleEditLesson(topic.id)}>Edit lesson</button>
                        </div>
                    </div>
                ))}
            </div>
            {editTopic && (
                <div className="edit-topic">
                    <div>
                        <h1>Update Topic</h1>
                    </div>
                    <div className="write-new-topic">
                        <input
                            type="text"
                            name="newTopic"
                            placeholder="Enter new topic name"
                            value={newTopic}
                            onChange={handleInputChange}
                        />
                        <button style={{ margin: '10px' }} onClick={handleSaveTopic}>
                            Lưu
                        </button>
                        <button style={{ margin: '10px' }} onClick={() => setEditTopic(null)}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            <div style={{ marginTop: '30px' }} className="new-topic-up">
                <div>
                    <h1>New Topic</h1>
                </div>
                <div className="write-new-topic">
                    <div>
                        <input
                            type="text"
                            name="newTopic"
                            placeholder="Enter topic name"
                            value={newTopic}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button
                            style={{ height: '50px', marginLeft: '50px', marginTop: '10px', borderRadius: '10px' }}
                            onClick={handleAddTopic}
                        >
                            <FontAwesomeIcon style={{ marginLeft: '10px', marginRight: '10px' }} icon={faPlus} />
                            <span style={{ marginRight: '10px' }}>Add Topic</span>
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '50px' }} className="Lesson-area">
                {editingTopicId && <UpLesson topicId={editingTopicId} />}
            </div>
        </div>
    );
}

export default UpTopic;
