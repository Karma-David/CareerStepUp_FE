import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RegisterLecturer.css'; // Assuming you save the CSS in this file

const RegisterLecturerAPI = 'https://localhost:7127/api/Lecturer/CreateRegisterForm';

function RegisterLecturer() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Retrieve email from localStorage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const uploadPDF = async () => {
        if (!file || !description) {
            alert('Please select a file and enter a description.');
            return;
        }

        const formData = new FormData();
        formData.append('Email', email); // Ensure 'Email' key matches the model
        formData.append('Certificate', file); // Ensure 'Certificate' key matches the model
        formData.append('Description', description); // Ensure 'Description' key matches the model

        try {
            const response = await axios.post(RegisterLecturerAPI, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status !== 204) {
              
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Lecturer registered successfully!');
        }
    };

    return (
        <div className="Register-Lecturer">
            <h1>Register Lecturer</h1>
            <div className="form-regis-lecturer">
                <div style={{ width: '100%' }}>
                    Email{' '}
                    <input
                        style={{ border: '1px solid #333', borderRadius: '5px', width: '100%' }}
                        readOnly
                        value={email}
                    />
                </div>
                <form style={{ marginTop: '20px', marginBottom: '40px' }} onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="pdfInput" className="form-label">
                        Tải lên certificate:
                    </label>
                    <input type="file" id="pdfInput" onChange={handleFileChange} className="form-input" />
                </form>
                <label htmlFor="description" className="form-label">
                    Mô tả:
                </label>
                <textarea
                    id="description"
                    rows="4"
                    cols="50"
                    placeholder="Nhập mô tả tại đây..."
                    value={description}
                    onChange={handleDescriptionChange}
                    className="form-textarea"
                ></textarea>
                <button type="button" onClick={uploadPDF} className="form-button">
                    Tải lên
                </button>
            </div>
        </div>
    );
}

export default RegisterLecturer;
