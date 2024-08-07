import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';
import { TbExclamationMark } from 'react-icons/tb';

const LecturerTable = () => {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmed, setConfirmed] = useState(true);

    useEffect(() => {
        const fetchLecturers = async () => {
            setLoading(true);

            try {
                let response;
                if (confirmed) {
                    response = await axios.get('https://localhost:7127/api/Lecturer/GetAllConfirmLecturer');
                } else {
                    response = await axios.get('https://localhost:7127/api/Lecturer/GetAllNotConfirmLecturer');
                }

                if (response.data && Array.isArray(response.data.value)) {
                    setLecturers(response.data.value);
                } else {
                    setLecturers([]);
                }
            } catch (error) {
                console.error('Error fetching lecturers:', error);
                setError('Error fetching lecturers');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturers();
    }, [confirmed]);

    const handleRadioChange = (event) => {
        setConfirmed(event.target.id === 'flexRadioDefault1');
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
                        checked={confirmed}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Confirmed Lecturer
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked={!confirmed}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Not Confirmed Lecturer
                    </label>
                </div>
            </div>

            <div className="lecturers-page">
                <h1 style={{marginBottom:'15px'}}>All Lecturers</h1>
                <div className="grid-view">
                    {lecturers.map((lecturer) => (
                        <LecturerCard key={lecturer.lecturer_Id} lecturer={lecturer} confirmed={confirmed}  />
                    ))}
                    {lecturers.length === 0 && <div className="no-lecturers">No lecturers found</div>}
                </div>
            </div>
        </div>
    );
};

function LecturerCard({ lecturer, confirmed }) {
    const [lecturers, setLecturers] = useState([]);

    const handleApprove = async (lecturerID) => {
        try {
            await axios.put(`https://localhost:7127/api/Lecturer/ApproveLecturer?id=${lecturerID}`);
            setLecturers(lecturers.filter(lecturer => lecturer.lecturer_Id !== lecturerID));
        } catch (error) {
            console.error('Error approving lecturer:', error);
        }
    };

    return (
        <div className="card">
            {lecturer.haveNotification && (
                <div className="notification-icon">
                    <TbExclamationMark />
                </div>
            )}
            <img src={lecturer.avatar_Url} alt={`${lecturer.firstName} ${lecturer.lastName}`} className="profile-pic" />
            <h2>{`${lecturer.firstName} ${lecturer.lastName}`}</h2>
            <p>Email: {lecturer.email}</p>
            
            {confirmed ? (
                <Link
                    to={`/LecturerProfile/${lecturer.lecturer_Id}`}
                    className="profile-button"
                    style={{ color: 'black' }}
                >
                    View Profile
                </Link>
            ) : (
                <button className="confirm-button" onClick={() => handleApprove(lecturer.lecturer_Id)} >Confirm</button>
            )}
        </div>
    );
}

export default LecturerTable;
