import { useEffect, useState } from 'react';

function RepliedComment({ CommentID, UserName }) {
    const [replies, setReplies] = useState([]);
    const ReplyAPi = `https://localhost:7127/api/Comments/GetReplysComments?parentCommentId=${CommentID}`;
    useEffect(() => {
        // Fetch replies from the API
        const fetchReplies = async () => {
            try {
                const response = await fetch(ReplyAPi);
                const data = await response.json();
                const sortReply = (data.value || []).sort((a, b) => b.comment_Id - a.comment_Id);
                setReplies(sortReply);
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };

        fetchReplies();
    }, [ReplyAPi]);
    return (
        <div>
            <h2 style={{ color: 'black' }}>Reply Comment ID: {CommentID}</h2>
            <div>
                {replies.map((reply, index) => (
                    <div style={{ marginLeft: '80px', borderLeft: '1px solid' }} key={index}>
                        <div style={{ listStyle: 'none', marginTop: '50px', marginLeft: '20px' }}>
                            <img
                                src={reply.avatar}
                                alt={reply.user_name}
                                width={30}
                                height={30}
                                style={{ borderRadius: '50%', border: '1px solid' }}
                            />
                            <span>{reply.user_name}</span>
                        </div>
                        <div style={{ marginLeft: '60px', marginTop: '20px', display: 'flex' }}>
                            <div style={{ backgroundColor: '#f6f7f9', height: '27px', borderRadius: '50px' }}>
                                <h3 style={{ marginTop: '4px', padding: '0px 10px', color: '#0093fc' }}>@{UserName}</h3>
                            </div>
                            <div>
                                <h3 style={{ marginLeft: '15px', marginTop: '4px' }}> {reply.content}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RepliedComment;
