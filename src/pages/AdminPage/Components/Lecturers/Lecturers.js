
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

import './styles.css';

const LecturerTable = () => {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const response = await axios.get('https://localhost:7127/api/Lecturer/GetAllConfirmLecturer');
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
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers.map((lecturer) => (
                            <tr key={lecturer.lecturer_Id}>
                                <td>
                                    <img src={lecturer.avatar_Url} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                </td>
                                <td>{lecturer.firstName}</td>
                                <td>{lecturer.lastName}</td>
                                <td>{lecturer.email}</td>
                                <td>
                                    <a href={lecturer.certificate} style={{ color: 'orange' }} target="_blank" rel="noopener noreferrer">Certificate</a>
                                </td>
                                <td>
                                    <Link to={`/LecturerProfile/${lecturer.lecturer_Id}`} className="profile-button" style={{color:'black'}}>
                                        View Profile
                                    </Link>
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

export default LecturerTable;
