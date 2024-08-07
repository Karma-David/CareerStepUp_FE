import Button from '@/components/Button';
import './RoadMap.css';
function BackEnd() {
    return (
        <div className="container-roadmap">
            <div className="box-roadmap">
                <div className="Header-roadmap-box">
                    <h3>Back-end Learning Path</h3>
                    <p>
                        In contrast to the front-end, back-end programmers are people who work with data, and their work
                        is often more logical. Let's learn more about the Back-end learning path.
                    </p>
                </div>
                <div className="image-learning-path">
                    <a className="link-roadmap" href="/#">
                        <img
                            className="image-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/3/63b4641535b16.png"
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
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            style={{ width: '24px', height: '24px' }}
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac2ee23d.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/6/6200afb926038.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/#">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png"
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

export default BackEnd;
