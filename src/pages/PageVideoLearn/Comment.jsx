import React, { useState, useEffect } from 'react';
import './RepliedComment.jsx';
import RepliedComment from './RepliedComment.jsx';
function Comment({ lessonID }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');
    const [newComment, setNewComment] = useState('');
    const [replyingCommentId, setReplyingCommentId] = useState(null); // State to store parentCommentId when replying
    const [newReply, setNewReply] = useState(null);


    const GetIDFromEmailAPI = 'https://localhost:7127/GetUserIDfromToken';
    const createCommentAPI = `https://localhost:7127/api/Comments/CreateComments`;

    useEffect(() => {
        const getUserID = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    throw new Error('Email not found in local storage');
                }
                const res = await fetch(GetIDFromEmailAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(email),
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (data.statusCode === 200) {
                    setUserId(data.value); // Assuming data.value contains the user ID
                } else {
                    throw new Error(`API error! status: ${data.statusCode}, message: ${data.message}`);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setError(error.message);
            }
        };
        getUserID();
    }, [GetIDFromEmailAPI]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentAPI = `https://localhost:7127/api/Comments/GetCommentsByLesson?lessonId=${lessonID}`;
                const response = await fetch(commentAPI);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const sortedComments = (data.value || []).sort((a, b) => b.comment_Id - a.comment_Id);
                setComments(sortedComments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError(error);
                setLoading(false);
            }
        };
        fetchComments();
    }, [lessonID, newComment]); // Fetch comments whenever lessonID or newComment changes

    const handleReply = (commentId) => {
        setReplyingCommentId(commentId);
        console.log(commentId);
    };

    const handleCancelReply = () => {
        setReplyingCommentId(null);
    };
    const handleSeeReply = (commentId) => {
        if (newReply === commentId) {
            setNewReply(null); // Hide replies if the same comment ID is clicked again
        } else {
            setNewReply(commentId); // Show replies for the clicked comment ID
        }
    };



    const handleCommentSubmit = async (e, parentCommentId) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentData = {
            content: newComment,
            parentCommentId: parentCommentId || 0, // Use parentCommentId if provided, otherwise default to 0
        };

        try {
            const res = await fetch(`${createCommentAPI}?user_id=${userId}&lesson_id=${lessonID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorData.message}`);
            }

            const data = await res.json();
            const newCommentData = data.value; // Assuming data.value contains the new comment data

            // Update comments state
            const updatedComments = [newCommentData, ...comments];
            setComments(updatedComments.sort((a, b) => b.comment_Id - a.comment_Id)); // Sort comments by comment_Id descending
            setNewComment(''); // Clear input field
            setReplyingCommentId(null); // Clear replying state
        } catch (error) {
            console.error('Error creating comment:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Comments for lesson ID: {lessonID}</h2>
            <div>
                <form style={{ display: 'grid', marginLeft: '60px' }} onSubmit={(e) => handleCommentSubmit(e, null)}>
                    <input
                        style={{
                            backgroundColor: '#dcebff',
                            width: '800px',
                            height: '70px',
                            border: '1px solid #0093fc',
                            paddingLeft: '10px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s, border-color 0.3s',
                        }}
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        onFocus={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = '#0093fc';
                            e.target.style.borderStyle = 'solid';
                        }}
                        onBlur={(e) => {
                            e.target.style.backgroundColor = '#dcebff';
                            e.target.style.border = 'none';
                        }}
                    />
                    <div>
                        <button
                            style={{
                                width: '150px',
                                height: '50px',
                                marginTop: '30px',
                                marginLeft: '650px',
                                borderRadius: '10px',
                                backgroundColor: '#0093fc',
                                color: 'white',
                            }}
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="Comment-list">
                {comments.length > 0 ? (
                    <div>
                        {comments.map((comment, index) => (
                            <div key={index}>
                                <div style={{ listStyle: 'none', marginTop: '50px', marginLeft: '20px' }}>
                                    <img
                                        src={comment.avatar}
                                        alt={comment.user_name}
                                        width={30}
                                        height={30}
                                        style={{ borderRadius: '50%', border: '1px solid' }}
                                    />
                                    <span> {comment.user_name}</span>
                                </div>
                                <div>
                                    <h3 style={{ marginLeft: '60px', marginTop: '20px' }}>{comment.content}</h3>
                                </div>
                                <div>
                                    <button
                                        style={{
                                            backgroundColor: 'white',
                                            width: '150px',
                                            height: '50px',
                                            marginLeft: '50px',
                                            color: '#0093fc',
                                        }}
                                        onClick={() => handleReply(comment.comment_Id)}
                                    >
                                        Reply
                                    </button>
                                </div>

                                {/* Reply form */}
                                {replyingCommentId === comment.comment_Id && (
                                    <>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ marginLeft: '50px' }}>
                                                <img
                                                    src={comment.avatar}
                                                    alt={comment.user_name}
                                                    width={30}
                                                    height={30}
                                                    style={{
                                                        borderRadius: '50%',
                                                        border: '1px solid',
                                                        marginTop: '12px',
                                                    }}
                                                />
                                            </div>
                                            <form
                                                style={{
                                                    display: 'grid',
                                                    marginTop: '10px',
                                                    marginLeft: '10px',
                                                }}
                                                onSubmit={(e) => handleCommentSubmit(e, comment.comment_Id)}
                                            >
                                                <input
                                                    style={{
                                                        backgroundColor: '#dcebff',
                                                        width: '800px',
                                                        height: '70px',
                                                        border: '1px solid #0093fc',
                                                        paddingLeft: '10px',
                                                        fontSize: '16px',
                                                        borderRadius: '5px',
                                                        transition: 'background-color 0.3s, border-color 0.3s',
                                                    }}
                                                    type="text"
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder={`Write a reply to ${comment.user_name}...`}
                                                />
                                                <div>
                                                    <button
                                                        style={{
                                                            width: '150px',
                                                            height: '50px',
                                                            marginTop: '20px',
                                                            marginLeft: '440px',
                                                            borderRadius: '10px',
                                                            backgroundColor: '#0093fc',
                                                            color: 'white',
                                                        }}
                                                        type="button"
                                                        onClick={handleCancelReply}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        style={{
                                                            width: '150px',
                                                            height: '50px',
                                                            marginTop: '10px',
                                                            marginLeft: '50px',
                                                            borderRadius: '10px',
                                                            backgroundColor: '#0093fc',
                                                            color: 'white',
                                                        }}
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                )}
                                <div>
                                    <button
                                        style={{ backgroundColor: 'white', color: '#0093fc' }}
                                        onClick={() => handleSeeReply(comment.comment_Id)}
                                    >
                                        {newReply === comment.comment_Id ? 'Hide replies' : 'See replies'}
                                    </button>
                                </div>
                                {newReply === comment.comment_Id && (
                                    <RepliedComment CommentID={comment.comment_Id} UserName={comment.user_name} />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </div>
    );
}

export default Comment;
