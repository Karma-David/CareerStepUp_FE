import Button from '@/components/Button';

function Database() {
    return (
        <div className="container-roadmap">
            <div className="box-roadmap">
                <div className="Header-roadmap-box">
                    <h3>Khoa hoc Database</h3>
                    <p>
                        Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ
                        cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
                    </p>
                </div>
                <div className="image-learning-path">
                    <a className="link-roadmap" href="/#">
                        <img
                            className="image-learning-roadmap"
                            src="./home-analytics.svg"
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
                             style={{width:'24px', height:'24px'}}
                            className="image-course-learning-roadmap"
                            src="./images.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                         style={{width:'24px', height:'24px'}}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                         style={{width:'24px', height:'24px'}}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                         style={{width:'24px', height:'24px'}}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                         style={{width:'24px', height:'24px'}}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt="Hoc front end qua de voi dai ka"
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                         style={{width:'24px', height:'24px'}}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
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

export default Database;
