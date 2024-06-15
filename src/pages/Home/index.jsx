import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './components/homepage.css';
import Footer from './components/footer';
import Carousel from './components/carousel';

const courses = [
    {
        id: 1,
        title: 'HTML CSS Pro',
        description: 'Mô tả về khóa học 1',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png',
        link: '/#',
    },
    {
        id: 2,
        title: 'Ngôn ngữ tiền xử lý Sass',
        description: 'Mô tả về khóa học 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/27/64e184ee5d7a2.png',
        link: '/#',
    },
    {
        id: 3,
        title: 'JavaScript Pro',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png',
        link: '/#',
    },
    {
        id: 4,
        title: 'NextJS Pro',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/20/648020fc16597.png',
        link: '/#',
    },
];

const coursesfree = [
    {
        id: 1,
        title: 'Kiến Thức Nhập Môn IT',
        description: 'Mô tả về khóa học 1',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    },
    {
        id: 2,
        title: 'Lập trình C++ cơ bản, nâng cao',
        description: 'Mô tả về khóa học 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png',
    },
    {
        id: 3,
        title: 'HTML CSS từ Zero đến Hero',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/2.png',
    },
    {
        id: 4,
        title: 'Responsive Với Grid System',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/3.png',
    },
    {
        id: 5,
        title: 'Lập Trình JavaScript Cơ Bản',
        description: 'Mô tả về khóa học 1',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
    },
    {
        id: 6,
        title: 'Lập Trình JavaScript Nâng Cao',
        description: 'Mô tả về khóa học 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/12.png',
    },
    {
        id: 7,
        title: 'Làm việc với Terminal & Ubuntu',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png',
    },
    {
        id: 8,
        title: 'Xây Dựng Website với ReactJS',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/13/13.png',
    },
    {
        id: 9,
        title: 'Node & ExpressJS',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/6.png',
    },
    {
        id: 10,
        title: 'App "Đừng Chạm Tay Lên Mặt"',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png',
    },
];

function Home() {
    return (
        <div>
            <div className="container">
                <Carousel />
            </div>
            <div className="container mt-5">
                <h1 className="text-left mb-4">Khóa Học Pro</h1>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {courses.map((course) => (
                        <div className="col" key={course.id}>
                            <div className="card h-80 custom-card">
                                <a href={course.link}>
                                    <img
                                        src={course.image}
                                        className="card-img-top custom-card-img"
                                        alt={course.title}
                                    />
                                </a>
                            </div>
                            <div className="card-body">
                                <a href={course.link}>
                                    <p className="card-title mt-3 mb-5">{course.title}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mt-5">
                <h1 className="text-left mb-4">Khóa Học Miễn Phí</h1>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {coursesfree.map((coursesfree) => (
                        <div className="col" key={coursesfree.id}>
                            <div className="card h-80 custom-card">
                                <a href={coursesfree.link}>
                                    <img
                                        src={coursesfree.image}
                                        className="card-img-top custom-card-img"
                                        alt={coursesfree.title}
                                    />
                                </a>
                            </div>
                            <div className="card-body">
                                <a href={coursesfree.link}>
                                    <p className="card-title mt-3 mb-5">{coursesfree.title}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
