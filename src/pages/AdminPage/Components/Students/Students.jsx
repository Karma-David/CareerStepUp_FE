import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const LearnerTable = () => {
    const [learners, setLearners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPremium, setIsPremium] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchLearners = async () => {
            setLoading(true);

            try {
                const response = await axios.get(`https://localhost:7127/ListOfLearner`, {
                    params: {
                        isPremium: isPremium,
                        pageIndex: pageIndex
                    }
                });

                console.log(response.data.value);
                if (response.data.value.items && Array.isArray(response.data.value.items)) {
                    setLearners(response.data.value.items);
                    setTotalPages(response.data.value.totalPages)
                } else {
                    setLearners([]);
                }
            } catch (error) {
                console.error('Error fetching learners:', error);
                setError('Error fetching learners');
            } finally {
                setLoading(false);
            }
        };

        fetchLearners();
    }, [isPremium, pageIndex]);

    const handleRadioChange = (event) => {
        setIsPremium(event.target.id === 'flexRadioDefault1');
    };

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 1 && newPageIndex <= totalPages) {
            setPageIndex(newPageIndex);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <div className="form-check-group">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        checked={isPremium}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Premium Learner
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked={!isPremium}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Standard Learner
                    </label>
                </div>
            </div>

            <div className="learners-page">
                <h1>All Learners</h1>
                <div className="grid-view">
                    {learners.map((learner) => (
                        <LearnerCard key={learner.id} learner={learner} />
                    ))}
                    {learners.length === 0 && <div className="no-learners">No learners found</div>}
                </div>
                <div className="pagination">
                    <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 1}>
                        Previous
                    </button>
                    <span>Page {pageIndex}</span>
                    <button onClick={() => handlePageChange(pageIndex + 1)}disabled={pageIndex === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

function LearnerCard({ learner }) {
    return (
        <div className="card">
            <img src={learner.avatarUrl} alt={`${learner.firstName} ${learner.lastName}`} className="profile-pic" />
            <h2>{`${learner.firstName} ${learner.lastName}`}</h2>
            <p>Email: {learner.email}</p>
            <Link to={`/LearnerProfile/${learner.id}`} className="profile-button" style={{ color: 'black' }}>
                View Profile
            </Link>
        </div>
    );
}

export default LearnerTable;
