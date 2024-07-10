import Button from '@/components/Button';
import './RoadMap.css';
function FrontEnd() {
    return (
        <div className="container-roadmap">
            <div className="box-roadmap">
                <div className="Header-roadmap-box">
                    <h3>Front-end learning pathway</h3>
                    <p>
                        Front-end programmers are the ones who build the website interface. In this section, F8 will
                        share with you the roadmap to become a front-end programmer.
                    </p>
                </div>
                <div className="image-learning-path">
                    <a className="link-roadmap" href="https://roadmap.sh/frontend">
                        <img
                            className="image-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                            alt=""
                        />
                    </a>
                </div>
            </div>
            <div className="list-courses-roadmap">
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/IntroductToIT">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/HtmlCss">
                        <img
                            className="image-course-learning-roadmap"
                            src="	https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="image-learning-course-path">
                    <a className="link-roadmap-course" href="/ReponsGridSystem">
                        <img
                            className="image-course-learning-roadmap"
                            src="https://files.fullstack.edu.vn/f8-prod/courses/3/6200afe1240bb.png"
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
                            src="	https://files.fullstack.edu.vn/f8-prod/courses/13/6200af9262b30.png"
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

export default FrontEnd;
