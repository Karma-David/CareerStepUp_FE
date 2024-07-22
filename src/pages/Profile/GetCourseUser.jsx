import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import { useState, useEffect, useCallback } from 'react';

const cx = classNames.bind(style);

const GetCourseUser = () => {
    const [coursesUser, setCourseUser] = useState([]);
    const [idUser, setIdUser] = useState('');

    const GetIDFromEmailAPI = 'https://localhost:7127/GetUserIDfromToken';
    const CourseUserAPI = `https://localhost:7127/api/Courses/isEnrolled?user_id=${idUser}`;

    const getCourseUser = useCallback(async () => {
        if (!idUser) return [];
        try {
            const response = await fetch(CourseUserAPI);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.statusCode === 200 && Array.isArray(data.value)) {
                return data.value;
            } else {
                throw new Error('Unexpected API response format');
            }
        } catch (error) {
            console.error('Error fetching course user:', error);
            return [];
        }
    }, [CourseUserAPI, idUser]);

    useEffect(() => {
        const fetchCourseUser = async () => {
            const data = await getCourseUser();
            setCourseUser(Array.isArray(data) ? data : []);
        };
        fetchCourseUser();
    }, [getCourseUser]);

    useEffect(() => {
        const getUserID = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) throw new Error('Email not found in local storage');

                const res = await fetch(GetIDFromEmailAPI, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(email), // JSON stringify the object with email key
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();

                if (data.statusCode === 200) setIdUser(data.value);
                else throw new Error(`API error! status: ${data.statusCode}, message: ${data.message}`);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
        getUserID();
    }, [GetIDFromEmailAPI]);

    const handleContiLearn = (course_id) => {
        window.location.href = `/PageVideoLearn/${course_id}`;
    }

    const renderCourseUser = (coursesUser) => {
        return coursesUser.map((courseUserWrapper, index) => {
            const { course, progress } = courseUserWrapper; // Make sure to destructure progress here
            const courseStatus = progress === 100 ? 'Hoàn thành khóa học' : 'Đang học khóa học';
            const statusClass = progress === 100 ? 'completed' : 'in-progress';
            return (
                <div onClick={() => handleContiLearn(course.course_id)} className={cx('class-inner')} key={index}>
                    <img className={cx('img-thumbnail')} src={course.course_Img} alt="Course User" />
                    <div id="info-class" className={cx('info-class')}>
                        <h2>{course.title}</h2>
                        <h4 style={{ marginTop: '5px' }} className={cx(statusClass)}>
                            {courseStatus}
                        </h4>{' '}
                        {/* Display course status here */}
                    </div>
                </div>
            );
        });
    };

    return <div id="Course-User">{renderCourseUser(coursesUser)}</div>;
};

export default GetCourseUser;
