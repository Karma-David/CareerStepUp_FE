import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './homepage.css';
import Footer from './footer';

function Home() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchValue = searchParams.get('search');
        console.log(searchValue);

        if (searchValue) {
            fetchCourses(searchValue, pageIndex);
        } else {
            fetchCourses(undefined, pageIndex); // Fetch all courses if no search parameter is provided
        }
    }, [location.search, pageIndex]);

    const fetchCourses = async (searchValue, pageIndex) => {
        try {
            const response = await fetch('https://localhost:7127/api/Courses/SearchCourses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: searchValue, pageIndex }), // Pass search criteria
            });
            const data = await response.json();
            if (data.value && Array.isArray(data.value.items)) {
                setCourses(data.value.items); // Assuming data.value.items is an array of CourseModel objects
                setTotalPages(data.value.totalPages); // Assuming data.value.totalPages is the total number of pages
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 1 && newPageIndex <= totalPages) {
            setPageIndex(newPageIndex);
        }
    };

    const renderCourses = (courses) => {
        const handleCardClick = (id) => {
            window.location.href = `/Test/${id}`;
        };
        return courses.map((course, index) => (
            <div className="col" key={index}>
                <div
                    className="card h-100 custom-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCardClick(course.course_id)}
                >
                    <img
                        style={{ width: '260px', height: '140px', objectFit: 'contain' }}
                        src={course.course_Img}
                        className="card-img-top custom-card-img"
                        alt={course.title}
                    />
                    <div className="card-body">
                        <h2 className="card-title">{course.title}</h2>
                        <p className="card-text">Lecturer: {course.lecturerEmail}</p>
                        {course.isPremium && <p className="card-text">VIP</p>}
                        <p className="card-text">Subscriber: {course.subscriber}</p>
                        <p className="card-text">ID: {course.course_id}</p>
                    </div>
                </div>
            </div>
        ));
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!Array.isArray(courses) || courses.length === 0) {
        return (
            <div className="text-center mt-5">
                <p>No courses available</p>
            </div>
        );
    }

    return (
        <div>
            <div className="container-slide">{/* Carousel code */}</div>
            <div className="container mt-5">
                <h1 className="text-left mb-4">All Courses</h1>
                <div className="row row-cols-1 row-cols-md-4 g-4">{renderCourses(courses)}</div>
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 1}>
                    Previous
                </button>
                <span>Page {pageIndex}</span>
                <button onClick={() => handlePageChange(pageIndex + 1)} disabled={pageIndex === totalPages}>
                    Next
                </button>
            </div>
            <div style={{ marginTop: '50px' }} className="container">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
