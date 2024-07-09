import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './KhoaHocStyle.module.scss'; // Ensure this path is correct
const cx = classNames.bind(style);

const KhoaHoc = ({ search }) => {
    const [courses, setCourses] = useState([]);
    // const [fromPrice, setFromPrice] = useState(null);
    // const [toPrice, setToPrice] = useState(null);
    // const [sortBy, setSortBy] = useState('');
    // const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const params = {
                    search,
                    // from: fromPrice !== null ? fromPrice : undefined,
                    // to: toPrice !== null ? toPrice : undefined,
                    // sortBy: sortBy || undefined,
                    // pageIndex,
                    pageSize,
                };

                const response = await axios.post('https://localhost:7127/api/Courses/SearchCourses', params);
                setCourses(response.data.value.items);
                console.log(response.data.value.items);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [search, pageSize]); //fromPrice, toPrice, sortBy, pageIndex,

    // const handleFromPriceChange = (e) => setFromPrice(e.target.value !== '' ? parseFloat(e.target.value) : null);
    // const handleToPriceChange = (e) => setToPrice(e.target.value !== '' ? parseFloat(e.target.value) : null);
    // const handleSortChange = (e) => setSortBy(e.target.value);

    const handleCardClick = (id) => {
        window.location.href = `/CoursesDetail/${id}`;
    };
    return (
        <div className={cx('wrapper')}>
            {/* <input
                type="number"
                value={fromPrice !== null ? fromPrice : ''}
                onChange={handleFromPriceChange}
                placeholder="From price"
                className={cx('price-input')}
            />
            <input
                type="number"
                value={toPrice !== null ? toPrice : ''}
                onChange={handleToPriceChange}
                placeholder="To price"
                className={cx('price-input')}
            />
            <select value={sortBy} onChange={handleSortChange} className={cx('sort-select')}>
                <option value="">Sort by</option>
                <option value="DonGia_asc">Price Ascending</option>
                <option value="DonGia_desc">Price Descending</option>
            </select> */}
            <div className={cx('course-list')}>
                {courses.slice(0, 4).map((course) => (
                    <div
                        style={{ cursor: 'pointer' }}
                        key={course.course_id}
                        className={cx('course-item')}
                        onClick={() => handleCardClick(course.course_id)}
                    >
                        <h4>{course.title}</h4>
                        <p>Lecturer: {course.lecturerEmail}</p>
                    </div>
                ))}
            </div>
            {/* <div className={cx('pagination')}>
                <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 1}>Previous</button>
                <span>Page {pageIndex}</span>
                <button onClick={() => handlePageChange(pageIndex + 1)}>Next</button>
            </div> */}
        </div>
    );
};

export default KhoaHoc;
