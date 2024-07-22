import React, { useState, useEffect } from 'react';
import RepliedComment from './RepliedComment.jsx';
import './Comment.css';

function Comment({ lessonID }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');
    const [newComment, setNewComment] = useState('');
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState('');
    const [replyingCommentIdForReply, setReplyingCommentIdForReply] = useState(null);

    const GetIDFromEmailAPI = 'https://localhost:7127/GetUserIDfromToken';
    const createCommentAPI = `https://localhost:7127/api/Comments/CreateComments`;

    useEffect(() => {
        const getUserID = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) throw new Error('Email not found in local storage');

                const res = await fetch(GetIDFromEmailAPI, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(email),
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                if (data.statusCode === 200) setUserId(data.value);
                else throw new Error(`API error! status: ${data.statusCode}, message: ${data.message}`);
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
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
    }, [lessonID, newComment]);

    const handleDeleteComment = async (commentID) => {
        try {
            const res = await fetch(`https://localhost:7127/api/Comments/DeleteComments?id=${commentID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Network response was not ok');
            setComments((prevComments) => prevComments.filter((comment) => comment.comment_Id !== commentID));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleReply = (commentId) => {
        setReplyingCommentId(commentId);
        setReplyingCommentIdForReply(commentId);
    };

    const handleCancelReply = () => {
        setReplyingCommentId(null);
        setReplyingCommentIdForReply(null);
        setNewReplyContent('');
    };

    const handleSeeReply = (commentId) => {
        setReplyingCommentIdForReply((prevId) => (prevId === commentId ? null : commentId));
    };

    const handleCommentSubmit = async (e, parentCommentId) => {
        e.preventDefault();
        if (!newComment.trim() && !newReplyContent.trim()) return;

        const commentData = {
            content: parentCommentId ? newReplyContent : newComment,
            parentCommentId: parentCommentId || 0,
        };

        try {
            const res = await fetch(`${createCommentAPI}?user_id=${userId}&lesson_id=${lessonID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorData.message}`);
            }

            const data = await res.json();
            const newCommentData = data.value;

            setComments((prevComments) =>
                [newCommentData, ...prevComments].sort((a, b) => b.comment_Id - a.comment_Id),
            );
            setNewComment('');
            setNewReplyContent('');
            setReplyingCommentId(null);
            setReplyingCommentIdForReply(null);

            // Reload the page after submitting a comment or reply
            window.location.reload();
        } catch (error) {
            console.error('Error creating comment:', error);
            setError(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="comment-container">
          
            <div className="comment-form-container">
                <form className="comment-form" onSubmit={(e) => handleCommentSubmit(e, null)}>
                    <input
                        className="comment-input"
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button className="comment-submit-button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
            <div className="comment-list">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.comment_Id} className="comment-item">
                            <div className="comment-header">
                                <img src={comment.avatar} alt={comment.user_name} className="comment-avatar" />
                                <span className="comment-user-name">{comment.user_name}</span>
                            </div>
                            <div className="comment-content">
                                <h3>{comment.content}</h3>
                            </div>
                            <div className="comment-actions">
                                <button
                                    className="comment-reply-button"
                                    onClick={() => handleReply(comment.comment_Id)}
                                >
                                    Reply
                                </button>
                                <button
                                    className="comment-see-reply-button"
                                    onClick={() => handleSeeReply(comment.comment_Id)}
                                >
                                    {replyingCommentIdForReply === comment.comment_Id ? 'Hide replies' : 'See replies'}
                                </button>
                                <button
                                    className="comment-delete-button"
                                    onClick={() => handleDeleteComment(comment.comment_Id)}
                                >
                                    Delete
                                </button>
                            </div>

                            {replyingCommentId === comment.comment_Id && (
                                <div className="reply-form-container">
                                    <div className="reply-form-header">
                                        <img src={comment.avatar} alt={comment.user_name} className="reply-avatar" />
                                    </div>
                                    <form
                                        className="reply-form"
                                        onSubmit={(e) => handleCommentSubmit(e, comment.comment_Id)}
                                    >
                                        <input
                                            className="reply-input"
                                            type="text"
                                            value={newReplyContent}
                                            onChange={(e) => setNewReplyContent(e.target.value)}
                                            placeholder={`Write a reply to ${comment.user_name}...`}
                                        />
                                        <div className="reply-buttons">
                                            <button
                                                className="reply-cancel-button"
                                                type="button"
                                                onClick={handleCancelReply}
                                            >
                                                Cancel
                                            </button>
                                            <button className="reply-submit-button" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {replyingCommentIdForReply === comment.comment_Id && (
                                <RepliedComment CommentID={comment.comment_Id} UserName={comment.user_name} />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </div>
    );
}

export default Comment;
