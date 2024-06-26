import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './homepage.css';
import Footer from './footer';
const courses = [
    {
        id: 1,
        title: 'HTML CSS Pro',
        description: 'Mô tả về khóa học 1',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png',
    },
    {
        id: 2,
        title: 'Ngôn ngữ tiền xử lý Sass',
        description: 'Mô tả về khóa học 2',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/27/64e184ee5d7a2.png',
    },
    {
        id: 3,
        title: 'JavaScript Pro',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png',
    },
    {
        id: 4,
        title: 'NextJS Pro',
        description: 'Mô tả về khóa học 3',
        image: 'https://files.fullstack.edu.vn/f8-prod/courses/20/648020fc16597.png',
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
            <div className="container-slide">
                <div className="row">
                    <div className="col-lg-12 mb-5">
                        <div id="carouselExampleCaptions" className="carousel slide">
                            <div className="carousel-indicators">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="2"
                                    aria-label="Slide 3"
                                ></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        src="./image1.jpg"
                                        className="d-block mx-auto"
                                        alt="Khoa hoc 1"
                                        style={{ width: '20%' }}
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>First slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="./image2.jpg"
                                        className="d-block mx-auto"
                                        alt="Khoa hoc 2"
                                        style={{ width: '20%' }}
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Second slide label</h5>
                                        <p>Some representative placeholder content for the second slide.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="./image3.jpg"
                                        className="d-block mx-auto"
                                        alt="Khoa hoc 3"
                                        style={{ width: '20%' }}
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Third slide label</h5>
                                        <p>Some representative placeholder content for the third slide.</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <h1 className="text-left mb-4">Khóa Học Pro</h1>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {courses.map((courses) => (
                        <div className="col" key={courses.id}>
                            <div className="card h-80 custom-card">
                                <img src={courses.image} className="card-img-top custom-card-img" alt={courses.title} />
                            </div>
                            <div className="card-body">
                                <p className="card-title">{courses.title}</p>
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
                                <img
                                    src={coursesfree.image}
                                    className="card-img-top custom-card-img"
                                    alt={coursesfree.title}
                                />
                            </div>
                            <div className="card-body">
                                <p className="card-title">{coursesfree.title}</p>
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
