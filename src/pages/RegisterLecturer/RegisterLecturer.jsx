import React, { useState } from 'react';
import './RegisterLecturer.css'; // Assuming you save the CSS in this file

const RegisterLecturerAPI = 'https://localhost:7127/api/Lecturer/CreateRegisterForm';

function RegisterLecturer() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

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
        formData.append('file', file);
        formData.append('description', description);

        try {
            const response = await fetch(RegisterLecturerAPI, {
                method: 'POST',
                body: formData,
                headers: {
                    // The browser sets the appropriate Content-Type automatically, so we don't need to set it here.
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Lecturer registered successfully!');
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem with the registration.');
        }
    };

    return (
        <div className="Register-Lecturer">
            <h1>Register Lecturer</h1>
            <div className="form-regis-lecturer">
                <form style={{ marginTop: '20px', marginBottom: '40px' }} onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="pdfInput" className="form-label">
                        Tải lên certificate:
                    </label>
                    <input type="file" id="pdfInput" accept=".pdf" onChange={handleFileChange} className="form-input" />
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
