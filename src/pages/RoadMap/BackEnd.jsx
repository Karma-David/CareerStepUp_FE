import Button from '@/components/Button';
import './RoadMap.css';
function BackEnd() {
    return (
        <div className="container-roadmap">
            <div className="box-roadmap">
                <div className="Header-roadmap-box">
                    <h3>Khoa hoc Back End</h3>
                    <p>
                        Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ
                        cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
                    </p>
                </div>
                <div className="image-learning-path">
                    <a className="link-roadmap" href="/#">
                        <img
                            className="image-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/3/63b4641535b16.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
            </div>
            <div className="list-courses-roadmap">
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac2ee23d.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/6/6200afb926038.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
            </div>
            <div className="Button-See-more">
                <Button href={'https://roadmap.sh/frontend'} target={'_blank'}>
                    Xem Them
                </Button>
            </div>
        </div>
    );
}

export default BackEnd;
