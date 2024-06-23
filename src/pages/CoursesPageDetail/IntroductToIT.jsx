import React, { useEffect, useState } from 'react';
import CourseDetail from './CourseDetail.jsx';
import { IoSpeedometer, IoTime } from 'react-icons/io5';
import { IoMdFilm } from 'react-icons/io';
import { FaBatteryFull } from 'react-icons/fa';

function IntroductToIT() {
    const CourseUserAPI = 'http://localhost:3000/courses';
    const [Courses, setCourses] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        GetCourses().then(setCourses);
    }, []);

    const GetCourses = async () => {
        const response = await fetch(CourseUserAPI);
        const data = await response.json();
        return data;
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

     // id khoa hoc
    //  const  Introduc_id = 1;

    // // so sanh course qua id
    // const course = Courses.find((course) => course.id === Introduc_id);

    const handleStartLearn = () => {

        return alert('You need to be logged in');
    };
   

    
    const courseOverview = [
        { icon: <IoSpeedometer />, text: 'Trình độ cơ bản' },
        { icon: <IoMdFilm />, text: 'Tổng số 12 bài học' },
        { icon: <IoTime />, text: 'Thời lượng 03 giờ 26 phút' },
        { icon: <FaBatteryFull />, text: 'Học mọi lúc, mọi nơi' },
    ];
    const lecturerInfo = {
        imageUrl: "https://jobsgo.vn/blog/wp-content/uploads/2020/07/unnamed-2.jpg",
        description: "Giảng viên A là một giảng viên có nhiều năm kinh nghiệm về môn ....",
        characteristics: [
            "Kinh nghiệm 10 năm trong ngành IT",
            "Giảng dạy tại nhiều trường đại học",
            "Từng làm việc tại các công ty lớn",
            "Chuyên gia trong lĩnh vực lập trình web",
        ],
        certificateUrl: "https://example.com/path/to/Report3_Software_Requirement_Specification_2.pdf"
    };
    return (
        <CourseDetail
            title="Introduction To IT"
            description="Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé."
            targets={[
                'Các kiến thức cơ bản, nền móng của ngành IT',
                'Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng',
                'Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng',
                'Hiểu hơn về cách internet và máy vi tính hoạt động',
            ]}
            imageUrl="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
            isAuthenticated={isAuthenticated}
            buttonText="Learn now"
            onButtonClick={handleStartLearn}
            courseOverview={courseOverview}
            lecturerInfo={lecturerInfo}

        />
    );
}

export default IntroductToIT;
