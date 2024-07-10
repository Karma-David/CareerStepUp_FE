import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

const WithdrawalsList = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const response = await axios.get('https://localhost:7127/api/Courses/ListWidthDrawPropse', {
                    params: { 
                        pageIndex: pageIndex,
                        isConfirmed: isConfirmed
                    },
                });
                setWithdrawals(response.data.value.items);
                setTotalPages(response.data.value.totalPages);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWithdrawals();
    }, [pageIndex, isConfirmed]);

    const handleRadioChange = (event) => {
        setIsConfirmed(event.target.id === 'flexRadioDefault1');
    };

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 1 && newPageIndex <= totalPages) {
            setPageIndex(newPageIndex);
        }
    };

    const encodeParams = (withdrawal) => {
        const params = {
            user_id: withdrawal.user_id,
            subInACourses: withdrawal.subInACourses.map(course => ({
                course_id: course.course_id,
                subWithdrawn: course.subWithdrawn,
            }))
        };
        return encodeURIComponent(JSON.stringify(params));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="withdrawals-list">
            <h1>Withdrawals</h1>
            <div className="form-check-group">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        checked={isConfirmed}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Confirmed
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked={!isConfirmed}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Not Confirmed
                    </label>
                </div>
            </div>
            <div>
                {withdrawals.map((withdrawal) => (
                    <div key={withdrawal.user_id} className="withdrawal-item">
                        <Link to={`/WidthDrawDetail?data=${encodeParams(withdrawal)}`} className="width-draw-items">
                            <div><span>Lecturer ID:</span> {withdrawal.email}</div>
                            <div><span>Date:</span> {withdrawal.date}</div>
                            <div><span>Status:</span> {withdrawal.isApprove ? 'Approved' : 'Pending'}</div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 1}>
                    Previous
                </button>
                <span>Page {pageIndex}</span>
                <button onClick={() => handlePageChange(pageIndex + 1)} disabled={pageIndex === totalPages || totalPages === 0}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default WithdrawalsList;
