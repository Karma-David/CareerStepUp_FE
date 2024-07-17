import React, { useEffect, useState } from 'react';
import './WidthDraw.css'; // Import CSS file

const WidthDraw = () => {
    const [userId, setUserId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [withdrawAmounts, setWithdrawAmounts] = useState({});
    const [totalSubs, setTotalSubs] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const GetIDFromEmailAPI = 'https://localhost:7127/GetUserIDfromToken'; // Replace with your actual URL
    const WithdrawAPI = 'https://localhost:7127/api/Courses/RequestWidthDrawProposeOnACourse'; // Replace with your actual URL

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
                    body: JSON.stringify(email), // Send email as an object
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
            }
        };
        getUserID();
    }, [GetIDFromEmailAPI]);

    useEffect(() => {
        if (userId) {
            const CourseLecturerAPI = `https://localhost:7127/api/Courses/CourseOfALecturer?lecturer_id=${userId}&isConfirmed=true`;
            const fetchCourses = async () => {
                try {
                    const response = await fetch(CourseLecturerAPI);
                    if (!response.ok) {
                        throw new Error('Failed to fetch courses');
                    }
                    const data = await response.json();
                    setCourses(data.value);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };

            fetchCourses();
        }
    }, [userId]);

    const handleWithdrawClick = (course) => {
        const amount = withdrawAmounts[course.course_id];
        if (amount >= 10) {
            const updatedWithdrawAmounts = { ...withdrawAmounts, [course.course_id]: amount };

            // Cộng tổng số subscribers chỉ khi nhấn rút cho khóa học này
            const currentWithdrawn = totalSubs + Number(amount);
            const currentTotalPrice = currentWithdrawn * 8000;

            setWithdrawAmounts(updatedWithdrawAmounts);
            setTotalSubs(currentWithdrawn);
            setTotalPrice(currentTotalPrice);
        } else {
            alert('Amount of Subscribers have to be larger than 10');
        }
    };

    const handleSubmit = async () => {
        const requests = Object.keys(withdrawAmounts)
            .filter((courseId) => withdrawAmounts[courseId] > 0)
            .map((courseId) => ({
                Course_id: courseId,
                User_id: userId,
                Sub: withdrawAmounts[courseId],
            }));

        if (requests.length === 0) {
            alert('Bạn phải chọn course để rút');
            return;
        }

        try {
            const response = await fetch(WithdrawAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requests),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to withdraw');
            }
            alert('Withdrawal request successful');
            window.location.reload();
        } catch (error) {
            console.error('Error making withdrawal request:', error);
        }
    };

    const handleInputChange = (courseId, value) => {
        const subscribers = courses.find((course) => course.course_id === courseId)?.subcriber || 0;
        const validValue = Math.max(0, Math.min(subscribers, Number(value)));

        setWithdrawAmounts((prevAmounts) => ({
            ...prevAmounts,
            [courseId]: validValue,
        }));
    };

    const handleCancel = () => {
        setWithdrawAmounts({});
        setTotalSubs(0);
        setTotalPrice(0);
    };

    return (
        <div>
            <h1>Withdraw Page</h1>
            <div className="courses-list-wrapper">
                <div className="courses-list-container">
                    {courses
                        .filter((course) => course.isPremium)
                        .map((course, index) => (
                            <div className="courses-item" key={index}>
                                <div className="courses-info">
                                    <h3>{course.title}</h3>
                                    <p>Subscribers: {course.subcriber}</p>
                                    <p>Date Left: {course.dateLeft === 0 ? 'Ready' : course.dateLeft}</p>
                                    <input
                                        type="number"
                                        min="0"
                                        max={course.subcriber}
                                        value={withdrawAmounts[course.course_id] || ''}
                                        onChange={(e) => handleInputChange(course.course_id, e.target.value)}
                                        placeholder="Enter amount to withdraw"
                                    />
                                    <button
                                        onClick={() => handleWithdrawClick(course)}
                                        disabled={course.subcriber < 10 || course.dateLeft > 0}
                                    >
                                        Rút
                                    </button>
                                </div>
                                <div>
                                    <p>Total Subscribers to withdraw: {withdrawAmounts[course.course_id] || 0}</p>
                                    <p>Total Price: {(withdrawAmounts[course.course_id] || 0) * 8000} VND</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="total-summary-container">
                <div className="total-summary">
                    <h3>Total Subscribers: {totalSubs}</h3>
                    <h3>Total Price: {totalPrice} VND</h3>
                    <div>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidthDraw;
