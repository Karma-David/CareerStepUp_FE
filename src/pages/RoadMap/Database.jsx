import Button from '@/components/Button';

function Database() {
    return (
        <div className="container-roadmap">
            <div className="box-roadmap">
                <div className="Header-roadmap-box">
                    <h3>Science Database</h3>
                    <p>
                        Front-end programmers are people who build website interfaces. In this section, we will share
                        with you the roadmap to becoming a Front-end programmer.
                    </p>
                </div>
                <div className="image-learning-path">
                    <a className="link-roadmap" href="/#">
                        <img
                            className="image-learning-roadmap"
                            src="./home-analytics.svg"
                            alt=""
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
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            style={{ width: '24px', height: '24px' }}
                            className="image-course-learning-roadmap"
                            src="./images.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            style={{ width: '24px', height: '24px' }}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            style={{ width: '24px', height: '24px' }}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            style={{ width: '24px', height: '24px' }}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            style={{ width: '24px', height: '24px' }}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            style={{ width: '24px', height: '24px' }}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt=""
                        />
                    </a>
                </div>
            </div>
            <div className="Button-See-more">
                <Button href={'https://roadmap.sh/frontend'} target={'_blank'}>
                    View Details
                </Button>
            </div>
        </div>
    );
}

export default Database;
