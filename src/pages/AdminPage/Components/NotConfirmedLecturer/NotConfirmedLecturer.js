// LecturerTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

const NotConfirmedLecturer = () => {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const response = await axios.get('https://localhost:7127/api/Lecturer/GetAllNotConfirmLecturer');
                if (response.data && Array.isArray(response.data.value)) {
                    setLecturers(response.data.value);
                } else {
                    setLecturers([]);
                    setError('No lecturers found');
                }
            } catch (error) {
                console.error('Error fetching lecturers:', error);
                setError('Error fetching lecturers');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturers();
    }, []);

    const handleApprove = async (lecturerId) => {
        try {
            await axios.put(`https://localhost:7127/api/Lecturer/ApproveLecturer?id=${lecturerId}`);
            setLecturers(lecturers.filter(lecturer => lecturer.lecturer_Id !== lecturerId));
        } catch (error) {
            console.error('Error approving lecturer:', error);
        }
    };

    const handleReject = async (lecturerId) => {
        try {
            await axios.delete(`https://localhost:7127/api/Lecturer/RejectLecturer?id=${lecturerId}`);
            setLecturers(lecturers.filter(lecturer => lecturer.lecturer_Id !== lecturerId));
        } catch (error) {
            console.error('Error rejecting lecturer:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="table-container">
            <h2>Lecturers List</h2>
            {lecturers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Certificate</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers.map((lecturer) => (
                            <tr key={lecturer.lecturer_Id}>
                                <td>
                                    <img src={lecturer.avatar_Url} alt="Avatar" />
                                </td>
                                <td>{lecturer.firstName}</td>
                                <td>{lecturer.lastName}</td>
                                <td>{lecturer.email}</td>
                                <td>
                                    <a href={lecturer.certificate} style={{color:'orange'}} target="_blank" rel="noopener noreferrer">Certificate</a>
                                </td>
                                <td>{lecturer.description}</td>
                                <td>
                                    <button onClick={() => handleApprove(lecturer.lecturer_Id)} className="approve-btn">
                                    <FaCheck style={{ color: 'green', fontSize: '24px' }} />
                                    </button>
                                    <button onClick={() => handleReject(lecturer.lecturer_Id)} className="reject-btn">
                                    <FaTimes style={{ color: 'red', fontSize: '24px' }} />
                                    </button>
                                </td>
                            </tr>   
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-lecturers">No lecturers found</div>
            )}
        </div>
    );
};

export default NotConfirmedLecturer;
