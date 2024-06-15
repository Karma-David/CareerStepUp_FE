import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import './homepage.css';

function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Về chúng tôi</h2>
                        <p>Đây là một trang web cung cấp các khóa học lập trình chất lượng cao.</p>
                    </div>
                    <div className="col-md-4">
                        <h2>Liên hệ</h2>
                        <ul className="list-unstyled">
                            <li>
                                <FontAwesomeIcon icon={faApple} /> buivetkien@gmail.com
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faApple} /> 0123456789
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faApple} /> FPT University
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h2>Theo dõi chúng tôi</h2>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white me-3"
                        >
                            <FontAwesomeIcon icon={faCoffee} />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white me-3"
                        >
                            <FontAwesomeIcon icon={faCoffee} />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white"
                        >
                            <FontAwesomeIcon icon={faCoffee} />
                        </a>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>&copy; 2024 FPT Mãi Đỉnh</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
