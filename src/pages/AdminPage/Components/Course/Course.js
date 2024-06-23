import React from "react";

import './styles.css';

const courses = [
    {
        title: "Why Should You Consider Taking an Education Course?",
        date: "April 23",
        duration: "12 Months",
        professor: "Nashid Martines",
        students: 120,
        image: "images/ccc1.png" // Replace with actual image path
    },
    {
        title: "When Is the Best Time to Take an Education Course?",
        date: "April 23",
        duration: "12 Months",
        professor: "Jack Ronan",
        students: 120,
        image: "images/ccc2.png" // Replace with actual image path
    },
    {
        title: "Education Courses: A Guide to Unlocking Your Potential",
        date: "April 23",
        duration: "12 Months",
        professor: "Jimmy Morris",
        students: 120,
        image: "images/ccc3.png" // Replace with actual image path
    },
    {
        title: "Course Title 4",
        date: "April 23",
        duration: "12 Months",
        professor: "Professor Name 4",
        students: 120,
        image: "images/ccc4.png" // Replace with actual image path
    },
    {
        title: "Course Title 5",
        date: "April 23",
        duration: "12 Months",
        professor: "Professor Name 5",
        students: 120,
        image: "images/ccc5.png" // Replace with actual image path
    },
    {
        title: "Course Title 6",
        date: "April 23",
        duration: "12 Months",
        professor: "Professor Name 6",
        students: 120,
        image: "images/ccc6.png" // Replace with actual image path
    }
];

function CourseCard({ course }) {
    return (
        <div className="course-card">
            <img src={course.image} alt={course.title} />
            <div className="course-card-body">
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-info">Date: {course.date}</p>
                <p className="course-card-info">Duration: {course.duration}</p>
                <p className="course-card-info">Professor: {course.professor}</p>
                <p className="course-card-info">Students: {course.students}</p>
            </div>
            {/* <div className="course-card-footer">
                <button className="btn">Read More</button>
            </div> */}
        </div>
    );
}

function Course() {
    return (
        <div>
           
            <div className="courses-page">
                <h1>All Courses</h1>
                <div className="grid-view">
                    {courses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Course;
