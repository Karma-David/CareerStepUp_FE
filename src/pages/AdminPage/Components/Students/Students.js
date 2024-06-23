import React, { useState } from "react";
import './styles.css';

const students = [
    {
        name: "Alexander",
        degree: "M.COM, P.H.D.",
        gender: "Male",
        phone: "+01 123 456 7890",
        email: "info@example.com",
        address: "#8901 Marmora Road",
        department: "Architect",
        joiningDate: "2011/04/25",
        image: "images/pic2.jpg" // Replace with actual image path
    },
    {
        name: "Elizabeth",
        degree: "B.COM, M.COM.",
        gender: "Female",
        phone: "+01 123 456 7890",
        email: "info@example.com",
        address: "#8901 Marmora Road",
        department: "Accountant",
        joiningDate: "2011/07/25",
        image: "images/pic1.jpg" // Replace with actual image path
    },
    {
        name: "Amelia",
        degree: "M.COM, P.H.D.",
        gender: "Female",
        phone: "+01 123 456 7890",
        email: "info@example.com",
        address: "#8901 Marmora Road",
        department: "Junior Technical",
        joiningDate: "2009/01/12",
        image: "images/pic3.jpg" // Replace with actual image path
    },
    {
        name: "Charlotte",
        degree: "B.COM, M.COM.",
        gender: "Female",
        phone: "+01 123 456 7890",
        email: "info@example.com",
        address: "#8901 Marmora Road",
        department: "Lecturer",
        joiningDate: "2015/03/15",
        image: "images/pic4.jpg" // Replace with actual image path
    },
    {
        name: "Isabella",
        degree: "B.A, B.C.A",
        gender: "Female",
        phone: "+01 123 456 7890",
        email: "info@example.com",
        address: "#8901 Marmora Road",
        department: "Senior Lecturer",
        joiningDate: "2013/09/25",
        image: "images/pic5.jpg" // Replace with actual image path
    },
    {
        name: "Sebastian",
        degree: "M.COM, P.H.D.",
        gender: "Male",
        phone: "+01 123 456 7890",
        email: "info@example.com",
        address: "#8901 Marmora Road",
        department: "Professor",
        joiningDate: "2010/06/20",
        image: "images/pic6.jpg" // Replace with actual image path
    }
];

function StudentCard({ students }) {
    return (
        <div className="card">
            <img src={students.image} alt={students.name} className="profile-pic" />
            <h2>{students.name}</h2>
            <p>{students.degree}</p>
            <p>Gender: {students.gender}</p>
            <p>Phone No.: {students.phone}</p>
            <p>Email: {students.email}</p>
            <p>Address: {students.address}</p>
        </div>
    );
}

function Students() {
    return (
        <div className="students-page">
            <h1>All Students</h1>
            <div className="grid-view">
                {students.map((students, index) => (
                    <StudentCard key={index} students={students} />
                ))}
            </div>
        </div>
    );
}

export default Students;
