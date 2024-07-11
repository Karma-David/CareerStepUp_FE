import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faApple } from '@fortawesome/free-brands-svg-icons';
import './homepage.css';

function Footer() {
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h2 className="footer-heading">Về chúng tôi</h2>
                        <p>
                            Đây là một trang web cung cấp các khóa học lập trình chất lượng cao với các giảng viên giàu
                            kinh nghiệm.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h2 className="footer-heading">Liên hệ</h2>
                        <ul className="list-unstyled">
                            <li>
                                <FontAwesomeIcon icon={faApple} className="me-2" />
                                CarrerStepUp@gmail.com
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faApple} className="me-2" />
                                0123456789
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faApple} className="me-2" />
                                FPT University
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h2 className="footer-heading">Theo dõi chúng tôi</h2>
                        <div className="social-icons">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                                <span className="social-text">Facebook</span>
                            </a>
                            <a
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                                <span className="social-text">Twitter</span>
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                                <span className="social-text">Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; 2024 FPT Mãi Đỉnh. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
