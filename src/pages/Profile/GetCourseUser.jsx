import classNames from 'classnames/bind';
import style from './Profile.module.scss';
const { useState, useEffect } = require('react');

const CourseUserAPI = 'http://localhost:3000/courses';
const cx = classNames.bind(style);

const GetCourseUser = () => {
    const [coursesUser, setCourseUser] = useState([]);
    useEffect(() => {
        getCourseUser().then(setCourseUser);
    }, []);

    // Hàm lấy dữ liệu từ API
    const getCourseUser = async () => {
        const response = await fetch(CourseUserAPI);
        const data = await response.json();
        return data;
    };

    const renderCourseUser = (coursesUser) => {
        return coursesUser.map((courseUser, index) => (
            <div className={cx('class-inner')} key={index}>
                <img className={cx('img-thumbnail')} src={courseUser.image} alt="Course User" />
                <div id="info-class" className={cx('info-class')}>
                    <h4>{courseUser.name}</h4>
                    <p>{courseUser.description}</p>
                </div>
            </div>
        ));
    };
    return <div id="Course-User">{renderCourseUser(coursesUser)}</div>;
};

export default GetCourseUser;
