import { FaBatteryFull } from 'react-icons/fa';
import { IoMdFilm } from 'react-icons/io';
import { IoSpeedometer, IoTime } from 'react-icons/io5';
import CourseDetail from './CourseDetail';
import { useEffect, useState } from 'react';

function HtmlCss() {
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
        { icon: <IoMdFilm />, text: 'Tổng số 171 bài học' },
        { icon: <IoTime />, text: 'Thời lượng 31 giờ 21 phút' },
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
            title="HTML CSS từ Zero đến Hero"
            description="Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee."
            targets={[
                'Biết cách xây dựng giao diện web với HTML, CSS',
                'Biết cách đặt tên class CSS theo chuẩn BEM',
                'Làm chủ Flexbox khi dựng bố cục website',
                'Biết cách tự tạo động lực cho bản thân',
                'Học được cách làm UI chỉn chu, kỹ tính',
                'Biết cách phân tích giao diện website',
                'Biết cách làm giao diện web responsive',
                'Sở hữu 2 giao diện web khi học xong khóa học',
                'Biết cách tự học những kiến thức mới',
                'Nhận chứng chỉ khóa học do F8 cấp',
            ]}
            imageUrl="https://files.fullstack.edu.vn/f8-prod/courses/2.png"
            isAuthenticated={isAuthenticated}
            buttonText="Learn now"
            onButtonClick={handleStartLearn}
            courseOverview={courseOverview}
            lecturerInfo={lecturerInfo}
        />
    );
}

export default HtmlCss;
