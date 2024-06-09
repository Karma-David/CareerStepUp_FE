import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Header.module.scss';

import images from '@/assets/images';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { wrapper as PopperWrapper } from '@/components/Popper';
import KhoaHoc from '@/components/KhoaHoc';
import { FaUserCircle } from 'react-icons/fa';

const cx = classNames.bind(style);

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 1000);

        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/'); // Chuyển hướng đến trang home page
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo" />
                </div>
                <div>
                    <Tippy
                        interactive
                        visible={searchResult.length > 0}
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>Khoa Hoc</h4>
                                    <KhoaHoc />
                                    <KhoaHoc />
                                    <KhoaHoc />
                                    <KhoaHoc />
                                    <KhoaHoc />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <input placeholder="Search account or video" spellCheck={false} />
                            <button className={cx('clear')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </Tippy>
                </div>
                <div className="">
                    <div className={cx('action')}>
                        {isAuthenticated ? (
                            <Tippy
                                interactive
                                render={(attrs) => (
                                    <div className={cx('profile-menu')} tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('button-avatar')}>
                                                <Button to="/profile"> Profile </Button>
                                                <Button to="/RegisterLecturer">Register Lecturer</Button>
                                                <Button onClick={handleLogout}>Log out</Button>
                                            </div>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('avatar')}>
                                    <FaUserCircle size={40} />
                                </div>
                            </Tippy>
                        ) : (
                            <>
                                <Button to={'/Register'}>Sign in</Button>
                                <Button to={'/Login'}>Log in</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
