import { useEffect, useState } from 'react';
import { FaBatteryFull } from 'react-icons/fa';
import { IoMdFilm } from 'react-icons/io';
import { IoSpeedometer, IoTime } from 'react-icons/io5';
import CourseDetail from './CourseDetail';

function ReponsGridSystem() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleStartLearn = () => {
        return alert('You need to be logged in');
    };

    const courseOverview = [
        { icon: <IoSpeedometer />, text: 'Trình độ cơ bản' },
        { icon: <IoMdFilm />, text: 'Tổng số 36  bài học' },
        { icon: <IoTime />, text: 'Thời lượng 06 giờ 44 phút' },
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
            title="Responsive Với Grid System"
            description="Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự Bootstrap 4."
            targets={[
                'Biết cách xây dựng website Responsive',
                'Tự tay xây dựng được thư viện CSS Grid',
                'Hiểu được tư tưởng thiết kế với Grid system',
                'Tự hiểu được Grid layout trong bootstrap',
            ]}
            imageUrl="	https://files.fullstack.edu.vn/f8-prod/courses/3.png"
            isAuthenticated={isAuthenticated}
            buttonText="Learn now"
            onButtonClick={handleStartLearn}
            courseOverview={courseOverview}
            lecturerInfo={lecturerInfo}
        />
    );
}

export default ReponsGridSystem;
