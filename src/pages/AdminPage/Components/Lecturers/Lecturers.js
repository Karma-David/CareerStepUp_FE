import React, { useState } from "react";
import './styles.css';

const lecturers = [
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

function LecturerCard({ lecturer }) {
    return (
        <div className="card">
            <img src={lecturer.image} alt={lecturer.name} className="profile-pic" />
            <h2>{lecturer.name}</h2>
            <p>{lecturer.degree}</p>
            <p>Gender: {lecturer.gender}</p>
            <p>Phone No.: {lecturer.phone}</p>
            <p>Email: {lecturer.email}</p>
            <p>Address: {lecturer.address}</p>
        </div>
    );
}

function Lecturers() {
    return (
        <div className="lecturers-page">
            <h1>All Lecturers</h1>
            <div className="grid-view">
                {lecturers.map((lecturer, index) => (
                    <LecturerCard key={index} lecturer={lecturer} />
                ))}
            </div>
        </div>
    );
}

export default Lecturers;
