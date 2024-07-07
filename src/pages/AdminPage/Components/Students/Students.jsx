import React, { useState } from 'react';
import Button from '@/components/Button';
import './styles.css';

const students = [
    {
        name: 'Alexander',
        degree: 'Thạc sĩ Thương mại, Tiến sĩ',
        gender: 'Nam',
        phone: '+84 123 456 7890',
        email: 'info@example.com',
        joiningDate: '2011/04/25',
        image: 'students.jpg', // Replace with actual image path
        enrolledInPro: true,
    },
    {
        name: 'Elizabeth',
        degree: 'Cử nhân Thương mại, Thạc sĩ Thương mại',
        gender: 'Nữ',
        phone: '+84 123 456 7890',
        email: 'info@example.com',
        joiningDate: '2011/07/25',
        image: 'students.jpg', // Replace with actual image path
        enrolledInPro: false,
    },
    {
        name: 'Amelia',
        degree: 'Thạc sĩ Thương mại, Tiến sĩ',
        gender: 'Nữ',
        phone: '+84 123 456 7890',
        email: 'info@example.com',
        joiningDate: '2009/01/12',
        image: 'students.jpg', // Replace with actual image path
        enrolledInPro: true,
    },
    {
        name: 'Charlotte',
        degree: 'Cử nhân Thương mại, Thạc sĩ Thương mại',
        gender: 'Nữ',
        phone: '+84 123 456 7890',
        email: 'info@example.com',
        joiningDate: '2015/03/15',
        image: 'students.jpg', // Replace with actual image path
        enrolledInPro: false,
    },
    {
        name: 'Isabella',
        degree: 'Cử nhân Nghệ thuật, Cử nhân Công nghệ thông tin',
        gender: 'Nữ',
        phone: '+84 123 456 7890',
        email: 'info@example.com',
        joiningDate: '2013/09/25',
        image: 'students.jpg', // Replace with actual image path
        enrolledInPro: true,
    },
    {
        name: 'Sebastian',
        degree: 'Thạc sĩ Thương mại, Tiến sĩ',
        gender: 'Nam',
        phone: '+84 123 456 7890',
        email: 'info@example.com',
        joiningDate: '2010/06/20',
        image: 'students.jpg', // Replace with actual image path
        enrolledInPro: false,
    },
];

function Students() {
    const [filter, setFilter] = useState('all');

    const enrolledStudents = students.filter((student) => student.enrolledInPro);
    const notEnrolledStudents = students.filter((student) => !student.enrolledInPro);

    let displayedStudents;
    if (filter === 'all') {
        displayedStudents = students;
    } else if (filter === 'enrolled') {
        displayedStudents = enrolledStudents;
    } else {
        displayedStudents = notEnrolledStudents;
    }

    return (
        <div className="students-page">
            <div className="radio-container">
                <label>
                    <input
                        type="radio"
                        name="enrollmentStatus"
                        checked={filter === 'all'}
                        onChange={() => setFilter('all')}
                    />
                    All students
                </label>
                <label>
                    <input
                        type="radio"
                        name="enrollmentStatus"
                        checked={filter === 'enrolled'}
                        onChange={() => setFilter('enrolled')}
                    />
                    Students (Free course)
                </label>
                <label>
                    <input
                        type="radio"
                        name="enrollmentStatus"
                        checked={filter === 'notEnrolled'}
                        onChange={() => setFilter('notEnrolled')}
                    />
                    Students (Pro course)
                </label>
            </div>

            <div className="grid-view">
                {displayedStudents.map((student, index) => (
                    <div key={index} className="card">
                        <img src={student.image} alt={student.name} className="profile-pic" />
                        <h2>{student.name}</h2>
                        <p className="info">{student.degree}</p>
                        <p>{student.gender}</p>
                        <p>{student.phone}</p>
                        <p>{student.email}</p>
                        <p>{student.joiningDate}</p>
                        <Button to={'/'}>View Detail</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Students;
